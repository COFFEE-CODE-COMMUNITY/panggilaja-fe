import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBuyerOrders } from "../../features/orderSlice";

const TestingPage = () => {
  const dispatch = useDispatch();

  const { buyerOrders, status, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getBuyerOrders());
  }, [dispatch]);

  console.log("INI ORDERANNYA", buyerOrders);

  if (status === "loading") return <p>Loading order...</p>;
  if (error) return <p>Error: {error}</p>;

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
