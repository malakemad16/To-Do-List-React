import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function App() {
  return <ToDoWrapper />
}

function ToDoWrapper() {
  const [tasks, setTasks] = useState([]);

  const addTask = task => {
    setTasks([...tasks, { id: Date.now(), task: task, completed: false, isEditing: false }]);
  }

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleEditing = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, isEditing: !task.isEditing }
          : task
      )
    );
  };
  const editTask = (task, id) => {
    setTasks(
      tasks.map(t =>
        t.id === id
          ? { ...t, task, isEditing: !t.isEditing }
          : t
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }
  return (
    <div className='container'>
      <h1 className='main-title'>Get Things Done!</h1>
      <ToDoForm addTask={addTask} />
      <div className='tasks'>
        {tasks.length > 0 ? (tasks.map((task) =>
          task.isEditing ? (
            <EditToDoForm key={task.id} editTask={editTask} task={task} />
          ) : (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              handleEditing={handleEditing}
              toggleComplete={toggleComplete}
            />
          )
        )) : <p className='task'>No tasks yet</p>}
      </div>
    </div>
  );
}

function ToDoForm({ addTask }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    value !== "" && addTask(value);
    setValue("");
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type='text' className='input' placeholder="What is today's task?"
        onChange={(e) => setValue(e.target.value)} value={value} />
      <button type='submit' className='add'>Add Task</button>
    </form>
  );
}

function EditToDoForm({ editTask, task }) {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    e.preventDefault();

    editTask(value, task.id);
  }

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input type='text' className='input' placeholder="Update Task"
        onChange={(e) => setValue(e.target.value)} value={value} />
      <button type='submit' className='add'>Update Task</button>
    </form>
  );
}

function Task({ task, toggleComplete, handleEditing, deleteTask }) {
  return (
    <div className='task' key={task.id} >
      <p className={`${task.completed && 'completed'}`}>{task.task}</p>
      <div className='icons'>
        <FontAwesomeIcon icon={faCheck} onClick={() => toggleComplete(task.id)} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEditing(task.id)} />
        <FontAwesomeIcon icon={faTrashCan} className='del' onClick={() => deleteTask(task.id)} />
      </div>
    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

