import { useQuery } from "@apollo/client"
import { 
  Box, Container, Heading, Text, Input, Textarea, Button, HStack, 
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
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")

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
            <Heading size="lg" color="orange.500">View Product</Heading>
          </HStack>
          <Text mb={2}>Food Title</Text>
          <Input
            placeholder="Enter food title"          
            value={name}
            focusBorderColor="orange.500" 
            onChange={(e) => setName(e.target.value)}
            mb={6}
          />
          <Text mb={2}>Description</Text>
          <Textarea 
            placeholder="Enter food description"
            value={desc}
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
                      id: id,
                      record: {
                        productName: name,
                        productDescription: desc,
                        price: price
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
