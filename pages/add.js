import { useMutation } from "@apollo/client"
import { 
  Box, Container, Heading, Text, Input, Button, 
  Spinner, Center, HStack, IconButton, useDisclosure,
  useColorModeValue as mode
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { IoAdd } from 'react-icons/io5'
import { AppLayout } from "../layout/AppLayout"
import { CREATE_PRODUCT } from "../query/schema"

export default function Add() {
  const [name, setName] = useState("")
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [unitsOnOrder, setUnitsOnOrder] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [ createProduct, { data, loading, error } ] = useMutation(CREATE_PRODUCT)

  const router = useRouter()

  if (loading) {
    return (
    <Center bg={mode('white', 'gray.900')} minH="100vh">
      <Spinner size="xl" color="orange.500" />
    </Center> 
    )
  }
  if (error) console.log(error)
  if (data) {
    router.push({
      pathname: "/product",
      query: {
        id: data.createProduct.recordId,
        message: "Product Added Succesfully!"
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createProduct({
      variables: {
        record: {
          name: name,
          unitPrice: unitPrice,
          unitsInStock: unitsInStock,
          unitsOnOrder: unitsOnOrder
        }
      }
    })
  }

  const safeParseFloat = (str) => {
    const value = Number.parseFloat(str)
    return Number.isNaN(value) ? 0 : value
  }

  return (
    <AppLayout>  
      <Box>
        <Container maxW="container.lg">
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
          <Text mb={2}>Name</Text>
          <Input 
            placeholder="Enter product name"
            focusBorderColor="orange.500"
            onChange={(e) => setName(e.target.value)}
            mb={6}
          />
          <Text mb={2}>Unit Price</Text>
          <Input 
            placeholder="Enter product price"
            focusBorderColor="orange.500"
            onChange={(e) => setUnitPrice(safeParseFloat(e.target.value))}
            mb={6}
          />
          <Text mb={2}>Units In Stock</Text>
          <Input 
            placeholder="Enter units in stock"
            focusBorderColor="orange.500"
            onChange={(e) => setUnitsInStock(safeParseFloat(e.target.value))}
            min="0"
            mb={6}
          />
          <Text mb={2}>Units in Order</Text>
          <Input 
            placeholder="Enter units in order"
            focusBorderColor="orange.500"
            onChange={(e) => setUnitsOnOrder(safeParseFloat(e.target.value))}
            min="0"
            mb={12}
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
