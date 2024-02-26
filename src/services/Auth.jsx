import { collection, query, where, getDocs, startAt } from "firebase/firestore";
import { db } from "./firebase";

export const restaurantAuth = async (username = "", password = "") => {
  const q = query(
    collection(db, "restaurantAdmin"),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const user = [];
    querySnapshot.forEach((doc) => {
      user.push(doc.data());
    });
    if (password === user[0].password) {
      localStorage.setItem("username", username);
      localStorage.setItem("cafeName", user[0].cafe_name);
      return user;
    }
  }
  return undefined;
};

export const isLoggedIn = () => {
  const user = localStorage.getItem("username");
  if (user !== null) {
    return true;
  }
  return false;
};

export const getOrdersFromDatabase = async () => {
  const date = Date.now();
  const q = query(
    collection(db, "orders"),
    where("cafe_name", "==", localStorage.getItem("cafeName"), startAt(date))
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const orders = [];
    querySnapshot.forEach((order) => {
      orders.push(order.data());
    });
    return orders;
  }
  return [];
};
