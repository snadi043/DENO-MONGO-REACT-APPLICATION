import {React, Fragment, useState, useCallback, useEffect} from 'react';

import './Todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [enteredText, setEnteredText] = useState('');
    const [editedTodo, setEditedTodo] = useState();

    // useCallback is a lifecycle hook provided by react which calls the particular function to elimimate the process of re-rendering it everytime.
    // It improves the efficiency and optimizes the functionality of the particular block of the code.
    // It renders everytime the dependencies change.
    const getTodos = useCallback(async () => {
        try{
            const response = await fetch('http://localhost:8000/todos');
            const todosData = await response.json();
            setTodos(todosData.todos);
        }
        catch(err){
            console.log(err);
        }
    }, []);

    // useEffect -> this is an react lifecycle hook which is responsible to handle the side-effects based on the dependencies.
    // the second argument in this function is a cleanup function which is responbile to re-run the hook and resets the component to avoid infinite loops.
    useEffect(() => {
        getTodos();
    }, [getTodos]);

    useEffect(() => {
        if(editedTodo){
            setEnteredText(editedTodo.text);
        }
    }, [editedTodo]);

    // inputChangeHandler -> this is an arrow function which is responsible to perform the actions related to the input fields when user tries to change/enters value in the input of a form in the browser. 
    const inputChangeHandler = (event) => {
        setEnteredText(event.target.value);
    }

    // submitButtonHandler -> this is an arrow function which is responsible to perform the actions when user clicks on submit button in the browser. 
    const submitButtonHandler = async (event) => {
        event.preventDefault(); // Prevent the default action on the browser to submit the data before user interactions.
        setEnteredText(''); // Reset the user entered input values
        setEditedTodo(null); 
        let url = 'http://localhost:8000/todos';
        let method = "POST";
        // Checking the condition if the user tries to edit the todo then change the url and method accordingly.
        if(editedTodo){
            url = url + '/' + editedTodo.id;
            method = "PUT";
        }
        // Fetching the response using the fetch API by setting all the necessary properties like headers, body and method.
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify({
                text: enteredText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data); 
        getTodos(); // if the condition is not to edit a todo then it is handled by getTodos() which is responsible to fetch all the todos in the application.
    }

    // editButtonHandler -> this is an arrow function which is responsible to perform the actions when user clicks on edit button in the browser. 
    const editButtonHandler = (todo) => {
        setEditedTodo(todo);
    }

    // deleteButtonHandler -> this is an arrow function which is responsible to perform the actions when user clicks on delete button in the browser. 
    const deleteButtonHandler = async (todoId) => {
        const url = 'http://localhost:8000/todos/' + todoId;
        const response = await fetch(url, {method: 'DELETE'});
        const data = await response.json();
        console.log(data);
        getTodos();
    }

  return (
  <Fragment>
    <div className="todos-form">
      <form onSubmit={submitButtonHandler}>
        <label>Enter Todo</label>
        <input 
          type="text" 
          value={enteredText} 
          onChange={inputChangeHandler}
        />
        <button type="submit">{(editedTodo) ? 'Edit' : 'Add'} Todo</button>
      </form>
      {
        todos && todos.length > 0 && (
            <ul className="todos-list">
                {todos.map((todo) => 
                (
                    <li key={todo.id}>
                        <span>{todo.title.text}</span>
                        <div className="todo-actions">
                            <button onClick={editButtonHandler.bind(null, todo)}>Edit</button>
                            <button onClick={deleteButtonHandler.bind(null, todo.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
  </Fragment>
  );
}

export default Todo;