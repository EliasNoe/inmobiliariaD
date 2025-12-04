import React, { useState, useEffect } from 'react';

const ImagenManager = ({ departamentoId, onImagenesActualizadas }) => {
    const [imagenes, setImagenes] = useState([]);
    const [nuevaImagen, setNuevaImagen] = useState({
        url: '',
        titulo: '',
        descripcion: '',
        tipo: 'galeria'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previsualizacion, setPrevisualizacion] = useState('');

    // Cargar imágenes del departamento
    useEffect(() => {
        if (departamentoId) {
            cargarImagenes();
        }
    }, [departamentoId]);

    const cargarImagenes = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/v1/imagenes?departamento_id=${departamentoId}`);
            const data = await response.json();

            if (data.success) {
                setImagenes(data.data);
                if (onImagenesActualizadas) {
                    onImagenesActualizadas(data.data);
                }
            }
        } catch (error) {
            console.error('Error al cargar imágenes:', error);
            setError('Error al cargar las imágenes');
        } finally {
            setLoading(false);
        }
    };

    const verificarUrl = async (url) => {
        if (!url) return;

        try {
            const response = await fetch('/api/v1/imagenes/verificar-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (data.success && data.data.url_valida && data.data.es_imagen) {
                setPrevisualizacion(url);
                setError('');
            } else {
                setPrevisualizacion('');
                setError('La URL no es válida o no apunta a una imagen');
            }
        } catch (error) {
            console.error('Error al verificar URL:', error);
            setError('Error al verificar la URL');
            setPrevisualizacion('');
        }
    };

    const agregarImagen = async (e) => {
        e.preventDefault();

        if (!nuevaImagen.url) {
            setError('La URL es requerida');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/api/v1/imagenes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    ...nuevaImagen,
                    departamento_id: departamentoId
                })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Imagen agregada exitosamente');
                setError('');
                setNuevaImagen({ url: '', titulo: '', descripcion: '', tipo: 'galeria' });
                setPrevisualizacion('');
                await cargarImagenes();

                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.message || 'Error al agregar la imagen');
            }
        } catch (error) {
            console.error('Error al agregar imagen:', error);
            setError('Error al agregar la imagen');
        } finally {
            setLoading(false);
        }
    };

    const eliminarImagen = async (id) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/v1/imagenes/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                }
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('Imagen eliminada exitosamente');
                await cargarImagenes();
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.message || 'Error al eliminar la imagen');
            }
        } catch (error) {
            console.error('Error al eliminar imagen:', error);
            setError('Error al eliminar la imagen');
        } finally {
            setLoading(false);
        }
    };

    const cambiarTipoImagen = async (id, nuevoTipo) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/v1/imagenes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ tipo: nuevoTipo })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(`Imagen marcada como ${nuevoTipo}`);
                await cargarImagenes();
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.message || 'Error al actualizar la imagen');
            }
        } catch (error) {
            console.error('Error al actualizar imagen:', error);
            setError('Error al actualizar la imagen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gestión de Imágenes
            </h3>

            {/* Mensajes de estado */}
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                </div>
            )}

            {/* Formulario para agregar nueva imagen */}
            <form onSubmit={agregarImagen} className="mb-6">
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            URL de la imagen *
                        </label>
                        <input
                            type="url"
                            value={nuevaImagen.url}
                            onChange={(e) => {
                                setNuevaImagen({ ...nuevaImagen, url: e.target.value });
                                if (e.target.value) {
                                    setTimeout(() => verificarUrl(e.target.value), 500);
                                }
                            }}
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Previsualización de la imagen */}
                    {previsualizacion && (
                        <div className="mt-2">
                            <img
                                src={previsualizacion}
                                alt="Previsualización"
                                className="w-32 h-32 object-cover rounded-md border border-gray-200"
                                onError={() => {
                                    setPrevisualizacion('');
                                    setError('Error al cargar la imagen desde la URL');
                                }}
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Título (opcional)
                            </label>
                            <input
                                type="text"
                                value={nuevaImagen.titulo}
                                onChange={(e) => setNuevaImagen({ ...nuevaImagen, titulo: e.target.value })}
                                placeholder="Título de la imagen"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength="100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo de imagen
                            </label>
                            <select
                                value={nuevaImagen.tipo}
                                onChange={(e) => setNuevaImagen({ ...nuevaImagen, tipo: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="galeria">Galería</option>
                                <option value="principal">Principal</option>
                                <option value="plano">Plano</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción (opcional)
                        </label>
                        <textarea
                            value={nuevaImagen.descripcion}
                            onChange={(e) => setNuevaImagen({ ...nuevaImagen, descripcion: e.target.value })}
                            placeholder="Descripción de la imagen"
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="255"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !previsualizacion}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Agregando...' : 'Agregar Imagen'}
                    </button>
                </div>
            </form>

            {/* Lista de imágenes existentes */}
            <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">
                    Imágenes del Departamento ({imagenes.length})
                </h4>

                {loading && imagenes.length === 0 ? (
                    <div className="text-center py-4">Cargando imágenes...</div>
                ) : imagenes.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">
                        No hay imágenes agregadas aún
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {imagenes.map((imagen) => (
                            <div key={imagen.id} className="border border-gray-200 rounded-lg p-3">
                                <img
                                    src={imagen.url}
                                    alt={imagen.titulo || 'Imagen del departamento'}
                                    className="w-full h-32 object-cover rounded-md mb-2"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxIDlWN0MxIDcgMSA3IDEgN1YxN0MxIDE3IDEgMTcgMSAxN0gyMVY5WiIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGMEYwRjAiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiIGZpbGw9IiM5OTkiLz4KPHBhdGggZD0ibTkgMTcgMy41LTMuNSAyLjUgLTIuNSAzIDMuNSIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+';
                                        e.target.className += ' opacity-50';
                                    }}
                                />

                                <div className="space-y-2">
                                    {imagen.titulo && (
                                        <h5 className="font-medium text-sm text-gray-900">
                                            {imagen.titulo}
                                        </h5>
                                    )}

                                    <div className="flex items-center justify-between text-xs">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            imagen.tipo === 'principal'
                                                ? 'bg-blue-100 text-blue-800'
                                                : imagen.tipo === 'plano'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {imagen.tipo}
                                        </span>
                                        <span className="text-gray-500">#{imagen.orden}</span>
                                    </div>

                                    {imagen.descripcion && (
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {imagen.descripcion}
                                        </p>
                                    )}

                                    <div className="flex gap-1">
                                        {imagen.tipo !== 'principal' && (
                                            <button
                                                onClick={() => cambiarTipoImagen(imagen.id, 'principal')}
                                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                                                disabled={loading}
                                            >
                                                Principal
                                            </button>
                                        )}

                                        <button
                                            onClick={() => eliminarImagen(imagen.id)}
                                            className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                                            disabled={loading}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagenManager;
