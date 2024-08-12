import React, { useState } from 'react';
import { Box, Input, Button, FormControl, HStack } from '@chakra-ui/react';

function AddTodoForm({ addTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <FormControl>
        <HStack>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tambahkan tugas baru"
            borderColor="blue.300"
            _hover={{ borderColor: "blue.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
          />
          <Button type="submit" colorScheme="blue">
            Tambah
          </Button>
        </HStack>
      </FormControl>
    </Box>
  );
}

export default AddTodoForm;