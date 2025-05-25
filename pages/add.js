import { useMutation } from "@apollo/client"
import {
  Box, Container, Text, Input, Textarea, Button,
  Spinner, Center, IconButton, useDisclosure, Flex,
  useColorModeValue as mode, Image, VStack
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useCallback } from "react"
import { IoAdd } from 'react-icons/io5'
import { AppLayout } from "../layout/AppLayout"
import { CREATE_PRODUCT, PUBLISH_PRODUCT } from "../query/schema"
import { useDropzone } from 'react-dropzone'

export default function Add() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const router = useRouter()

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0]
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'foodery')

    const data = await fetch('https://api.cloudinary.com/v1_1/draaoierp/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json())

    setImage(data.secure_url)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const [createProduct, { loading: createLoading }] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data) => {
      publishProduct({ variables: { id: data?.createProduct?.id } })
    }
  })

  const [publishProduct, { loading: publishLoading, data: publishData }] = useMutation(PUBLISH_PRODUCT)

  if (createLoading || publishLoading) {
    return (
      <Center bg={mode('white', 'gray.900')} minH="100vh">
        <Spinner size="xl" color="orange.400" />
      </Center>
    )
  }

  if (publishData) {
    router.push({
      pathname: "/product",
      query: {
        id: publishData?.publishProduct?.id,
        message: "Product Added Successfully!"
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct({
      variables: {
        record: {
          productName: name,
          productDescription: desc,
          price: price,
          image: image
        }
      }
    })
  }

  const safeParseFloat = (str) => {
    const value = Number.parseFloat(str)
    return Number.isNaN(value) ? "" : value
  }

  return (
    <AppLayout>
      <Box bg={mode("gray.50", "gray.900")} py={10}>
        <Container maxW="container.md">
          <VStack spacing={6} align="stretch">
            {image === "" ? (
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
                mb={1}
                p={4}
              >
                <Input {...getInputProps()} />
                <Text fontSize="lg" color={mode("gray.600", "gray.200")}>Drag & drop your food image here</Text>
              </Box>
            ) : (
              <Image
                src={image}
                alt="Food product"
                borderRadius="2xl"
                height="50vh"
                w="full"
                objectFit="cover"
                shadow="lg"
              />
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
              <VStack spacing={5} align="stretch">
                <Box>
                  <Text fontWeight="medium" mb={1}>Food Title</Text>
                  <Input
                    placeholder="Enter food title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focusBorderColor="orange.400"
                  />
                </Box>

                <Box>
                  <Text fontWeight="semibold" mb={1}>Description</Text>
                  <Textarea
                    placeholder="Enter food description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    focusBorderColor="orange.400"
                  />
                </Box>

                <Box>
                  <Text fontWeight="semibold" mb={1}>Price</Text>
                  <Input
                    placeholder="Enter food price"
                    value={price}
                    onChange={(e) => setPrice(safeParseFloat(e.target.value))}
                    focusBorderColor="orange.400"
                    type="number"
                    min="0"
                  />
                </Box>

                <Flex justify="flex-end" pt={4}>
                  <IconButton
                    icon={<IoAdd size="24px" />}
                    colorScheme="orange"
                    size="lg"
                    isRound
                    onClick={handleSubmit}
                    aria-label="Add Food"
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.05)" }}
                  />
                </Flex>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </AppLayout>
  )
}