import { 
  Box, Container, HStack, Image, Heading, 
  IconButton, useColorMode, useColorModeValue as mode
} from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

export const AppLayout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box bg={mode('white', 'black')}>
      <Container maxW="container.xl" pt={4} pb={16}>
        <HStack w="full" align="center" justify="space-between">
          <HStack spacing={4} align="center">
            <Image src="../../logo.png" boxSize="50px" />
            <Heading size="lg" fontWeight="extrabold" color="orange.500">foodery</Heading>
          </HStack>
          <IconButton
            size="md"
            rounded="full"
            bg="orange.500"
            _focus={{ borderColor: 'white' }}
            onClick={toggleColorMode}
            icon={colorMode == 'light' ? <IoMoonOutline color="white" /> : <IoSunnyOutline color="white" />}
          />
        </HStack>
      </Container> 
      <Box minH="90vh">
        {children}
      </Box>  
    </Box>
  )
}