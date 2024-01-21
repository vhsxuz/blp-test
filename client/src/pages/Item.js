import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Item = () => {
  const { id } = useParams();
  const [itemName, setItemName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getItemName();
  }, [id]);

  const getItemName = async () => {
    const token = Cookies.get('jwtToken');
    const response = await fetch(`http://localhost:8080/api/v1/item/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const result = await response.json();
    setItemName(result.item.name);
  };

  const updateItem = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('jwtToken');
      const response = await fetch(`http://localhost:8080/api/v1/item/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating item:', errorData);
        return;
      }

      console.log('Item updated successfully');
      navigate('/home');
    } catch (error) {
      console.error('An error occurred during item update:', error);
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
      <form onSubmit={updateItem}>
        <FormControl mb={4}>
          <FormLabel htmlFor="id">Item Id</FormLabel>
          <Input
            id="id"
            type="id"
            value={id}
            placeholder={{ id }}
            _placeholder={{ color: 'gray.500' }}
            color="black"
            disabled={true}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="text">Item Name</FormLabel>
          <Input
            id="itemName"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            color="black"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Update Item
        </Button>
      </form>
    </Box>
  );
};

export default Item;