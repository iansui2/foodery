import { useQuery } from "@apollo/client";
import {
  Container, Heading, Button, Spinner, Image, Grid, Text,
  Center, useColorModeValue as mode, Alert, AlertIcon,
  AlertTitle, AlertDescription, CloseButton, Box, IconButton, Flex
} from "@chakra-ui/react";
import FloatingActionButton from "../components/FloatingActionButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_PRODUCTS } from "../query/schema";
import { IoAdd } from 'react-icons/io5';
import { AppLayout } from "../layout/AppLayout";
import { FaEye } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [featuredFoodList, setFeaturedFoodList] = useState([]);
  const router = useRouter();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  useEffect(() => {
    if (router.isReady) {
      const { message } = router.query;
      if (message !== undefined) {
        setMessage(message);
        setShow(true);
      }
      refetch();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (data?.products) {
      let randomProducts = [];
      while (randomProducts.length < 5) {
        let randomIndex = Math.floor(Math.random() * data.products.length);
        if (!randomProducts.includes(data.products[randomIndex])) {
          randomProducts.push(data.products[randomIndex]);
        }
      }
      setFeaturedFoodList(randomProducts);
    }
  }, [data?.products]);

  if (loading) return (
    <Center bg={mode('white', 'gray.900')} minH="100vh">
      <Spinner size="xl" color="orange.500" />
    </Center>
  );
  if (error) console.log(error);

  return (
    <AppLayout>
      <Container maxW="container.xl" minH="100vh" position="relative">
        {featuredFoodList && (
          <Slider {...settings}>
            {featuredFoodList.map((item) => (
              <Box key={item.productName} position="relative">
                <Image
                  src={item.image}
                  borderRadius="2xl"
                  w="full"
                  h={{ base: "300px", md: "450px" }}
                  objectFit="cover"
                  alt={item.productName}
                />
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  position="absolute"
                  right="4"
                  bottom="6"
                  bg="rgba(0, 0, 0, 0.6)"
                  px={3}
                  py={1}
                  borderRadius="md"
                  color="white"
                >
                  {item.productName}
                </Text>
              </Box>
            ))}
          </Slider>
        )}

        <Heading size="xl" color="orange.400" mt={12} mb={6}>
          Food List
        </Heading>

        {data?.products?.length > 0 ? (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={8}>
            {data.products.map((item) => (
              <Box
                key={item.productName}
                bg={mode("whiteAlpha.700", "whiteAlpha.100")}
                backdropFilter="blur(10px)"
                boxShadow="xl"
                borderRadius="2xl"
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
              >
                {item?.image && (
                  <Image
                    src={item.image}
                    alt={item.productName}
                    w="full"
                    h="220px"
                    objectFit="cover"
                  />
                )}
                <Box p={5} display="flex" flexDirection="column" justifyContent="space-between" minH="230px">
                  <Box>
                    <Heading size="md" mb={2}>
                      {item.productName}
                    </Heading>
                    <Text fontSize="sm" mb={3}>
                      {item.productDescription}
                    </Text>
                    <Text fontWeight="bold" color="orange.500">₱ {item.price}</Text>
                  </Box>
                  <Flex justifyContent="flex-end" mt={4}>
                    <IconButton
                      size="md"
                      rounded="full"
                      colorScheme="orange"
                      icon={<FaEye />}
                      aria-label="View Item"
                      onClick={() => router.push({
                        pathname: "/product",
                        query: { id: item.id, message: '' }
                      })}
                    />
                  </Flex>
                </Box>
              </Box>
            ))}
          </Grid>
        ) : (
          <Center py={10}><Heading size="md">No Food Products Found</Heading></Center>
        )}

        {data?.products && <FloatingActionButton />}

        <Alert
          status="success"
          variant="left-accent"
          borderRadius="md"
          py={6}
          px={4}
          mt={8}
          display={show ? 'flex' : 'none'}
        >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Box>
          <CloseButton position="absolute" right="1rem" top="1rem" onClick={() => setShow(false)} />
        </Alert>
      </Container>
    </AppLayout>
  );
}