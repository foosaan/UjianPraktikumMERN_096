import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Text, Heading, useColorModeValue, Link, useToast } from '@chakra-ui/react';
import { supabase } from '../supabaseClient';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export default function Login({ setSession }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      navigate('/profile');
    } catch (error) {
      toast({
        title: "Error",
        description: error.error_description || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const bgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const inputBgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box maxWidth="400px" margin="0 auto" mt={16}>
      <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="2xl">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl" color={textColor}>Masuk</Heading>
          <FormControl>
            <FormLabel fontSize="lg">Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              bg={inputBgColor}
              size="lg"
              borderRadius="md"
            />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="lg">Kata Sandi</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              bg={inputBgColor}
              size="lg"
              borderRadius="md"
            />
          </FormControl>
          <Button 
            onClick={handleLogin} 
            colorScheme="blue" 
            isLoading={loading} 
            width="full"
            size="lg"
            borderRadius="md"
            _hover={{ bg: "blue.600" }}
          >
            Masuk
          </Button>
          <Text fontSize="md">
            Belum punya akun? <Link as={RouterLink} to="/signup" color="blue.500" fontWeight="bold">Daftar</Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}