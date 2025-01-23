import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Assignment = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        // Fetch the JSON file from the public folder
        fetch("/assignment.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch the data.");
                }
                return response.json();
            })
            .then((data) => {
                setAssignments(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Assignments</h1>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 text-gray-600">ID</th>
              <th className="py-3 text-gray-600">Title</th>
              <th className="py-3 text-gray-600">Description</th>
              <th className="py-3 text-gray-600">Deadline</th>
              <th className="py-3 text-gray-600">Total Marks</th>
              <th className="py-3 text-gray-600">Aciton</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-gray-50 transition">
                <td className="py-4">{index + 1}</td>
                <td className="py-4 font-semibold">{assignment.title}</td>
                <td className="py-4">{assignment.description}</td>
                <td className="py-4">{assignment.deadline}</td>
                <td className="py-4">{assignment.totalMarks}</td>
                <td className="py-4"><Link><button className='btn bg-orange-500 text-white'>Submit</button></Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Assignment;