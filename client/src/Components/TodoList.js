import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  let d = localStorage.getItem('data');
  if(d==undefined || d==null) {
    d = [];
    localStorage.setItem('data',JSON.stringify([]));
  }
  
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('data'));
    if (items) {
      setTodos(items);
    }
  }, []);
  
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    } 
    const newTodos = [todo, ...todos];
    localStorage.setItem('data', JSON.stringify(newTodos));
    setTodos(newTodos);
    console.log(...todos);
  };

  // const updateTodo = (todoId, newValue) => {
  //   console.log(todoId, newValue)
  //   if (!newValue.text || /^\s*$/.test(newValue.text)) {
  //     return;
  //   }

  //   setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  // };

  const editTodo = (id, val) => {
    let editedTodos = todos.map(todo => {
      if(todo.id === id) {
        todo.text = val.text
      }
      return todo;
    });
    localStorage.setItem('data', JSON.stringify(editedTodos));
    setTodos(editedTodos);
  }

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    localStorage.setItem('data', JSON.stringify(removedArr));
    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    localStorage.setItem('data', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        // updateTodo={updateTodo}
        editTodo={editTodo}
      />
    </>
  );
}

export default TodoList;