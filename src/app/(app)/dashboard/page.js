'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/app/(app)/Header';
import LinkComponent from '@/components/LinkComponent';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import Link from 'next/link';
import { FaRegTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth({ middleware: 'auth' });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/api/tasks');
                setTasks(response.data);
            } catch (err) {
                console.error("Erro ao buscar tarefas!", err);
            }
        };

        fetchTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir essa tarefa?')) {
            try {
                const res = await axios.delete(`/api/tasks/${id}`);
                if (res.status === 200) {
                    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                }
            } catch (error) {
                console.error('Erro ao deletar tarefa', error);
            }
        }
    };

    return (
        <>
            <Header title="Tarefas" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='flex-1 mb-5'>
                        <LinkComponent className="grid-flow-col gap-2" href="/dashboard/form">
                            <FaPlus /> Nova
                        </LinkComponent>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className='w-full p-2'>
                                <thead>
                                    <tr>
                                        <th className="text-start px-2">Tarefa</th>
                                        <th className="text-start px-2">Horas gastas</th>
                                        <th className="text-start px-2">Url da tarefa</th>
                                        <th className="text-start px-2">Desenvolvedor</th>
                                        <th className="text-start px-2">Status</th>
                                        <th className="text-start px-2">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task) => (
                                        <tr key={task.id} className="border-t border-gray-300 hover:bg-gray-100">
                                            <td className="px-2 py-2">{task.task}</td>
                                            <td className="px-2 py-2">{task.timeSpent}</td>
                                            <td className="px-2 py-2">{task.taskUrl}</td>
                                            <td className="px-2 py-2">{task.user.name}</td>
                                            <td className="px-2 py-2">{task.status.status}</td>
                                            <td className="px-2 py-2 flex items-center gap-2">
                                                {task.userId === user.id && (
                                                    <>
                                                        <Link
                                                            className='inline-block px-3 py-2 bg-green-700 hover:bg-green-600 rounded-md cursor-pointer text-white'
                                                            href={`/dashboard/edit/${task.id}`}
                                                        >
                                                            <FaEdit />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteTask(task.id)}
                                                            className='inline-block px-3 py-2 bg-red-700 hover:bg-red-600 rounded-md cursor-pointer text-white ml-1'
                                                        >
                                                            <FaRegTrashAlt />
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
