import { useState, useEffect, FC } from "react";

import SingleOrderCard from "./Orders/SingleOrderCard";

import sendRequest from "../../../../helper/SendRequest";

import styles from "./UserPurchaseHistory.module.css";

import { Order } from "../../../../src/types/db";

interface IUserPurchaseHistoryProps {
  isGeneral: boolean;
  userId: string;
}

const UserPurchaseHistory: FC<IUserPurchaseHistoryProps> = ({
  isGeneral,
  userId,
}) => {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadingArray = [1, 2, 3];

  useEffect(() => {
    const getUser = async () => {
      setIsLoading((prev) => true);
      const [ordersData, res] = (await sendRequest(
        "/api/auth/get-user-orders",
        "POST",
        { userId }
      )) as [{ orders: Order[] }, Response];

      if (res.ok) {
        setIsLoading((prev) => false);
        for (let i = 0; i < ordersData.orders.length; i++) {
          ordersData.orders[i]["isOpen"] = false;
        }
      }
      if (ordersData.orders) setUserOrders((prev) => [...ordersData.orders]);
    };

    getUser();
  }, [isGeneral, userId]);

  return (
    <div className={styles.body}>
      {isLoading
        ? loadingArray.map((val) => (
            <SingleOrderCard key={val} isLoading={true} />
          ))
        : userOrders.map((order) => (
            <SingleOrderCard key={order.orderId} order={order} />
          ))}
    </div>
  );
};

export default UserPurchaseHistory;
