import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setErrorText(error.message);
      setOrders([]);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>JMSPrint Ordreoversikt</h1>

      {loading && <p>Laster ordre...</p>}

      {errorText && <p>Feil: {errorText}</p>}

      {!loading && !errorText && orders.length === 0 && (
        <p>Ingen ordre funnet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #444",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
            background: "#111827",
          }}
        >
          <h3>{order.order_number}</h3>
          <p><strong>Kunde:</strong> {order.customer_name}</p>
          <p><strong>E-post:</strong> {order.customer_email}</p>
          <p><strong>Telefon:</strong> {order.customer_phone}</p>
          <p><strong>Total:</strong> {order.total_price} kr</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ))}
    </div>
  );
}
