import { useMutation } from "@apollo/client"
import { Box, Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { UPDATE_PRODUCT } from "../query/schema"

export default function Update() {
  const [ updateProduct, { data, loading, error } ] = useMutation(UPDATE_PRODUCT)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { object } = router.query
      const product = JSON.parse(object)

      handleUpdate(
        product.recordId, 
        product.record.name, 
        product.record.unitPrice,
        product.record.unitsInStock,
        product.record.unitsOnOrder
      )
    }
  }, [router.isReady])

  if (loading) return (
    <Center h="750px">
      <Spinner size="xl" color="orange.500" />
    </Center> 
  )
  if (error) console.log(error)
  if (data) {
    alert("Product Updated Succesfully!")
    router.push({
      pathname: "/product",
      query: {
        id: data.updateProduct.recordId
      }
    })
  }

  const handleUpdate = (id, name, unitPrice, unitsInStock, unitsOnOrder) => {
    updateProduct({
      variables: {
        id: id,
        record: {
          name: name,
          unitPrice: unitPrice,
          unitsInStock: unitsInStock,
          unitsOnOrder: unitsOnOrder
        }
      }
    })
  }

  return (
    <Box />
  )
}