import React from 'react'
import './App.css'
import { useState, useEffect} from 'react'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
          try {
              setTodos(JSON.parse(savedTodos));
          } catch (error) {
              console.error("Error parsing saved todos from localStorage:", error);
              setTodos([]);
          }
      }
      console.log(inputValue);
      
  }, []);

  useEffect(() => {
      if (todos.length > 0) {
          localStorage.setItem('todos', JSON.stringify(todos));
      } else {
          localStorage.removeItem('todos');
      }
  }, [todos]);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const addTodo = () => {
      if (inputValue.trim()) {
        setTodos([...todos, inputValue]);
        setInputValue(''); 
      }
      else(alert("Please add tasks.") )
    };
  
    const deleteTodoList = (index) => {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    };
  
  return (
    <>
        <div className='container'>
      <h1>To-Do List</h1>
     <div className='inBtn'>
        <input
        type="text"
        placeholder="Enter a new task"
        value={inputValue}
        onChange={handleInputChange}
        /> <br />
         <button className='addbtn' onClick={addTodo} >Add Task</button>
     </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button className='deleteButton' 
              onClick={() => deleteTodoList(index)}>Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default TodoList