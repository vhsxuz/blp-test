import {
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const Home = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const token = Cookies.get('jwtToken');

      if (!token) {
        navigate('/');
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };

      const response = await fetch(
        'http://localhost:8080/api/v1/item',
        requestOptions
      );

      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const result = await response.json();
      console.log(result.items);
      setItems(result.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('jwtToken');
      const response = await fetch("http://localhost:8080/api/v1/item", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return;
      }

      getItems();
      setItemName('');
      navigate('/home');

    } catch (error) {
      console.error('An error occurred during registration:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const logout = () => {
    Cookies.remove('jwtToken');
    navigate('/');
  };

  const deleteItem = async (itemId) => {
    try {
      const token = Cookies.get('jwtToken');
      const response = await fetch(`http://localhost:8080/api/v1/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Deletion failed');
        return;
      }
  
      getItems();
    } catch (error) {
      console.error('An error occurred during deletion:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const updateItem = (id) => {
    console.log(id)
    navigate(`/update-item/${id}`);
  }

  return (
    <Stack>
      <Stack ms={24} me={24} mt={64} background={'gray.100'}>
        <TableContainer>
          <Table size='sm'>
            <Thead background={'gray.200'}>
              <Tr>
                <Th>Index</Th>
                <Th>Name</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.name}</Td>
                  <Td>
                    <Button colorScheme='telegram' onClick={() => updateItem(item.id)}>Update</Button>
                    <Button ml={2} colorScheme='red' onClick={() => deleteItem(item.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>

      <Button colorScheme='red' ms={24} me={24} mt={2} onClick={logout}>
        Logout
      </Button>

      <Box ms={24} me={24} mt={12}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">Item Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
              _placeholder={{ color: 'gray.500' }}
              color="black"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add Item
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default Home;
