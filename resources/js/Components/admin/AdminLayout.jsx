import React from 'react';
import Sidebar from './Sidebar';
import { Link } from '@inertiajs/react';

export default function AdminLayout({ children, auth, title = 'Panel de Administrador' }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar auth={auth} />

            <div className="flex flex-col min-h-screen ml-0 md:ml-64"> {/* Adjusted margin for sidebar */}
                {/* Top navigation */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

                            <div className="flex items-center">
                                {/* Notifications */}
                                <button className="p-1 rounded-full text-gray-600 hover:text-gray-900 focus:outline-none">
                                    <span className="sr-only">Ver notificaciones</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>

                                {/* User menu */}
                                <div className="ml-3 relative group">
                                    <div className="flex items-center">
                                        <span className="hidden md:block mr-2 text-sm font-medium text-gray-700">
                                            {auth?.user?.name || 'Administrador'}
                                        </span>
                                        <button className="flex text-sm rounded-full focus:outline-none">
                                            <span className="sr-only">Abrir menú de usuario</span>
                                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                                                {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                                            </div>
                                        </button>
                                    </div>

                                    {/* Dropdown menu */}
                                    <div className="hidden group-hover:block absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Tu Perfil
                                        </Link>
                                        <Link href="/configuracion" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Configuración
                                        </Link>
                                        <hr className="my-1" />
                                        <Link href="/logout" method="post" as="button" className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-grow">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-white shadow-inner">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} CUSCO PREMIUM. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
