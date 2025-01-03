import React, { useState, useEffect } from "react";
import Moment from "moment-timezone";
import { getAllOrders , deleteOrderById } from "../../services/orders";
import { getUserById } from "../../services/users";
import { getPaymentById , deletePayment} from "../../services/payments";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [totalOrders, setTotalOrders] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [paymentId, sePaymentId] = useState({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await getAllOrders();
      setOrders(ordersData);

      
      const totalMap = ordersData.reduce((acc, order) => {
        const totalPrice = order.items.reduce(
          (sum, item) => sum + parseFloat(item.menu_price),
          0
        );
        acc[order.id] = totalPrice;
        return acc;
      }, {});

      
      const userIds = [...new Set(ordersData.map((order) => order.user_id))];
      const userNameMap = {};

      
      const userPromises = userIds.map(async (id) => {
        const user = await getUserById(id);
        userNameMap[id] = user.username;
      });
      const metodPay = {};
      const payId = {};
      
      const paymentPromises = ordersData.map(async (order) => {
        console.log(order.id);
        const payment = await getPaymentById(order.id); 
        metodPay[order.id] = payment.payment_method;
        payId[order.id] = payment.id;
      });


      
      await Promise.all(userPromises,paymentPromises);

      setUserNames(userNameMap);
      setTotalOrders(totalMap);
      setPaymentMethods(metodPay);
      sePaymentId(payId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrder =(paymentId , orderId) => {
    if(paymentId!=null){
      deletePayment(paymentId);
      if(orderId != null){
        deleteOrderById(orderId);
      }
    }else if(orderId != null){
      deleteOrderById(orderId);
    }
    fetchOrders();
  };

  const formatDateTime = (dateString) => {
    return Moment(dateString).format("YYYY-MM-DD hh:mm A");
  };

  const formatMoney = (price) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const renderStatusBadge = (status) => {
    let colorClass = "";
    switch (status) {
      case "pending":
        colorClass = "bg-yellow-100 text-yellow-700";
        break;
      case "served":
        colorClass = "bg-green-100 text-green-700";
        break;
      case "paid":
        colorClass = "bg-blue-100 text-blue-700";
        break;
      default:
        colorClass = "bg-gray-100 text-gray-700";
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Table Number</th>
            <th>Item Count</th>
            <th>Menu</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Created At</th>
            <th>(Rp) Total</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{userNames[order.user_id] || "-"}</td>
              <td>{order.table_number}</td>
              <td>{order.items.map((item) => (
                <div key={item.id}>{item.quantity}</div>
              ))}</td>
              <td>
                {order.items.map((item) => (
                  <div key={item.id}>{item.menu_name}</div>
                ))}
              </td>
              <td>{paymentMethods[order.id] || "-"}</td>
              <td>{renderStatusBadge(order.status)}</td>
              <td>{formatDateTime(order.created_at)}</td>
              <td>{formatMoney(totalOrders[order.id] || 0)}</td>
              <td>
                <div className="flex space-x-2">
                    {/* <button onClick={() => handleEditOrder(order.id)} className="text-blue-500 hover:underline">Edit</button> */}
                    <button onClick={() => handleDeleteOrder( paymentId[order.id],order.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
                </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
