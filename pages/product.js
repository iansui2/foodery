import { useQuery } from "@apollo/client"
import { 
  Box, Container, Heading, Text, Input, Button, HStack, 
  Spinner, Center, IconButton, Alert, AlertIcon, AlertTitle, 
  AlertDescription, useColorModeValue as mode, CloseButton 
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { AppLayout } from "../layout/AppLayout"
import { GET_PRODUCT } from "../query/schema"

export default function Product() {
  const [show, setShow] = useState(false)
  const [id, setId] = useState("")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [unitPrice, setUnitPrice] = useState(0)
  const [unitsInStock, setUnitsInStock] = useState(0)
  const [unitsOnOrder, setUnitsOnOrder] = useState(0)

  const { loading, error, data, refetch } = useQuery(GET_PRODUCT, {
    variables: {
      filter: {
        _id: id
      }
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
        setName(data.viewer.product.name)  
        setUnitPrice(data.viewer.product.unitPrice)
        setUnitsInStock(data.viewer.product.unitsInStock)
        setUnitsOnOrder(data.viewer.product.unitsOnOrder)
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
            <Heading size="lg" color="orange.500">View Product</Heading>
          </HStack>
          <Text mb={2}>Name</Text>
          <Input
            value={name}
            focusBorderColor="orange.500" 
            onChange={(e) => setName(e.target.value)}
            mb={6}
          />
          <Text mb={2}>Unit Price</Text>
          <Input 
            value={unitPrice}
            focusBorderColor="orange.500"
            min="0"
            onChange={(e) => setUnitPrice(safeParseFloat(e.target.value))}
            mb={6}
          />
          <Text mb={2}>Units In Stock</Text>
          <Input 
            value={unitsInStock}
            focusBorderColor="orange.500"
            min="0"
            onChange={(e) => setUnitsInStock(safeParseFloat(e.target.value))}
            mb={6}
          />
          <Text mb={2}>Units On Order</Text>
          <Input 
            value={unitsOnOrder}
            focusBorderColor="orange.500"
            min="0"
            onChange={(e) => setUnitsOnOrder(safeParseFloat(e.target.value))}
            mb={12}
          />
          <HStack spacing={4}>
            <Button 
              _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'orange.200' }}
              _focus={{ borderColor: 'orange.500' }} 
              bg="orange.500"
              color="white"
              rounded="full"
              onClick={() => {
                router.push({
                  pathname: "/update",
                  query: {
                    object: JSON.stringify({
                      recordId: id,
                      record: {
                        name: name,
                        unitPrice: unitPrice,
                        unitsInStock: unitsInStock,
                        unitsOnOrder: unitsOnOrder
                      }
                    })
                  }
                })
              }}>Update</Button>
            <Button 
              _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'orange.200' }}
              _focus={{ borderColor: 'orange.500' }} 
              bg="orange.500"
              color="white"
              rounded="full"
              onClick={() => {
                router.push({
                  pathname: "/remove",
                  query: {
                    id: id
                  }
                })
              }}>Delete</Button>
          </HStack>
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
        </Container>
      </Box>
    </AppLayout>
  )
}
