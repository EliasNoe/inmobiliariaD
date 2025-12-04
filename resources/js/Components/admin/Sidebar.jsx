import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar({ auth }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Verificar si el usuario actual es administrador
    const isAdmin = auth?.user?.role === 'administrador';

    // Si el usuario no es administrador, no mostramos el sidebar
    if (!isAdmin) {
        return null;
    }

    return (
        <div className={`bg-gray-900 text-white ${isCollapsed ? 'w-20' : 'w-64'} min-h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-30`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!isCollapsed && (
                    <div className="text-xl font-bold text-white">
                        Admin Panel
                    </div>
                )}
                <button
                    onClick={toggleSidebar}
                    className={`text-white focus:outline-none ${isCollapsed ? 'mx-auto' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                    </svg>
                </button>
            </div>

            <div className="py-4">
                <Link
                    href="/admin/dashboard"
                    className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {!isCollapsed && <span className="ml-3">Dashboard</span>}
                </Link>

                <Link
                    href="/admin/usuarios"
                    className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {!isCollapsed && <span className="ml-3">Gestión de Usuarios</span>}
                </Link>

                <Link
                    href="/admin/departamentos"
                    className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {!isCollapsed && <span className="ml-3">Gestión de Departamentos</span>}
                </Link>

                <Link
                    href="/admin/reportes"
                    className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {!isCollapsed && <span className="ml-3">Reportes</span>}
                </Link>

                <hr className="my-3 border-gray-700" />

                <Link
                    href="/profile"
                    className="flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {!isCollapsed && <span className="ml-3">Perfil</span>}
                </Link>

                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="w-full flex items-center py-3 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {!isCollapsed && <span className="ml-3">Cerrar Sesión</span>}
                </Link>
            </div>
        </div>
    );
}
