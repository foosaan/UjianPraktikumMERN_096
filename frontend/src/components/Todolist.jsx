
import React from 'react';
import { VStack, List, Text } from '@chakra-ui/react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }) {
  if (todos.length === 0) {
    return <Text textAlign="center" color="gray.500">Tidak ada tugas. Tambahkan tugas baru!</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <List spacing={3}>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </List>
    </VStack>
  );
}

export default TodoList;
