'use client';
import './css/profilestyle.css';

import React, { useState } from 'react';
import Header from '../Header';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Image from 'next/image';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';

export default function Profile() {
    const { user } = useAuth({ middleware: 'auth' });
    const [usuario, setUsuario] = useState({
        ...user,
        photo: user.photo || '',
        path_image: user.path_image || '/blank-profile-picture-973460_1280.png'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUsuario((prevUser) => ({
                ...prevUser,
                photo: file,
                path_image: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('imagem_profile', usuario.photo);
            formData.append('name', usuario.name);
            formData.append('email', usuario.email);
            formData.append('phone', usuario.phone);

            const res = await axios.post(`/api/users/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 200) {
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário', error);
        }
    };

    return (
        <>
            <Header title="Profile" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmitForm}>
                                <div className="flex gap-10">
                                    <div className="personal-image">
                                        <label className="label">
                                            <input 
                                                type="file" 
                                                name="imagem_profile" 
                                                id="imagem_profile" 
                                                onChange={handleChangeImage} 
                                                accept="image/*" 
                                            />
                                            <figure className="personal-figure bg-gray-300 rounded-full">
                                                <img 
                                                    src={usuario.path_image} 
                                                    className="personal-avatar" 
                                                    alt="avatar" 
                                                />
                                                <figcaption className="personal-figcaption">
                                                    <Image 
                                                        width={25} 
                                                        height={25} 
                                                        alt="camera" 
                                                        src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" 
                                                    />
                                                </figcaption>
                                            </figure>
                                        </label>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div>
                                            <Label htmlFor="name">Nome</Label>
                                            <Input 
                                                name="name" 
                                                id="name" 
                                                value={usuario.name} 
                                                onChange={handleChange} 
                                                className="w-full" 
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input 
                                                name="email" 
                                                id="email" 
                                                className="w-full" 
                                                value={usuario.email} 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <Label htmlFor="phone">Contato</Label>
                                            <Input 
                                                name="phone" 
                                                id="phone" 
                                                value={usuario.phone} 
                                                onChange={handleChange} 
                                                placeholder="(xx) xxxxx-xxxx" 
                                            />
                                        </div>
                                        <div className="mt-7">
                                            <Button type="submit">Atualizar</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
