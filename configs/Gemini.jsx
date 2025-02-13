const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const CodeGenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());

    export const generateCode = model.startChat({
      generationConfig: CodeGenerationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "generate todo App : Generate a Project in React. Create multiple components, organizing them in a folder structure and use Tailwind CSS for styling.\n\n     Return the response in JSON format with the following schema:\n     {\n     \"projectTitle\":\"\",\n     \"explanation\":\"\",\n     \"files\":{\n        \"/App.js\":{\n           \"code\":\"\"\n        },\n        ...\n     },\n     \"generatedFiles\":[]\n  }\n\n   Here's the refortmatted and improved verion of your prompt:\n    \n   Generate a programming code structure for a React project using the Vite.\n\n   Return the response in JSON format with the following schema:\n\n   json\n   Copy code\n   {\n     \"projectTitle\":\"\",\n     \"explanation\":\"\",\n     \"files\":{\n        \"/App.js\":{\n           \"code\":\"\"\n        },\n        ...\n     },\n     \"generatedFiles\":[]\n   }\n\n   Ensure the files field contains all the created files, and the generatedFiles field contains the names of the files created.\n\n   files:{\n     \"/App.js\":{\n       \"code\":\"import React from 'react;\\nimport './styles.css';\\n export \"\n     },\n     \n   }\n\n   Additionally, include an explanation of the project's structure, purpose, and any other relevant information.\n    - For placeholder images, please use a \"https://archive.org/download/placeholder.png\" URL.\n    - Add Emoji icons whenever needed   to give good user experience.\n    - The lucide-react package is available to be imported IF NECESSARY.\n    `,"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"projectTitle\": \"React Todo App with Tailwind CSS\",\n  \"explanation\": \"This project is a simple Todo application built with React and styled with Tailwind CSS.  It allows users to add, delete, and mark tasks as completed.  The project is structured with components for better organization and maintainability. It uses local storage for persistence.\\n\\n**Folder Structure:**\\n\\n*   `src/`\\n    *   `components/`\\n        *   `TodoForm.jsx`: Component for adding new todos.\\n        *   `TodoList.jsx`: Component to display the list of todos.\\n        *   `TodoItem.jsx`: Component to display individual todo items.\\n    *   `App.js`:  The main application component.\\n    *   `App.css`: Global styles (if any).  Note: Tailwind is primarily used, so this may be minimal.\\n    *   `index.js`: Entry point of the application.\\n    *   `index.css`:  Base CSS (e.g., Tailwind imports).\\n\\n**Functionality:**\\n\\n*   **Adding Todos:** Users can input a todo item and add it to the list.\\n*   **Deleting Todos:** Users can remove todos from the list.\\n*   **Marking as Complete:** Users can toggle the completion status of todos.\\n*   **Local Storage:**  Todos are saved in local storage to persist across sessions.\",\n  \"files\": {\n    \"/src/App.js\": {\n      \"code\": \"import React, { useState, useEffect } from 'react';\\nimport TodoForm from './components/TodoForm';\\nimport TodoList from './components/TodoList';\\nimport './App.css';\\n\\nfunction App() {\\n  const [todos, setTodos] = useState(() => {\\n    const storedTodos = localStorage.getItem('todos');\\n    return storedTodos ? JSON.parse(storedTodos) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem('todos', JSON.stringify(todos));\\n  }, [todos]);\\n\\n  const addTodo = (text) => {\\n    setTodos([...todos, { id: Date.now(), text, completed: false }]);\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTodos(\\n      todos.map((todo) =>\\n        todo.id === id ? { ...todo, completed: !todo.completed } : todo\\n      )\\n    );\\n  };\\n\\n  const deleteTodo = (id) => {\\n    setTodos(todos.filter((todo) => todo.id !== id));\\n  };\\n\\n  return (\\n    <div className=\\\"container mx-auto p-4\\\">\\n      <h1 className=\\\"text-2xl font-bold mb-4 text-center\\\">📝 Todo App</h1>\\n      <TodoForm addTodo={addTodo} />\\n      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />\\n    </div>\\n  );\\n}\\n\\nexport default App;\"\n    },\n    \"/src/components/TodoForm.jsx\": {\n      \"code\": \"import React, { useState } from 'react';\\n\\nfunction TodoForm({ addTodo }) {\\n  const [text, setText] = useState('');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (text.trim()) {\\n      addTodo(text);\\n      setText('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\\"mb-4\\\">\\n      <input\\n        type=\\\"text\\\"\\n        className=\\\"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline\\\"\\n        placeholder=\\\"Add a todo...\\\"\\n        value={text}\\n        onChange={(e) => setText(e.target.value)}\\n      />\\n      <button className=\\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2\\\"\\n       type=\\\"submit\\\">➕ Add Todo</button>\\n    </form>\\n  );\\n}\\n\\nexport default TodoForm;\"\n    },\n    \"/src/components/TodoList.jsx\": {\n      \"code\": \"import React from 'react';\\nimport TodoItem from './TodoItem';\\n\\nfunction TodoList({ todos, toggleComplete, deleteTodo }) {\\n  return (\\n    <ul>\\n      {todos.map((todo) => (\\n        <TodoItem\\n          key={todo.id}\\n          todo={todo}\\n          toggleComplete={toggleComplete}\\n          deleteTodo={deleteTodo}\\n        />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;\"\n    },\n    \"/src/components/TodoItem.jsx\": {\n      \"code\": \"import React from 'react';\\n\\nfunction TodoItem({ todo, toggleComplete, deleteTodo }) {\\n  return (\\n    <li className=\\\"flex justify-between items-center py-2 border-b border-gray-200\\\">\\n      <div className=\\\"flex items-center\\\">\\n        <input\\n          type=\\\"checkbox\\\"\\n          className=\\\"mr-2 leading-tight\\\"\\n          checked={todo.completed}\\n          onChange={() => toggleComplete(todo.id)}\\n        />\\n        <span className={` ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>\\n          {todo.text}\\n        </span>\\n      </div>\\n      <button className=\\\"bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline\\\" onClick={() => deleteTodo(todo.id)}>🗑️ Delete</button>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;\"\n    },\n    \"/src/App.css\": {\n      \"code\": \"/* Any global CSS can go here if needed */\\n\"\n    },\n    \"/src/index.js\": {\n      \"code\": \"import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport './index.css';\\nimport App from './App';\\n\\nconst root = ReactDOM.createRoot(document.getElementById('root'));\\nroot.render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);\"\n    },\n    \"/src/index.css\": {\n      \"code\": \"@tailwind base;\\n@tailwind components;\\n@tailwind utilities;\"\n    },\n    \"/tailwind.config.js\":{\n       \"code\":\"/** @type {import('tailwindcss').Config} */\\nmodule.exports = {\\n  content: [\\\"./src/**/*.{js,jsx,ts,tsx}\\\"],\\n  theme: {\\n    extend: {},\\n  },\\n  plugins: [],\\n}\"\n    },\n     \"/vite.config.js\": {\n      \"code\": \"import { defineConfig } from 'vite'\\nimport react from '@vitejs/plugin-react'\\n\\n// https://vitejs.dev/config/\\nexport default defineConfig({\\n  plugins: [react()],\\n})\"\n    }\n  },\n  \"generatedFiles\": [\n    \"/src/App.js\",\n    \"/src/components/TodoForm.jsx\",\n    \"/src/components/TodoList.jsx\",\n    \"/src/components/TodoItem.jsx\",\n    \"/src/App.css\",\n    \"/src/index.js\",\n    \"/src/index.css\",\n    \"/tailwind.config.js\",\n    \"/vite.config.js\"\n  ]\n}\n```"},
          ],
        },
      ],
    })
  
  
 