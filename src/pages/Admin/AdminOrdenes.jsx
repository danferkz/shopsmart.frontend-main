import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="mt-4 flex justify-between">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
            &lt; Anterior
        </button>
        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
        >
            Siguiente &gt;
        </button>
    </div>
);

const OrdersTable = ({ orders, onViewDetails }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 w-[100px]">ID</th>
                    <th scope="col" className="px-6 py-3">Cliente</th>
                    <th scope="col" className="px-6 py-3">Producto</th>
                    <th scope="col" className="px-6 py-3 text-right">Total</th>
                    <th scope="col" className="px-6 py-3">Estado</th>
                    <th scope="col" className="px-6 py-3"></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                        <td className="px-6 py-4">{order.cliente}</td>
                        <td className="px-6 py-4">{order.producto}</td>
                        <td className="px-6 py-4 text-right">{order.total}</td>
                        <td className="px-6 py-4">{order.estado}</td>
                        <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => onViewDetails(`Detalles de Orden ${order.id}`, order)}
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
);

const AdminOrdenes = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalInfo, setModalInfo] = useState({ isOpen: false, title: '', content: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:8080/api/v1/final-orders/get-all');
                const fetchedOrders = response.data.data.map(order => ({
                    id: order.orderId,
                    cliente: `Usuario ${order.userId}`,
                    producto: 'Producto Placeholder',
                    total: `$${order.orderTotalAmount.toFixed(2)}`,
                    estado: order.orderStatus,
                }));
                setOrders(fetchedOrders);
            } catch (err) {
                setError('Error al cargar las órdenes.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const totalPages = Math.ceil(orders.length / 2);
    const currentOrders = orders.slice((currentPage - 1) * 2, currentPage * 2);

    const handleModalOpen = (title, order) => {
        setModalInfo({
            isOpen: true,
            title,
            content: (
                <>
                    <p><strong>Cliente:</strong> {order.cliente}</p>
                    <p><strong>Producto:</strong> {order.producto}</p>
                    <p><strong>Total:</strong> {order.total}</p>
                    <p><strong>Estado:</strong> {order.estado}</p>
                </>
            ),
        });
    };

    const handleModalClose = () => setModalInfo({ ...modalInfo, isOpen: false });

    if (loading) return <div className="flex items-center justify-center min-h-screen">Cargando órdenes...</div>;
    if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Órdenes</h1>
                </div>
                <OrdersTable orders={currentOrders} onViewDetails={handleModalOpen} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
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