import { useQuery } from "@apollo/client"
import { 
  Container, Heading, Button, Spinner,
  Center, Table, Thead, Tbody,
  Tr, Th, Td, TableContainer, useColorModeValue as mode, Stack
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { GET_PRODUCTS } from "../query/schema"
import { IoAdd } from 'react-icons/io5'
import { AppLayout } from "../layout/AppLayout"

const pager = (count, current, pages = 6) => {
  const half = parseInt(pages / 2)
  const start = parseInt(current || 0) - half
  return [...Array(pages).keys()]
    .map(r => start + r)
    .filter(r => r > 0 && r <= count)
}

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS)

  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [])

  if (loading) return (
    <Center h="750px">
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
        <Stack direction={{ base: 'column', md: 'row' }} w="full" justify="space-between" spacing={6} mb={8}>
          <Heading size="lg" color="orange.500">All Food Products</Heading>
          <Link href="/add">
            <Button
              size="md"
              rounded="full"
              bg="orange.500"
              color="white"
              _focus={{ borderColor: 'white' }}
              leftIcon={<IoAdd color="white" />}
              mb={8}>Add Product</Button>
          </Link>
        </Stack>
        <TableContainer borderRadius="md" mb={8}>
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
                      bg="orange.500"
                      color="white"
                      rounded="full"
                        onClick={() => {
                        router.push({
                          pathname: "/product",
                          query: {
                            id: item._id
                          }
                        })
                      }}>View</Button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </AppLayout>
  )
}
