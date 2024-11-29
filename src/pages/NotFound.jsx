function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500">
        404 - Página no encontrada
      </h1>
      <p className="mt-4 text-gray-700">
        Lo sentimos, la página que buscas no existe.
      </p>
    </div>
  );
}

export default NotFound;
