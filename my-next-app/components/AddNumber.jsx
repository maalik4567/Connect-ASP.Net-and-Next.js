// components/AddNumber.jsx
import { useState, useEffect } from 'react';
import '@/app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNumber = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [aspNetPageContent, setAspNetPageContent] = useState('');

  useEffect(() => {
    const fetchAspNetPage = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/addNumbers`);
        const content = await response.text();
        setAspNetPageContent(content);
      } catch (error) {
        console.error('Error fetching ASP.NET Core page:', error);
      }
    };

    fetchAspNetPage();
  }, []);

  const handleAdd = () => {
    // Define the logic for handling the "Add" button click here
    console.log('Add button clicked');
    // Add your logic to interact with ASP.NET Core API or perform other actions
  };

  return (
    <div>
      <h1>ASP.NET Core Page</h1>
      <div dangerouslySetInnerHTML={{ __html: aspNetPageContent }} />
      <button type="button" className="btn btn-primary" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default AddNumber;
