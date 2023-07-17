import { useState, useEffect } from "react";

import SingleOrderCard from "./Orders/SingleOrderCard";

import sendRequest from "../../../../helper/SendRequest";

import styles from "./UserPurchaseHistory.module.css";

const UserPurchaseHistory = ({ isGeneral, id }) => {
  const [userOrders, setUserOrders] = useState([]);
  console.log(userOrders);

  useEffect(() => {
    const getUser = async () => {
      const [ordersData, res] = await sendRequest(
        "/api/auth/get-user-orders",
        "POST",
        {
          id: id,
        }
      );

      for (let i = 0; i < ordersData.orders.length; i++) {
        ordersData.orders[i]["isOpen"] = false;
      }
      setUserOrders([...ordersData.orders]);
    };
    getUser();
  }, [isGeneral, id]);

  return (
    <div className={styles.body}>
      {userOrders.map((order) => (
        <SingleOrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
};

export default UserPurchaseHistory;
