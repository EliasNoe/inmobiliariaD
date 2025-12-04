import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/common/InputError';
import InputLabel from '@/Components/common/InputLabel';
import TextInput from '@/Components/common/TextInput';
import SelectInput from '@/Components/common/SelectInput';
import TextareaInput from '@/Components/common/TextareaInput';

export default function CrearAsesor({ auth }) {
    // Opciones para los selectores
    const tiposDocumento = ['DNI', 'Pasaporte', 'Cédula', 'RUC'];
    const especialidades = ['Ventas', 'Alquileres', 'Propiedades de lujo', 'Comercial', 'Residencial'];
    const estadosAsesor = ['activo', 'inactivo', 'vacaciones'];

    // Estados para controlar componentes específicos
    const [fotoPreview, setFotoPreview] = useState(null);

    // Formulario con Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        tipo_documento: 'DNI',
        documento: '',
        email: '',
        telefono: '',
        direccion: '',
        especialidad: '',
        codigo: '',
        comision: '',
        estado: 'activo',
        notas: '',
        foto: null,
    });

    // Manejo de cambios en el formulario
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            // Manejo de archivos (foto)
            if (files[0]) {
                setData(name, files[0]);

                // Crear una vista previa de la imagen
                const reader = new FileReader();
                reader.onload = (e) => {
                    setFotoPreview(e.target.result);
                };
                reader.readAsDataURL(files[0]);
            }
        } else {
            // Manejo de otros campos
            setData(name, value);
        }
    };

    // Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/v1/admin/asesores', {
            onSuccess: () => {
                // Redireccionar a la lista de asesores
                window.location.href = '/admin/asesores';
            }
        });
    };

    // Eliminar la foto seleccionada
    const eliminarFoto = () => {
        setData('foto', null);
        setFotoPreview(null);
    };

    return (
        <AdminLayout auth={auth} title="Crear Asesor">
            <Head title="Crear Asesor - Inmobiliaria Imperial Cusco" />

            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Encabezado con botón de volver */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Crear Nuevo Asesor
                        </h2>
                        <Link
                            href="/admin/asesores"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Asesores
                        </Link>
                    </div>

                    {/* Formulario de creación */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Sección: Información Personal */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                                        Información Personal
                                    </h3>
                                </div>

                                {/* Nombre */}
                                <div>
                                    <InputLabel htmlFor="nombre" value="Nombre" required />
                                    <TextInput
                                        id="nombre"
                                        name="nombre"
                                        value={data.nombre}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>

                                {/* Apellido */}
                                <div>
                                    <InputLabel htmlFor="apellido" value="Apellido" required />
                                    <TextInput
                                        id="apellido"
                                        name="apellido"
                                        value={data.apellido}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.apellido} className="mt-2" />
                                </div>

                                {/* Tipo de Documento */}
                                <div>
                                    <InputLabel htmlFor="tipo_documento" value="Tipo de Documento" required />
                                    <SelectInput
                                        id="tipo_documento"
                                        name="tipo_documento"
                                        value={data.tipo_documento}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        {tiposDocumento.map((tipo) => (
                                            <option key={tipo} value={tipo}>
                                                {tipo}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.tipo_documento} className="mt-2" />
                                </div>

                                {/* Número de Documento */}
                                <div>
                                    <InputLabel htmlFor="documento" value="Número de Documento" required />
                                    <TextInput
                                        id="documento"
                                        name="documento"
                                        value={data.documento}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.documento} className="mt-2" />
                                </div>

                                {/* Email */}
                                <div>
                                    <InputLabel htmlFor="email" value="Email" required />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <InputLabel htmlFor="telefono" value="Teléfono" required />
                                    <TextInput
                                        id="telefono"
                                        name="telefono"
                                        value={data.telefono}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    />
                                    <InputError message={errors.telefono} className="mt-2" />
                                </div>

                                {/* Dirección */}
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="direccion" value="Dirección" />
                                    <TextInput
                                        id="direccion"
                                        name="direccion"
                                        value={data.direccion}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.direccion} className="mt-2" />
                                </div>

                                {/* Sección: Información Profesional */}
                                <div className="md:col-span-2 mt-6">
                                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2 mb-4">
                                        Información Profesional
                                    </h3>
                                </div>

                                {/* Código de Asesor */}
                                <div>
                                    <InputLabel htmlFor="codigo" value="Código de Asesor" />
                                    <TextInput
                                        id="codigo"
                                        name="codigo"
                                        value={data.codigo}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.codigo} className="mt-2" />
                                </div>

                                {/* Especialidad */}
                                <div>
                                    <InputLabel htmlFor="especialidad" value="Especialidad" />
                                    <SelectInput
                                        id="especialidad"
                                        name="especialidad"
                                        value={data.especialidad}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                    >
                                        <option value="">Seleccionar especialidad</option>
                                        {especialidades.map((especialidad) => (
                                            <option key={especialidad} value={especialidad}>
                                                {especialidad}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.especialidad} className="mt-2" />
                                </div>

                                {/* Comisión (%) */}
                                <div>
                                    <InputLabel htmlFor="comision" value="Comisión (%)" />
                                    <TextInput
                                        id="comision"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        name="comision"
                                        value={data.comision}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.comision} className="mt-2" />
                                </div>

                                {/* Estado */}
                                <div>
                                    <InputLabel htmlFor="estado" value="Estado" required />
                                    <SelectInput
                                        id="estado"
                                        name="estado"
                                        value={data.estado}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        required
                                    >
                                        {estadosAsesor.map((estado) => (
                                            <option key={estado} value={estado}>
                                                {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.estado} className="mt-2" />
                                </div>

                                {/* Notas */}
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="notas" value="Notas" />
                                    <TextareaInput
                                        id="notas"
                                        name="notas"
                                        value={data.notas}
                                        onChange={handleChange}
                                        className="mt-1 block w-full"
                                        rows={3}
                                    />
                                    <InputError message={errors.notas} className="mt-2" />
                                </div>

                                {/* Foto */}
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="foto" value="Foto" />
                                    <div className="mt-1 flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-24 w-24 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                                                {fotoPreview ? (
                                                    <img
                                                        src={fotoPreview}
                                                        alt="Vista previa"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <svg className="h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="foto"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                                >
                                                    <span>Subir una foto</span>
                                                    <input
                                                        id="foto"
                                                        name="foto"
                                                        type="file"
                                                        className="sr-only"
                                                        accept="image/*"
                                                        onChange={handleChange}
                                                    />
                                                </label>
                                                <p className="pl-1">o arrastrar y soltar</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
                                                PNG, JPG, GIF hasta 2MB
                                            </p>
                                            {fotoPreview && (
                                                <button
                                                    type="button"
                                                    onClick={eliminarFoto}
                                                    className="mt-2 text-sm text-red-600 hover:text-red-500"
                                                >
                                                    Eliminar foto
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <InputError message={errors.foto} className="mt-2" />
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex items-center justify-end mt-8 space-x-3">
                                <Link
                                    href="/admin/asesores"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                        processing ? 'opacity-75 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Guardando...
                                        </>
                                    ) : (
                                        'Guardar Asesor'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
