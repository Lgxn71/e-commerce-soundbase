import { useState, useEffect } from "react";

import SingleOrderCard from "./Orders/SingleOrderCard";

import sendRequest from "../../../../helper/SendRequest";

import styles from "./UserPurchaseHistory.module.css";

const UserPurchaseHistory = ({ isGeneral, id }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingArray = [1, 2, 3];

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const [ordersData, res] = await sendRequest(
        "/api/auth/get-user-orders",
        "POST",
        { id }
      );

      if (res.ok) {
        setIsLoading(false);
        for (let i = 0; i < ordersData.orders.length; i++) {
          ordersData.orders[i]["isOpen"] = false;
        }
      }
      setUserOrders([...ordersData.orders]);
    };

    getUser();
  }, [isGeneral, id]);

  return (
    <div className={styles.body}>
      {isLoading
        ? loadingArray.map((val) => (
            <SingleOrderCard key={val} loading={true} />
          ))
        : userOrders.map((order) => (
            <SingleOrderCard key={order.orderId} order={order} />
          ))}
    </div>
  );
};

export default UserPurchaseHistory;
