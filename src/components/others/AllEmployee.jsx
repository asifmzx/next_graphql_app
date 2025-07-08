"use client";

import { useEffect, useState } from "react";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import Formv2 from "../UI/Form/Formv2";

const EmployeeGrid = () => {
    const [employees, setEmployees] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("employees");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setEmployees(parsedData);
        }
    }, []);

    const handleDelete = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    }

    const handleEdit = (index) => {
        setCurrentIndex(index);
        setIsEditing(true);
    }

    const handleUpdate = (updatedData) => {
        const updatedEmployees = [...employees];
        updatedEmployees[currentIndex] = updatedData;

        setEmployees(updatedEmployees);
        localStorage.setItem("employees", JSON.stringify(updatedEmployees));
        setIsEditing(false);
    }

    return (
        <div className="w-full px-3">
            {employees.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employees.map((employee, index) => (
                        <div key={employee.phone} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="font-semibold">Name:</div>
                                <div>
                                    <span>{employee.first_name}</span>
                                    <span className="mx-0.5"></span>
                                    <span>{employee.last_name}</span>
                                </div>

                                <div className="font-semibold">Email:</div>
                                <div className="break-all">{employee.email}</div>

                                <div className="font-semibold">Phone:</div>
                                <div>{employee.phone}</div>

                                <div className="font-semibold">Degree:</div>
                                <div>{employee.degree}</div>

                                <div className="font-semibold">Start Year:</div>
                                <div>{employee.start_year}</div>

                                <div className="font-semibold">LinkedIn:</div>
                                <div className="break-all">{employee.linkedin}</div>

                                <div className="font-semibold">Source:</div>
                                <div>{employee.source}</div>

                                <div className="font-semibold">Programming Language:</div>
                                <div>{employee.prolang}</div>

                                <div className="font-semibold">CV:</div>
                                <div className="text-xs break-all">{employee.CV}</div>
                            </div>

                            <div className="flex justify-end gap-3 mt-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => handleEdit(index)}
                                >
                                    <FaRegEdit size={18} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(index)}
                                >
                                    <FaTrash size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-4xl text-red-500 py-10">
                    No Job Applied Request found
                </div>
            )}

            {isEditing && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="flex flex-col rounded-lg p-6 w-full overflow-x-auto max-h-[90vh] overflow-y-auto">
                        <div>
                            <h2 className="mx-[27.5%] text-3xl font-bold text-red-600">Edit Employee</h2>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex text-red-500 hover:text-red-700 mx-[70%] text-2xl border-1 rounded-full border-red-500 bg-transparent w-8.5 h-8.5 items-center justify-center"
                            >
                                ✕
                            </button>
                        </div>

                        <Formv2
                            initialData={employees[currentIndex]}
                            onSubmit={handleUpdate}
                            isEditMode={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeGrid;