import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';
import Link from "next/link"

const FloatingActionButton = () => {
  return (
    <Box position="fixed" bottom="80px" right="35px">
        <Link href="/add">
            <IconButton
                size="lg"
                rounded="full"
                _hover={{ bg: 'orange.400', transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                _active={{ bg: 'orange.400' }}
                _focus={{ borderColor: 'orange.300' }} 
                bg="orange.300"
                color="white"
                icon={<IoAdd size="28px" />}
            />
        </Link>
    </Box>
  );
};

export default FloatingActionButton;