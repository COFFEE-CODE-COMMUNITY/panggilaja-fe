import React, { useEffect } from "react";
import { useGetBuyerOrders } from "../../hooks/useOrders";

const TestingPage = () => {
  const { data: ordersResponse, status, error } = useGetBuyerOrders();
  const buyerOrders = ordersResponse?.data || ordersResponse || [];

  if (status === "pending") return <p>Loading order...</p>;
  if (status === "error") return <p>Error: {error?.message || "Something went wrong"}</p>;

  return (
    <main>
      <h1>Buyer Orders</h1>

      {buyerOrders.length === 0 ? (
        <p>Tidak ada order</p>
      ) : (
        <ul>
          {buyerOrders.map((order) => (
            <li key={order.id}>
              <strong>Produk:</strong> {order.pesan_tambahan} <br />
              <strong>Harga:</strong> {order.status}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default TestingPage;
