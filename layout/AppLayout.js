import { 
  Box, Container, HStack, Image, Heading, Text,
  IconButton, useColorMode, useColorModeValue as mode, Link, Button,
  AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader,
  AlertDialogContent, AlertDialogOverlay, useDisclosure
} from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'

export const AppLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
          <HStack w="full" align="center" justify="space-between">
            <Text fontWeight="bold">Powered by Vercel</Text>
            <Button variant="link" color={mode('black', 'white')} _hover={{ color: 'orange.500' }} _active={{ color: 'orange.500' }} onClick={onOpen}>Credits</Button>
          </HStack>
          <AlertDialog
            isOpen={isOpen}
            onClose={onClose}>
            <AlertDialogOverlay>
              <AlertDialogContent bg={mode('white', 'gray.900')}>
                <AlertDialogHeader>
                  Credits
                </AlertDialogHeader>
                <AlertDialogBody>
                  Credits for the free graphql endpoint: 
                  <br /><Text as="a" target="_blank" href="https://graphql-compose.herokuapp.com/northwind" fontWeight="bold">https://graphql-compose.herokuapp.com/northwind</Text>.
                  <br />This is the graphql endpoint used in this project.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                  _hover={{ bgColor: 'orange.200', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                  _active={{ bgColor: 'orange.200' }}
                  _focus={{ borderColor: 'orange.500' }} 
                  color="white"
                  bgColor="orange.500" 
                  size="lg"
                  rounded="full" 
                  onClick={() => {
                    onClose()
                  }}>
                    Okay
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Container> 
      </Box>
    </Box>
  )
}