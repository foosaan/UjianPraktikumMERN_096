import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, VStack, Heading, Text, Spinner, useToast, Container } from '@chakra-ui/react';
import TodoList from './components/Todolist';
import AddTodoForm from './components/AddTodoForm';

const API_BASE_URL = 'http://localhost:3000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil tugas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (judul, deskripsi) => {
    try {
      const response = await axios.post(API_BASE_URL, { judul, deskripsi });
      setTodos([response.data, ...todos]);
      setError(null);
      toast({
        title: "Sukses",
        description: "Tugas berhasil ditambahkan.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError('Gagal menambahkan tugas: ' + err.message);
      toast({
        title: "Error",
        description: "Gagal menambahkan tugas: " + err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      const response = await axios.put(`${API_BASE_URL}/${id}`, { selesai: !todoToUpdate.selesai });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      setError(null);
    } catch (err) {
      setError('Gagal memperbarui tugas: ' + err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Gagal menghapus tugas: ' + err.message);
    }
  };

  const updateTodo = async (id, judul, deskripsi) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, { judul, deskripsi });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
      setError(null);
      toast({
        title: "Sukses",
        description: "Tugas berhasil diperbarui.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setError('Gagal memperbarui tugas: ' + err.message);
      toast({
        title: "Error",
        description: "Gagal memperbarui tugas: " + err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.md" py={10}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" textAlign="center" color="blue.600">Daftar Tugas</Heading>
          {error && <Text color="red.500" textAlign="center">{error}</Text>}
          {loading ? (
            <Spinner size="xl" alignSelf="center" />
          ) : (
            <>
              <AddTodoForm addTodo={addTodo} />
              <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            </>
          )}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
