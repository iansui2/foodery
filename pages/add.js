import { useMutation } from "@apollo/client"
import { 
  Box, Container, Heading, Text, Input, Textarea, Button, 
  Spinner, Center, HStack, IconButton, useDisclosure,
  useColorModeValue as mode
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { IoAdd } from 'react-icons/io5'
import { AppLayout } from "../layout/AppLayout"
import { CREATE_PRODUCT, PUBLISH_PRODUCT } from "../query/schema"

export default function Add() {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [createProduct, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_PRODUCT, {
    onCompleted: (data) => {
      publishProduct({ variables: { id: data?.createProduct?.id } });
    },
  });
  
  const [publishProduct, { data: publishData, loading: publishLoading, error: publishError }] = useMutation(PUBLISH_PRODUCT);

  const router = useRouter()

  if (createLoading || publishLoading) {
    return (
      <Center bg={mode('white', 'gray.900')} minH="100vh">
        <Spinner size="xl" color="orange.500" />
      </Center>
    );
  }
  
  if (createError || publishError) console.log(createError, publishError);
  
  if (publishData) {
    router.push({
      pathname: "/product",
      query: {
        id: publishData?.publishProduct?.id,
        message: "Product Added Successfully!"
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createProduct({
      variables: {
        record: {
          productName: name,
          productDescription: desc,
          price: price
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
      <Box>
        <Container minH="100vh" maxW="container.lg">
          <HStack spacing={4} mb={8}>
            <Link href="/">
              <IconButton
                size="sm"
                rounded="full"
                _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                _active={{ bg: 'orange.200' }}
                _focus={{ borderColor: 'orange.500' }} 
                bg="orange.500"
                icon={<BsArrowLeft color="white" />}
              />
            </Link>  
            <Heading size="lg" color="orange.500">Add Product</Heading>
          </HStack>
          <Text mb={2}>Food Title</Text>
          <Input 
            placeholder="Enter food title"
            focusBorderColor="orange.500"
            onChange={(e) => setName(e.target.value)}
            mb={6}
          />
          <Text mb={2}>Description</Text>
          <Textarea 
            placeholder="Enter food description"
            focusBorderColor="orange.500"
            onChange={(e) => setDesc(e.target.value)}
            mb={6}
          />
          <Text mb={2}>Price</Text>
          <Input 
            placeholder="Enter food price"
            value={price}
            focusBorderColor="orange.500"
            min="0"
            onChange={(e) => setPrice(safeParseFloat(e.target.value))}
            mb={6}
          />
          <Button
            size="md"
            rounded="full"
            _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
            _active={{ bg: 'orange.200' }}
            _focus={{ borderColor: 'orange.500' }} 
            bg="orange.500"
            color="white"
            leftIcon={<IoAdd color="white" />}
            onClick={(e) => {
              handleSubmit(e)
            }}
            mb={8}>Add Product</Button>
        </Container>
      </Box>
    </AppLayout>  
  )
}
