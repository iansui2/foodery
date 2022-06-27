import { useMutation } from "@apollo/client"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { REMOVE_PRODUCT } from "../query/schema"
import { useRouter } from 'next/router'

export default function Remove() {
  const [ removeProduct, { data, loading, error } ] = useMutation(REMOVE_PRODUCT)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query
      handleDelete(id)
    }
  }, [router.isReady])

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="orange.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) {
    alert("Product Deleted Succesfully!")
    router.push("/")
  }

  const handleDelete = (id) => {
    removeProduct({ 
      variables: {
        filter: {
          _id: id
        }
      }
    })
  }

  return (
    <Box />
  )
}