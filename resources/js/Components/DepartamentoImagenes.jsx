import React, { useState } from 'react';
import ImagenManager from './ImagenManager';

const DepartamentoImagenes = ({ departamento }) => {
    const [imagenes, setImagenes] = useState([]);
    const [mostrarGestor, setMostrarGestor] = useState(false);

    const handleImagenesActualizadas = (nuevasImagenes) => {
        setImagenes(nuevasImagenes);
    };

    const imagenPrincipal = imagenes.find(img => img.tipo === 'principal');
    const galeriaImagenes = imagenes.filter(img => img.tipo === 'galeria');

    return (
        <div className="space-y-6">
            {/* Vista de imágenes */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Imagen principal */}
                {imagenPrincipal ? (
                    <div className="relative h-64 md:h-96">
                        <img
                            src={imagenPrincipal.url}
                            alt={imagenPrincipal.titulo || `Departamento ${departamento?.codigo}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                            Imagen Principal
                        </div>
                    </div>
                ) : (
                    <div className="h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>No hay imagen principal</p>
                        </div>
                    </div>
                )}

                {/* Galería de imágenes */}
                {galeriaImagenes.length > 0 && (
                    <div className="p-4">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">Galería</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {galeriaImagenes.map((imagen) => (
                                <div key={imagen.id} className="relative group">
                                    <img
                                        src={imagen.url}
                                        alt={imagen.titulo || 'Imagen de galería'}
                                        className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                                        onClick={() => {
                                            // Aquí podrías abrir un modal para ver la imagen en grande
                                            window.open(imagen.url, '_blank');
                                        }}
                                    />
                                    {imagen.titulo && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            {imagen.titulo}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{imagenes.length}</div>
                    <div className="text-sm text-blue-800">Total Imágenes</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{galeriaImagenes.length}</div>
                    <div className="text-sm text-green-800">Galería</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">
                        {imagenPrincipal ? 1 : 0}
                    </div>
                    <div className="text-sm text-purple-800">Principal</div>
                </div>
            </div>

            {/* Botón para gestionar imágenes */}
            <div className="text-center">
                <button
                    onClick={() => setMostrarGestor(!mostrarGestor)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {mostrarGestor ? 'Ocultar Gestor' : 'Gestionar Imágenes'}
                </button>
            </div>

            {/* Gestor de imágenes */}
            {mostrarGestor && (
                <ImagenManager
                    departamentoId={departamento?.id}
                    onImagenesActualizadas={handleImagenesActualizadas}
                />
            )}
        </div>
    );
};

export default DepartamentoImagenes;
