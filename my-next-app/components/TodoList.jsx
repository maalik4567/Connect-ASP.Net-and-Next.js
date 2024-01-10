'use client';
// components/AddNumber.jsx
import { useState, useEffect } from 'react';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [aspNetPageContent, setAspNetPageContent] = useState('');

  useEffect(() => {
    const fetchAspNetPage = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/todolist`);
        const content = await response.text();
        setAspNetPageContent(content);
      } catch (error) {
        console.error('Error fetching ASP.NET Core page:', error);
      }
    };

    fetchAspNetPage();
  }, []);

  return (
    <div>
      <h1>ASP.NET Core Page</h1>
      <div dangerouslySetInnerHTML={{ __html: aspNetPageContent }} />
    </div>
  );
};

export default TodoList;
