import React, { useEffect, useState } from "react";
import {
  getHistoryFromDatabase,
  getOrdersFromDatabase,
} from "../services/Auth";
import OrderCard from "../components/OrderCard";

const Homepage = ({ isLoggedIn = () => {} }) => {
  const [Orders, setOrders] = useState([]);
  const [History, setHistory] = useState([]);
  const [Refresh, setRefresh] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getOrders();
  }, [Refresh]);

  const getOrders = async () => {
    setOrders(await getOrdersFromDatabase());
    setHistory(await getHistoryFromDatabase());
  };

  return (
    <main className="Homepage w-full h-[100svh] px-8 max-md:px-2 py-4 ">
      <h1 className="text-center text-xl font-bold mb-2">
        Food for You:{" "}
        <span className="text-error">{localStorage.getItem("cafeName")}</span>
        <span
          className="ml-6 text-primary-content text-xs cursor-pointer"
          onClick={() => {
            isLoggedIn(false);
            localStorage.removeItem("username");
            localStorage.removeItem("cafeName");
          }}
        >
          Logout
        </span>
      </h1>
      <div className="w-full flex flex-col justify-center items-center h-[95%] gap-2">
        <div className="order-queue w-full flex-1 rounded-md px-4 py-2">
          <h1 className="font-semibold text-secondary-content">Order Queue</h1>
          <div className="orders w-full h-full flex gap-4 py-1 overflow-x-auto items-center">
            {Orders &&
              Orders.map((order) => {
                return (
                  <OrderCard
                    key={order.orderId}
                    orderDetails={order.data}
                    items={order.data.items}
                    orderId={order.orderId}
                    getOrders={setRefresh}
                  />
                );
              })}
          </div>
        </div>
        <div className="prev-order w-full flex-1 rounded-md px-4 py-8">
          <h1 className="font-semibold text-secondary-content">
            Order History
          </h1>
          <div className="orders w-full h-[99%] flex gap-4 items-center overflow-x-auto">
            {History &&
              History.map((order) => {
                return (
                  <OrderCard
                    key={order.orderId}
                    orderDetails={order.data}
                    items={order.data.items}
                    orderId={order.orderId}
                    getOrders={setRefresh}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
