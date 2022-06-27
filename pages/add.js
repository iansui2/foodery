import { useMutation } from "@apollo/client"
import { Box, Container, Heading, Text, Input, Button, Spinner, Center, HStack, IconButton } from "@chakra-ui/react"
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

  const [ createProduct, { data, loading, error } ] = useMutation(CREATE_PRODUCT)

  const router = useRouter()

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="orange.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) {
    alert("Product Added Succesfully!")
    router.push({
      pathname: "/product",
      query: {
        id: data.createProduct.recordId
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
                bg="orange.500"
                _focus={{ borderColor: 'white' }}
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
            onChange={(e) => setName(e.target.value)}
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
            mb={8}
          />
          <Button
            size="md"
            rounded="full"
            bg="orange.500"
            color="white"
            _focus={{ borderColor: 'white' }}
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
