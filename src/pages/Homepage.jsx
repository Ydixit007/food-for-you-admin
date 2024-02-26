import React, { useEffect, useState } from "react";
import { getOrdersFromDatabase } from "../services/Auth";
import OrderCard from "../components/OrderCard";

const Homepage = ({ isLoggedIn }) => {
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setOrders(await getOrdersFromDatabase());
  };

  return (
    <main className="Homepage w-full h-screen px-8 py-4 ">
      <h1 className="text-center text-xl font-bold mb-2">
        Food for You:{" "}
        <span className="text-error">{localStorage.getItem("cafeName")}</span>
        <span className="ml-6 text-primary-content text-xs cursor-pointer" onClick={()=>{isLoggedIn(false)}}>Logout</span>
      </h1>
      <div className="w-full flex flex-col justify-center items-center h-[95%] gap-2">
        <div className="order-queue w-full flex-1 rounded-md px-4 py-2">
          <h1 className="font-semibold text-secondary-content">Order Queue</h1>
          <div className="orders w-full h-full flex gap-4 py-8 overflow-x-auto">
            {Orders &&
              Orders.map((order, index) => {
                return (
                  <OrderCard key={index} orderDetails={order} items={order.items} />
                );
              })}
          </div>
        </div>
        <div className="prev-order w-full flex-1 rounded-md px-4 py-2">
          <h1 className="font-semibold text-secondary-content">
            Order History
          </h1>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
