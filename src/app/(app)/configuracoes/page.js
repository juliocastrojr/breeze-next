"use client";
import { useAuth } from "@/hooks/auth";
import Header from "../Header";

export default function Configuracoes() {
    const { user } = useAuth({ middleware: 'auth' });
    
    return (
        <>
            <Header title="Configurações" />
            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-2">
                        <div className="p-6 bg-white border-b border-gray-200">
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}