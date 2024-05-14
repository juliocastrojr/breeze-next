"use client"

import Header from "../../../Header";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Button from "@/components/Button";
import LinkComponent from "@/components/LinkComponent";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function FormTask({params}) {
    const router = useRouter();
    const { id } = params
    const [tarefa, setTarefa] = useState({
        task: "", 
        timeSpent: "",
        taskUrl: "",
        status_id: 0
    });
    const [status, setStatus] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmitForm = async (event) => {
        event.preventDefault()
        
        const response = await axios.put(`/api/tasks/${id}`, tarefa, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            setMensagem('Tarefa atualizada com sucesso!');
            setTimeout(() => {
                setMensagem('');
                router.push('/dashboard');
            }, 2000);
        }
        
    }

    useEffect(() => {
        async function fetchTask() {
            axios
            .get(`/api/tasks/${id}`)
            .then((res) => setTarefa(res.data))
            .catch((err) => {
                console.log("erro!", err);
            })
        }
        const fetchStatus = async () => {
            axios
            .get('/api/status')
            .then((response) => setStatus(response.data))
            .catch((err) => {
                console.log("Erro!", err);
            })
        }
        
        fetchStatus(); 
        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarefa((prevTarefa) => ({
            ...prevTarefa,
            [name]:value,
        }));
    }

    return (
        <>
            <Header title="Tarefas - Edit" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {mensagem && (
                        <div className="bg-green-300 border-green-600 rounded-md p-2 text-green-700 w-96 m-auto text-center mb-5">
                            {mensagem}
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 w-full">  
                            <form onSubmit={handleSubmitForm}>
                                <div>
                                    <Label htmlFor="task">Tarefa</Label>
                                    <Input
                                        id="task"
                                        name="task"
                                        type="text"
                                        value={tarefa.task}
                                        onChange={handleChange}
                                        className="w-96"
                                        required 
                                    />
                                </div>

                                <div className="mt-4">
                                    <Label htmlFor="taskUrl">URL da tarefa</Label>
                                    <Input
                                        id="taskUrl"
                                        name="taskUrl"
                                        type="text"
                                        value={tarefa.taskUrl}
                                        onChange={handleChange}
                                        className="w-96"
                                    />
                                </div>

                                <div className="mt-4 flex gap-5">
                                    <div>
                                        <Label htmlFor="timeSpent">Tempo gasto</Label>
                                        <Input
                                            id="timeSpent"
                                            name="timeSpent"
                                            type="text"
                                            value={tarefa.timeSpent}
                                            onChange={handleChange}
                                            className="w-20"
                                            required 
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="status_id">Status</Label>
                                        <select id="status_id" name="status_id" onChange={handleChange} 
                                        className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                            <option value="">Selecione o status</option>
                                            {Object.keys(status).map((statusID) => (
                                                <option value={status[statusID].id} selected={tarefa.status_id == status[statusID].id}>{status[statusID].status}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="w-60 grid grid-cols-2 gap-4 mt-4">
                                    <LinkComponent 
                                        href="/dashboard">
                                        Voltar
                                    </LinkComponent>
                                    <Button type="submit" className="inline-grid">Salvar</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}