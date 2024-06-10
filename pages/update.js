import { useMutation } from "@apollo/client"
import { Box, Center, Spinner, useColorModeValue as mode } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { UPDATE_PRODUCT, PUBLISH_PRODUCT } from "../query/schema"

export default function Update() {
  const [ updateProduct, { data: updateData, loading: updateLoading, error: updateError } ] = useMutation(UPDATE_PRODUCT, {
    onCompleted(data) {
      publishProduct({ variables: { id: data.updateProduct.id } })
    }
  });  
  const [ publishProduct, { data: publishData, loading: publishLoading, error: publishError } ] = useMutation(PUBLISH_PRODUCT)

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      const { object } = router.query
      const product = JSON.parse(object)

      handleUpdate(
        product.id, 
        product.record.productName, 
        product.record.productDescription,
        product.record.price,
        product.record.image
      )
    }
  }, [router.isReady])

  if (updateLoading || publishLoading) return (
    <Center bg={mode('white', 'gray.900')} minH="100vh">
      <Spinner size="xl" color="orange.500" />
    </Center> 
  )
  if (updateError) console.log(updateError)
  if (publishError) console.log(publishError)
  if (updateData || publishData) {
    router.push({
      pathname: "/product",
      query: {
        id: updateData?.updateProduct?.id,
        message: "Product Updated Succesfully!"
      }
    })
  }

  const handleUpdate = (id, title, body, price, image) => {
    updateProduct({
      variables: {
        id: id,
        record: {
          productName: title,
          productDescription: body,
          price: price,
          image: image
        }
      }
    })
  }

  return (
    <Box />
  )
}