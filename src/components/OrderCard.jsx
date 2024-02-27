import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { updateIsComplete, updateOrderStatus } from "../services/Auth";

const OrderCard = ({
  orderDetails,
  items = [],
  orderId,
  getOrders = () => {},
}) => {
  const time = new Date(orderDetails.order_time.seconds * 1000);
  const arrivalTime = new Date(orderDetails.delivery_time.seconds * 1000);
  const [UserName, setUserName] = useState("");
  const [OrderStatus, setOrderStatus] = useState(orderDetails.order_update);
  const [OrderCompleted, setOrderCompleted] = useState(orderDetails.isComplete);

  const getCustomerName = async () => {
    const docRef = doc(db, "users", orderDetails.user_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setUserName(data.userName);
    }
  };

  const updateOrderCompleted = async (orderId, status) => {
    const complete = await updateIsComplete(orderId, status);
    getOrders();
  };

  const updateOrder = async (orderId, status) => {
    const complete = await updateOrderStatus(orderId, status);
    setOrderStatus(status)
    getOrders();
  };

  useEffect(() => {
    getCustomerName();
  }, []);

  return (
    <div className="card w-96 bg-base-300 shadow-sm flex flex-col px-4 py-2 min-w-[372px] max-h-[228px]">
      <h3 className="font-semibold">Customer: {UserName}</h3>
      <h5 className="text-sm">Order Items: </h5>
      <ul className="items h-24 list-decimal overflow-y-auto text-sm">
        {items.map((item, index) => {
          return (
            <li key={index} className="ml-8">
              {item.item_name}
            </li>
          );
        })}
      </ul>
      <div className="details flex gap-3 justify-between text-sm mt-1 border-t-[1px] pt-1 border-gray-800">
        <p>
          Placed:{" "}
          {`${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`}
        </p>
        <p>Slot: {`${arrivalTime.getHours()}:${arrivalTime.getMinutes()}`}</p>
        <p>Status: {OrderStatus}</p>
      </div>
      <div className="actions flex gap-2 mt-2 items-center">
        {!OrderCompleted && (
          <select
            onChange={(e) => {
              updateOrder(orderId, e.target.value);
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected>
              Change Status
            </option>
            <option>Confirmed</option>
            <option>Preparing</option>
            <option>Ready</option>
          </select>
        )}
        <div className="form-control w-full max-w-xs">
          <label className="label cursor-pointer">
            <span className="label-text">Order Completed</span>
            <input
              checked={OrderCompleted}
              onChange={() => {
                updateOrderCompleted(orderId, !OrderCompleted);
              }}
              type="checkbox"
              className="checkbox"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
