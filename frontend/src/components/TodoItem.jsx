
import React, { useState } from 'react';
import { Checkbox, Text, Button, ListItem, HStack, Input, IconButton } from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    updateTodo(todo._id, editText);
    setIsEditing(false);
  };

  return (
    <ListItem p={2} bg="gray.100" borderRadius="md">
      <HStack spacing={4}>
        <Checkbox
          isChecked={todo.completed}
          onChange={() => toggleTodo(todo._id)}
          colorScheme="green"
        />
        {isEditing ? (
          <>
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              size="sm"
            />
            <IconButton
              icon={<CheckIcon />}
              onClick={handleEdit}
              size="sm"
              colorScheme="green"
            />
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setIsEditing(false)}
              size="sm"
              colorScheme="red"
            />
          </>
        ) : (
          <>
            <Text
              flex={1}
              textDecoration={todo.completed ? 'line-through' : 'none'}
            >
              {todo.text}
            </Text>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => deleteTodo(todo._id)}
              size="sm"
              colorScheme="red"
            />
          </>
        )}
      </HStack>
    </ListItem>
  );
}

export default TodoItem;