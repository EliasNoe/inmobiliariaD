import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

const DepartamentoCard = ({ departamento }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Obtener la imagen principal o la primera de la galería
    const imagenes = departamento.imagenes || [];
    const imagenPrincipal = imagenes.find(img => img.tipo === 'principal') || imagenes[0];

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Carrusel de imágenes */}
            <div className="relative h-48 w-full">
                {imagenes.length > 0 ? (
                    <>
                        <img
                            src={imagenes[currentImageIndex].url}
                            alt={departamento.titulo}
                            className="w-full h-full object-cover"
                        />
                        {/* Controles del carrusel */}
                        {imagenes.length > 1 && (
                            <div className="absolute bottom-2 right-2 flex space-x-2">
                                <button
                                    onClick={() => setCurrentImageIndex((prev) =>
                                        prev === 0 ? imagenes.length - 1 : prev - 1
                                    )}
                                    className="bg-black bg-opacity-50 text-white p-1 rounded"
                                >
                                    ←
                                </button>
                                <button
                                    onClick={() => setCurrentImageIndex((prev) =>
                                        prev === imagenes.length - 1 ? 0 : prev + 1
                                    )}
                                    className="bg-black bg-opacity-50 text-white p-1 rounded"
                                >
                                    →
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Sin imagen</span>
                    </div>
                )}
            </div>

            {/* Información del departamento */}
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {departamento.titulo}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {departamento.estado}
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">{departamento.ubicacion}</p>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{departamento.habitaciones} Hab.</span>
                    <span>{departamento.banos} Baños</span>
                    <span>{departamento.area}m²</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                        S/ {departamento.precio.toLocaleString()}
                    </span>
                    <Link
                        href={route('catalogo.show', departamento.id)}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DepartamentoCard;
