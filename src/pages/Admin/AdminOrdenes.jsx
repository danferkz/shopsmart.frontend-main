import React, { useState } from 'react';

// Modal Component
const Modal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-10">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div>{content}</div>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

const AdminOrdenes = () => {
    const orders = [
        { id: '001', cliente: 'Juan Pérez', producto: 'Laptop', total: '$999.99', estado: 'Enviado' },
        { id: '002', cliente: 'María García', producto: 'Smartphone', total: '$599.99', estado: 'Pendiente' },
        { id: '003', cliente: 'Carlos Rodríguez', producto: 'Tablet', total: '$399.99', estado: 'Entregado' },
        // Add more orders as needed
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Number of items to display per page
    const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', content: null });

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // Get current orders to display
    const indexOfLastOrder = currentPage * itemsPerPage;
    const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleModalOpen = (title, order) => {
        const content = (
            <>
                <p><strong>Cliente:</strong> {order.cliente}</p>
                <p><strong>Producto:</strong> {order.producto}</p>
                <p><strong>Total:</strong> {order.total}</p>
                <p><strong>Estado:</strong> {order.estado}</p>
            </>
        );
        setModalInfo({ isOpen: true, title, content });
    };

    const handleModalClose = () => {
        setModalInfo({ ...modalInfo, isOpen: false });
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Ordenes</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-[100px]">ID</th>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Producto</th>
                                <th scope="col" className="px-6 py-3 text-right">Total</th>
                                <th scope="col" className="px-6 py-3">Estado</th>
                                <th scope="col" className="px-6 py-3"></th> {/* Empty header for modal button */}
                            </tr>
                        </thead>
                        <tbody>
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                                    <td className="px-6 py-4">{order.cliente}</td>
                                    <td className="px-6 py-4">{order.producto}</td>
                                    <td className="px-6 py-4 text-right">{order.total}</td>
                                    <td className="px-6 py-4">{order.estado}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleModalOpen(`Detalles de Orden ${order.id}`, order)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        &lt; Anterior
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        Siguiente &gt;
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalInfo.isOpen}
                onClose={handleModalClose}
                title={modalInfo.title}
                content={modalInfo.content}
            />
        </main>
    );
};

export default AdminOrdenes;