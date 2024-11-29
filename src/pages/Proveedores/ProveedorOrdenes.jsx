import { useState } from "react";

// Datos iniciales
const initialOrdenes = [
    { id: "1", proveedor: "TechSupplies Inc.", producto: "Laptops", cantidad: 50, fechaPedido: "2023-06-01", estado: "Pendiente" },
    { id: "2", proveedor: "Office Essentials", producto: "Sillas de oficina", cantidad: 100, fechaPedido: "2023-05-28", estado: "En Proceso" },
    { id: "3", proveedor: "ElectroGadgets", producto: "Smartphones", cantidad: 200, fechaPedido: "2023-06-05", estado: "Enviado" },
    { id: "4", proveedor: "PrinterPro", producto: "Impresoras", cantidad: 30, fechaPedido: "2023-06-10", estado: "Entregado" },
    { id: "5", proveedor: "NetworkSolutions", producto: "Routers", cantidad: 75, fechaPedido: "2023-06-03", estado: "Pendiente" },
];

export default function ProveedorOrdenes() {
    const [ordenes, setOrdenes] = useState(initialOrdenes);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [currentOrden, setCurrentOrden] = useState(null);

    const handleEditEstado = (id, nuevoEstado) => {
        setOrdenes(
            ordenes.map((orden) =>
                orden.id === id ? { ...orden, estado: nuevoEstado } : orden
            )
        );
        setIsEditDialogOpen(false);
    };

    const estadoColorMap = {
        Pendiente: "bg-yellow-100 text-yellow-800",
        "En Proceso": "bg-blue-100 text-blue-800",
        Enviado: "bg-purple-100 text-purple-800",
        Entregado: "bg-green-100 text-green-800",
        Cancelado: "bg-red-100 text-red-800",
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Órdenes de Proveedores
            </h1>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Proveedor</th>
                            <th className="border px-4 py-2">Producto</th>
                            <th className="border px-4 py-2">Cantidad</th>
                            <th className="border px-4 py-2">Fecha de Pedido</th>
                            <th className="border px-4 py-2">Estado</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((orden) => (
                            <tr key={orden.id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2">{orden.proveedor}</td>
                                <td className="border px-4 py-2">{orden.producto}</td>
                                <td className="border px-4 py-2">{orden.cantidad}</td>
                                <td className="border px-4 py-2">{orden.fechaPedido}</td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${estadoColorMap[orden.estado]}`}
                                    >
                                        {orden.estado}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => {
                                            setCurrentOrden(orden);
                                            setIsEditDialogOpen(true);
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Editar Estado
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditDialogOpen && currentOrden && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-bold mb-4">
                            Editar Estado de la Orden
                        </h2>
                        <div className="mb-4">
                            <p>
                                <strong>Proveedor:</strong> {currentOrden.proveedor}
                            </p>
                            <p>
                                <strong>Producto:</strong> {currentOrden.producto}
                            </p>
                            <p>
                                <strong>Cantidad:</strong> {currentOrden.cantidad}
                            </p>
                            <p>
                                <strong>Fecha de Pedido:</strong> {currentOrden.fechaPedido}
                            </p>
                        </div>
                        <label htmlFor="estado" className="block mb-2 font-medium">
                            Nuevo Estado
                        </label>
                        <select
                            id="estado"
                            className="border rounded px-3 py-2 w-full mb-4"
                            value={currentOrden.estado}
                            onChange={(e) =>
                                handleEditEstado(currentOrden.id, e.target.value)
                            }
                        >
                            <option value="Pendiente">Pendiente</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregado">Entregado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsEditDialogOpen(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleEditEstado(currentOrden.id, currentOrden.estado)}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

