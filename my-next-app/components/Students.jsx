// Students.jsx
import React, { useState, useEffect } from 'react';
import '@/app/globals.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/students`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[50rem] bg-white text-black drop-shadow-2xl">
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      <Table isStriped aria-label="Student Data Table" className="border text-left">
        <TableHeader className="w-96">
          <TableColumn className="border">Student ID</TableColumn>
          <TableColumn className="border">Name</TableColumn>
          <TableColumn className="border">Semester</TableColumn>
          <TableColumn className="border">CGPA</TableColumn>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.studentId} className="border">
              <TableCell className="border">{student.studentId}</TableCell>
              <TableCell className="border">{student.name}</TableCell>
              <TableCell className="border">{student.semester}</TableCell>
              <TableCell className="border">{student.cgpa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Students;
