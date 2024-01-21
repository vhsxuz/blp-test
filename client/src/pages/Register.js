import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/user/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      setError(null);
      navigate('/');

    } catch (error) {
      console.error('An error occurred during registration:', error);
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
          <FormLabel htmlFor="username">Username</FormLabel> 
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            _placeholder={{ color: 'gray.500' }}
            color="black"
          />
        </FormControl>
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
          Register
        </Button>

        {error && (
          <Box mt={2} color="red.500">
            {error}
          </Box>
        )}
      </form>
    </Box>
  );
}

export default Register;
