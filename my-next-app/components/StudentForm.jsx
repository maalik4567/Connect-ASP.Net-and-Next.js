import { useState } from 'react';
import '@/app/globals.css';

const StudentForm = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;  
  const [formData, setFormData] = useState({
    StudentID: '',
    Name: '',
    Semester: '',
    CGPA: '',
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${apiUrl}/api/insertStd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log(response); // Log the entire response object for further inspection
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed to add student:', errorData);
        alert(`Failed to add student. Server response: ${errorData}`);
      } else {
        console.log('Student added successfully');
        setFormData({
          StudentID: '',
          Name: '',
          Semester: '',
          CGPA: '',
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred. Please try again later.');
    }
    console.log(apiUrl);
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto w-[90rem] border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Student ID:
        <input
          type="text"
          name="StudentID"
          value={formData.StudentID}
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Name:
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Semester:
        <input
          type="text"
          name="Semester"
          value={formData.Semester}
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </label>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        CGPA:
        <input
          type="text"
          name="CGPA"
          value={formData.CGPA}
          onChange={handleChange}
          autoComplete="off"
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Add Student
      </button>
      <br/>
      <br/>
    </form>
  );
};

export default StudentForm;
