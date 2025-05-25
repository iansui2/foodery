import { useQuery } from "@apollo/client"
import { 
  Box, Container, Heading, Text, Input, Textarea, Button, HStack, 
  Spinner, Center, IconButton, Alert, AlertIcon, AlertTitle, 
  AlertDescription, useColorModeValue as mode, CloseButton, Flex, Image
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState, useCallback } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { MdModeEdit } from "react-icons/md";
import { AppLayout } from "../layout/AppLayout"
import { GET_PRODUCT } from "../query/schema"
import { IoCheckmark } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useDropzone } from 'react-dropzone'

export default function Product() {
  const [isUpdate, setIsUpdate] = useState(false)
  const [show, setShow] = useState(false)
  const [id, setId] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [updateImage, setUpdateImage] = useState(false)
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'foodery');

    const data = await fetch('https://api.cloudinary.com/v1_1/draaoierp/image/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(responseData => {
      return responseData;
    })
    .catch(err => {
        console.log(err)
    });
    
    setImage(data.secure_url)
    setUpdateImage(true)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      id: id
    }
  })

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { id, message } = router.query

      setId(id)

      if (message != '') {
        setMessage(message)
        setShow(true)
      }

      if (data) {
        setName(data?.product?.productName)  
        setDesc(data?.product?.productDescription)
        setPrice(data?.product?.price)
        setImage(data?.product?.image)
      }

      refetch()
    }
  }, [router.isReady, data])

  if (loading) return (
    <Center bg={mode('white', 'gray.900')} minH="100vh">
      <Spinner size="xl" color="orange.500" />
    </Center> 
  )
  if (error) console.log(error)

  const safeParseFloat = (str) => {
    const value = Number.parseFloat(str)
    return Number.isNaN(value) ? "" : value
  }

  return (
    <AppLayout>
      <Box>
        <Container minH="100vh" maxW="container.md" py={10}>
          {isUpdate && !updateImage ? (
            <Box
              border="2px dashed"
              borderColor="orange.300"
              borderRadius="2xl"
              height="30vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              transition="all 0.3s ease"
              _hover={{ bg: mode("orange.50", "gray.700"), transform: "scale(1.02)" }}
              cursor="pointer"
              {...getRootProps()}
              mb={6}
              p={4}
            >
              <Input {...getInputProps()} />
              <Text fontSize="lg" color={mode("gray.600", "gray.200")}>
                Drag & drop your food image here
              </Text>
            </Box>
          ) : (
            image && (
              <Image
                src={image}
                alt="food product"
                borderRadius="2xl"
                objectFit="cover"
                height="300px"
                w="full"
                mb={6}
                shadow="lg"
              />
            )
          )}

          <Box
            borderRadius="2xl"
            p={6}
            bg={mode("whiteAlpha.800", "whiteAlpha.100")}
            backdropFilter="blur(16px)"
            boxShadow="2xl"
            color={mode("gray.800", "gray.100")}
            transition="all 0.3s ease"
          >
            {isUpdate ? (
              <>
                <Text mb={2} fontWeight="medium">Food Title</Text>
                <Input
                  placeholder="Enter food title"
                  value={name}
                  focusBorderColor="orange.400"
                  onChange={(e) => setName(e.target.value)}
                  mb={4}
                />
              </>
            ) : (
              <Heading fontSize="2xl" mb={4}>{name}</Heading>
            )}

            {isUpdate ? (
              <>
                <Text mb={2} fontWeight="medium">Description</Text>
                <Textarea
                  placeholder="Enter food description"
                  value={desc}
                  focusBorderColor="orange.400"
                  onChange={(e) => setDesc(e.target.value)}
                  mb={4}
                />
              </>
            ) : (
              <Text mb={4}>{desc}</Text>
            )}

            {isUpdate ? (
              <>
                <Text mb={2} fontWeight="medium">Price</Text>
                <Input
                  placeholder="Enter food price"
                  value={price}
                  focusBorderColor="orange.400"
                  onChange={(e) => setPrice(safeParseFloat(e.target.value))}
                  mb={4}
                />
              </>
            ) : (
              <Text fontWeight="semibold" fontSize="lg">₱ {price}</Text>
            )}

            <Flex justifyContent="flex-end" mt={6}>
              <HStack spacing={3}>
                <IconButton
                  aria-label={isUpdate ? "Save" : "Edit"}
                  icon={isUpdate ? <IoCheckmark size="24px" /> : <MdModeEdit size="24px" />}
                  bg="orange.400"
                  color="white"
                  rounded="full"
                  size="lg"
                  _hover={{ bg: "orange.500", transform: "scale(1.05)" }}
                  onClick={() => {
                    isUpdate
                      ? router.push({
                          pathname: "/update",
                          query: {
                            object: JSON.stringify({
                              id,
                              record: {
                                productName: name,
                                productDescription: desc,
                                price,
                                image,
                              },
                            }),
                          },
                        })
                      : setIsUpdate(true);
                  }}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<MdDelete size="24px" />}
                  bg="red.500"
                  color="white"
                  rounded="full"
                  size="lg"
                  _hover={{ bg: "red.600", transform: "scale(1.05)" }}
                  onClick={() =>
                    router.push({
                      pathname: "/remove",
                      query: { id },
                    })
                  }
                />
              </HStack>
            </Flex>

            {show && (
              <Alert status="success" mt={6} borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Box>
                <CloseButton position="absolute" right={2} top={2} onClick={() => setShow(false)} />
              </Alert>
            )}
          </Box>
        </Container>
      </Box>
    </AppLayout>
  )
}
