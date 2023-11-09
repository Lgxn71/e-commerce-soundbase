import { useState, useEffect } from "react";

import SingleOrderCard from "./Orders/SingleOrderCard";

import sendRequest from "../../../../helper/SendRequest";

import styles from "./UserPurchaseHistory.module.css";

import { Order } from "../../../../types/db";

const UserPurchaseHistory = ({
  isGeneral,
  userId,
}: {
  isGeneral: boolean;
  userId: string;
}) => {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingArray = [1, 2, 3];

  useEffect(() => {
    const getUserOrders = async () => {
      const [ordersData, res] = (await sendRequest(
        "/api/auth/get-user-orders",
        "POST",
        { userId }
      )) as [{ orders: Order[] }, Response];

      if (res.ok)
        for (let i = 0; i < ordersData.orders.length; i++) {
          ordersData.orders[i]["isOpen"] = false;
        }

      if (ordersData.orders) setUserOrders((prev) => [...ordersData.orders]);
    };

    try {
      setIsLoading((prev) => true);

      if (userOrders.length === 0) getUserOrders();
    } finally {
      const timeoutId = setTimeout(() => {
        setIsLoading((prev) => false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [isGeneral, userOrders.length, userId]);

  if (isLoading)
    return (
      <div className={styles.body}>
        {isLoading &&
          loadingArray.map((val) => (
            <SingleOrderCard key={val} isLoading={true} />
          ))}
      </div>
    );

  return (
    <div className={styles.body}>
      {userOrders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>
            Your Order History is Empty for now. Start shopping to fill it up!
          </p>
        </div>
      ) : (
        userOrders.map((order) => (
          <SingleOrderCard key={order.orderId} order={order} />
        ))
      )}
    </div>
  );
};

export default UserPurchaseHistory;
