import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const restaurantAuth = async (username = "", password = "") => {
  const q = query(
    collection(db, "restaurantAdmin"),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(q);
  const user = [];
  querySnapshot.forEach((doc) => {
    user.push(doc.data());
  });
  if (password === user[0].password) {
    localStorage.setItem("username", username);
    localStorage.setItem("cafeName", user[0].cafe_name);
    return user;
  }
  return undefined;
};

export const isLoggedIn = () => {
  const user = localStorage.getItem("username");
  console.log(user);
  if (user !== null) {
    return true;
  }
  return false;
};
