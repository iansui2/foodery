import { 
  Box, Container, HStack, Image, Heading, Text,
  IconButton, useColorMode, useColorModeValue as mode, Link, Button
} from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

export const AppLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={mode('white', 'gray.900')}>
      <Box pos="fixed" w="full" boxShadow="xl" backdropFilter="blur(20px)" zIndex="1000" py={2}>
        <Container maxW="container.xl">
          <HStack w="full" align="center" justify="space-between">
            <Link href="/">
              <HStack spacing={4} align="center" _hover={{ transform: 'scale(1.05)' }}>
                <Image src="../../logo.png" boxSize="50px" />
                <Heading size="lg" fontWeight="extrabold" color="orange.500">foodery</Heading>
              </HStack>
            </Link>
            <IconButton
              size="md"
              rounded="full"
              _hover={{ bg: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
              _active={{ bg: 'orange.200' }}
              _focus={{ borderColor: 'orange.500' }} 
              bg="orange.500"
              onClick={toggleColorMode}
              icon={colorMode == 'light' ? <IoMoonOutline color="white" /> : <IoSunnyOutline color="white" />}
            />
          </HStack>
        </Container> 
      </Box>
      <Box minH="90vh" pt={32} pb={32}>
        {children}
      </Box>  
      <Box bg={mode('white', 'gray.900')} pos="fixed" bottom={0} w="full" boxShadow="xl" backdropFilter="blur(20px)" zIndex="1000" py={4}>
        <Container maxW="container.xl">
          <HStack w="full" align="center" justify="center">
            <Text fontWeight="bold">Powered by Vercel</Text>
          </HStack>
        </Container> 
      </Box>
    </Box>
  )
}