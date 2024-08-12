import React from 'react';
import './index.css';
import TodoList from './components/Todolist';


function App() {
  return (
    <ChakraProvider>
    <h1>Hello World</h1>
    <TodoList />
    </ChakraProvider>
  );
}

export default App;
