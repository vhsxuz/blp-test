import { FormControl, FormLabel, Input, Button, Box, Link } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the js-cookie library

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

      setError(null);

      const { token } = await response.json();

      // Store the JWT token in a cookie with a 7-day expiration
      Cookies.set('jwtToken', token, { expires: 7 });

      navigate('/home');

    } catch (error) {
      console.error('An error occurred during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      bg="gray.100"
      p={8}
      borderRadius="md"
      boxShadow="md"
      mx="auto"
      mt={64}
      maxW="lg"
      width="100%"
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.500' }}
            color="black"
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            _placeholder={{ color: 'gray.500' }}
            color="black"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>

        {error && (
          <Box mt={2} color="red.500">
            {error}
          </Box>
        )}

        <Link as={RouterLink} to="/register" color="blue.500" mt={2} ml={2}>
          Register
        </Link>
      </form>
    </Box>
  );
}

export default Login;