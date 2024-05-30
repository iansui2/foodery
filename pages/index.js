import { useQuery } from "@apollo/client"
import { 
  Container, Heading, Button, Spinner, Image, Grid, Text,
  Center, useColorModeValue as mode, Alert, AlertIcon,
  AlertTitle, AlertDescription, CloseButton, Box
} from "@chakra-ui/react"
import FloatingActionButton from "../components/FloatingActionButton"
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

      if (message !== undefined) {
        setMessage(message)
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

  return (
    <AppLayout>  
      <Container minH="100vh" maxW="container.xl" position="relative">
        <Image src="../images/foodery-front.jpg" borderRadius="xl" w="full" h="300px" objectFit="cover" alt="Foodery Cake" mb={8} />
        <Heading size="lg" color="orange.500" pb={8}>Food List</Heading>
        {
          data?.products ?
            <Grid templateColumns={{ base: 'auto', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
              {
                data?.products.map((item, itemKey) => (
                  <Box key={itemKey} bg="orange.500" boxShadow="2xl" borderRadius="2xl" p={4} display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <div>
                      <Heading color="white" size="lg" mb={2}>{item.productName}</Heading>
                      <Text color="white" size="md" mb={2}>{item.productDescription}</Text>
                      <Text color="white" size="md" mb={4}>{`₱ ${item.price}`}</Text>
                    </div>
                    <div>
                      <Button
                        size="md"
                        rounded="full"
                        bg="orange.300"
                        color="white"
                        _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                        onClick={() => {
                          router.push({
                            pathname: "/product",
                            query: {
                              id: item.id,
                              message: ''
                            }
                          })
                        }}>
                        View
                      </Button>   
                    </div>
                  </Box>    
                ))
              }
            </Grid> :
            <Center><Heading size="lg">No Food Products Found</Heading></Center>
        }
        {
          data?.products && <FloatingActionButton />
        }
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
