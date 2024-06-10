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
        <Container minH="100vh" maxW="container.xl">
          {
            isUpdate ? 
              updateImage === false ?
                <Box 
                  borderRadius="2xl" 
                  border="2px" 
                  borderStyle="dashed"
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  textAlign="center" 
                  height="30vh"
                  mb={8}
                  cursor="pointer"
                  {...getRootProps()}
                >
                  <Input {...getInputProps()} />
                  <Text fontSize="xl">Drag and drop your food image here...</Text>
                </Box>
              :
                <Image src={image} alt="food product" borderRadius="2xl" objectFit="cover" crossOrigin="anonymous" height="50vh" w="full" mb={6} />
              :
              image && <Image src={image} alt="food product" borderRadius="2xl" objectFit="cover" crossOrigin="anonymous" height="50vh" w="full" mb={6} />
          }          
          <Box bg="orange.500" color="white" boxShadow="2xl" borderRadius="2xl" p={4} height="100%">        
            {
              isUpdate ? (
                <Box>
                  <Text mb={2}>Food Title</Text>
                  <Input
                    placeholder="Enter food title"          
                    value={name}
                    focusBorderColor="orange.400" 
                    onChange={(e) => setName(e.target.value)}
                    mb={6}
                    sx={{
                      '::placeholder': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              ) : (
                <Heading size="lg" mb={6}>{name}</Heading>
              )
            }
            {
              isUpdate ? (
                <Box>
                  <Text mb={2}>Description</Text>
                  <Textarea 
                    placeholder="Enter food description"
                    value={desc}
                    focusBorderColor="orange.400"
                    onChange={(e) => setDesc(e.target.value)}
                    mb={6}
                    sx={{
                      '::placeholder': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              ) : (
                <Text size="md" mb={6}>{desc}</Text>
              )
            }
            {
              isUpdate ? (
                <Box>
                  <Text mb={2}>Price</Text>
                  <Input 
                    placeholder="Enter food price"
                    value={price}
                    focusBorderColor="orange.400"
                    min="0"
                    onChange={(e) => setPrice(safeParseFloat(e.target.value))}
                    mb={6}
                    sx={{
                      '::placeholder': {
                        color: 'white',
                      },
                    }}
                  />
                </Box>
              ) : (
                <Text size="md" mb={6}>₱ {price}</Text>
              )
            }
            <Flex justifyContent="flex-end">
              <HStack spacing={4}>
                <IconButton 
                  size="lg"
                  _hover={{ bg: 'orange.400', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                  _active={{ bg: 'orange.400' }}
                  _focus={{ borderColor: 'orange.400' }} 
                  bg="orange.300"
                  color="white"
                  rounded="full"
                  icon={isUpdate ? <IoCheckmark color="white" size="28px" /> : <MdModeEdit color="white" size="28px" />}
                  onClick={() => {
                    isUpdate ?
                      router.push({
                        pathname: "/update",
                        query: {
                          object: JSON.stringify({
                            id: id,
                            record: {
                              productName: name,
                              productDescription: desc,
                              price: price,
                              image: image
                            }
                          })
                        }
                      })
                    : setIsUpdate(true)
                  }} />
                <IconButton 
                  size="lg"
                  _hover={{ bg: 'red.300', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                  _active={{ bg: 'red.300' }}
                  _focus={{ borderColor: 'red.500' }} 
                  bg="red.500"
                  color="white"
                  rounded="full"
                  icon={<MdDelete color="white" size="28px" />}
                  onClick={() => {
                    router.push({
                      pathname: "/remove",
                      query: {
                        id: id
                      }
                    })
                  }} />
              </HStack>
            </Flex>
            <Alert display={show == true ? 'flex' : 'none'} status='success' mt={8}>
              <AlertIcon />
              <Box>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  {message}
                </AlertDescription>
                <CloseButton
                  position='absolute'
                  right={1}
                  top={1}
                  onClick={() => setShow(false)}
                />
              </Box>
            </Alert>
          </Box>
        </Container>
      </Box>
    </AppLayout>
  )
}
