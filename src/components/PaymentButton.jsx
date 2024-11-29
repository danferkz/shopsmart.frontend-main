import React, { useState, useRef } from "react";

const PaymentButton = ({ amount, purchaseNumber }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [transactionResult, setTransactionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const iframeRef = useRef(null);

  // Obtener el sessionToken
  const getSessionToken = async () => {
    const url = "http://localhost:8080/api/niubiz/generate-session-token";
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      if (response.ok) {
        const data = await response.json();
        setSessionToken(data.sessionToken);
        setShowModal(true);
      } else {
        setErrorMessage("Error al obtener el token de sesión.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error de red. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Iniciar la autorización al cargar el iframe
  const handleIframeLoad = async () => {
    const url = `http://localhost:8080/api/niubiz/generate-authorization-token?purchaseNumber=${purchaseNumber}`;
    try {
      const response = await fetch(url, { method: "POST" });
      if (response.ok) {
        const result = await response.json();
        setTransactionResult({
          status: result.dataMap.STATUS,
          transactionId: result.dataMap.TRANSACTION_ID,
          actionDescription: result.dataMap.ACTION_DESCRIPTION,
        });
        setShowModal(false);
      } else {
        setErrorMessage("Error al autorizar la transacción.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error de red al autorizar la transacción.");
    }
  };

  // Generar el HTML del formulario de pago
  const generateHtml = () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Formulario de Pago</title>
    </head>
    <body>
      <form action="http://localhost:8080/api/niubiz/response-form?id=${purchaseNumber}" method="POST">
        <script
          src="https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true"
          data-sessiontoken="${sessionToken}"
          data-channel="web"
          data-merchantid="456879852"
          data-merchantlogo="http://localhost:8080/images/helado_vainilla.jpg"
          data-formbuttoncolor="#D80000"
          data-purchasenumber="${purchaseNumber}"
          data-amount="${amount.toFixed(2)}"
          data-expirationminutes="20"
          data-timeouturl="http://localhost:8080/api/niubiz/timeout"
          data-showamount="true">
        </script>
      </form>
    </body>
    </html>
  `;

  return (
    <div>
      {/* Botón para iniciar el proceso */}
      <button
        onClick={getSessionToken}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: isLoading ? "not-allowed" : "pointer",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {isLoading ? "Cargando..." : "Iniciar Pago"}
      </button>

      {/* Modal con el formulario de pago */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "600px",
            }}
          >
            <h2>Formulario de Pago</h2>
            {sessionToken ? (
              <iframe
                ref={iframeRef}
                onLoad={handleIframeLoad}
                srcDoc={generateHtml()}
                style={{ width: "100%", height: "400px", border: "none" }}
                title="Formulario de Pago"
              />
            ) : (
              <p>{errorMessage || "Cargando..."}</p>
            )}
          </div>
        </div>
      )}

      {/* Modal con el resultado de la transacción */}
      {transactionResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h2>Resultado de la Transacción</h2>
            <p>
              <strong>Estado:</strong> {transactionResult.status}
            </p>
            <p>
              <strong>ID de Transacción:</strong> {transactionResult.transactionId}
            </p>
            <p>
              <strong>Descripción:</strong> {transactionResult.actionDescription}
            </p>
            <button
              onClick={() => setTransactionResult(null)}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentButton;