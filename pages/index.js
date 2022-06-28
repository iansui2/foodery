import { useQuery } from "@apollo/client"
import { 
  Container, Heading, Button, Spinner,
  Center, Table, Thead, Tbody,
  Tr, Th, Td, TableContainer, useColorModeValue as mode, Stack, 
  Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { GET_PRODUCTS } from "../query/schema"
import { IoAdd } from 'react-icons/io5'
import { AppLayout } from "../layout/AppLayout"
import { useState } from "react"

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS)
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { message } = router.query

      console.log(message)
      console.log(show)

      if (message !== undefined) {
        setMessage(message)
        console.log(message)
        console.log(show)
        setShow(true)
      }

      refetch()
    }
  }, [router.isReady])

  if (loading) return (
    <Center bg={mode('white', 'gray.900')} minH="100vh">
      <Spinner size="xl" color="orange.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) {
    console.log(data)
  }

  return (
    <AppLayout>  
      <Container maxW="container.lg">
        <Stack direction={{ base: 'column', md: 'row' }} w="full" justify="space-between" spacing={6} pb={8}>
          <Heading size="lg" color="orange.500">All Food Products</Heading>
          <Link href="/add">
            <Button
              size="md"
              rounded="full"
              _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'orange.200' }}
              _focus={{ borderColor: 'orange.500' }} 
              bg="orange.500"
              color="white"
              leftIcon={<IoAdd color="white" />}
              mb={8}>Add Product</Button>
          </Link>
        </Stack>
        <TableContainer borderRadius="md" pb={8}>
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th pb={8} fontSize="xl" color={mode('black', 'white')} textTransform="capitalize">Name</Th>
                <Th pb={8} fontSize="xl" color={mode('black', 'white')} textTransform="capitalize">Unit Price</Th>
                <Th pb={8} fontSize="xl" color={mode('black', 'white')} textTransform="capitalize">Units In Stock</Th>
                <Th pb={8} fontSize="xl" color={mode('black', 'white')} textTransform="capitalize">Units On Order</Th>
                <Th pb={8} fontSize="xl" color={mode('black', 'white')} textTransform="capitalize">View</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                data.viewer.productList.map((item, itemKey) => (
                  <Tr key={itemKey}>
                    <Td pb={6} fontWeight="semibold">{item.name}</Td>
                    <Td pb={6}>{item.unitPrice}</Td>
                    <Td pb={6}>{item.unitsInStock}</Td>
                    <Td pb={6}>{item.unitsOnOrder}</Td>
                    <Td pb={6}>                
                      <Button 
                        _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                        _active={{ bg: 'orange.200' }}
                        _focus={{ borderColor: 'orange.500' }} 
                        bg="orange.500"
                        color="white"
                        rounded="full"
                          onClick={() => {
                          router.push({
                            pathname: "/product",
                            query: {
                              id: item._id,
                              message: ''
                            }
                          })
                        }}>
                          View
                      </Button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
        <Alert display={show == true ? 'flex' : 'none'} status='success' py={8}>
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
    </AppLayout>
  )
}
