"use client";
import "./css/profilestyle.css"

import Header from "../Header";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Image from "next/image";
import Button from "@/components/Button";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";

export default function Profile() {
    const { user } = useAuth({ middleware: 'auth' });
    const [usuario, setUsuario] = useState(user);
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUsuario((prepUser) => ({
            ...prepUser,
            [name]: value,
        }));
    }
    
    return (
        <>
            <Header title="Profile" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form>
                                <div className="flex gap-10">
                                    <div className="personal-image">
                                        <label className="label">
                                            <input type="file" name="photo" id="photo" />
                                            <figure className="personal-figure bg-gray-300 rounded-full">
                                                {usuario.photo == "" && (
                                                    <Image width={56} height={56} src="/blank-profile-picture-973460_1280.png" className="personal-avatar" alt="avatar" />
                                                ) || (
                                                    <Image width={56} height={56} src={`/${usuario.photo}`} className="personal-avatar" alt="avatar" />
                                                )}
                                                <figcaption className="personal-figcaption">
                                                    <Image width={25} height={25} alt="camera" src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                                                </figcaption>
                                            </figure>
                                        </label>
                                    </div>
                                    <div className="p-2 w-full">
                                        <div>
                                            <Label for="name">Nome</Label>
                                            <Input name="name" id="name" value={usuario.name} onChange={handleChange} className="w-full" />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="email">Email</Label>
                                            <Input name="email" id="email" className="w-full" value={usuario.email} onChange={handleChange} />
                                        </div>
                                        <div className="mt-2">
                                            <Label for="phone">Contato</Label>
                                            <Input name="phone" id="phone" value={usuario.phone} onChange={handleChange} placeholder="(xx) xxxxx-xxxx" />
                                        </div>
                                        <div className="mt-7">
                                            <Button>Salvar</Button>
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