import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    console.log("DATA:", data);
console.log("ERROR:", error);

if (!error) {
  setOrders(data);
}
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>JMSPrint Ordreoversikt</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>{order.order_number}</h3>

          <p>Kunde: {order.customer_name}</p>
          <p>E-post: {order.customer_email}</p>
          <p>Telefon: {order.customer_phone}</p>
          <p>Total: {order.total_price} kr</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
