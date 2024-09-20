import React, { useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router"; // Import useRouter from Next.js
import Link from "next/link";

const TabContent = ({ activeTab, orders }) => {
  const completedOrders = orders.filter(
    (order) => order.deliveryStatus === "Completed"
  );
  const cancelledOrders = orders.filter(
    (order) => order.deliveryStatus === "Cancelled"
  );

  const [showCallPopup, setShowCallPopup] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const renderOrders = (orderList) => {
    return orderList.length === 0 ? (
      <div>No orders found.</div>
    ) : (
      orderList.map((order) => (
        <div key={order.id} className="bg-white shadow-md rounded-lg mb-4">
          <div className="p-4">
            <div className="flex justify-between items-end mb-4">
              <p className="text-lg font-semibold text-pink-600">Receipt</p>
              <p className="md:text-lg text-xs font-semibold text-black">
                Order Id: <span className="text-gray-400">{order.id}</span> 
              </p>
            </div>
            {order.items.map((item, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg mb-4">
                <div className="p-4">
                  <div className="grid p-1  grid-cols-1 sm:grid-cols-5 lg:grid-cols-5 h-auto border gap-2 md:gap-4 items-center">
                    <div className="col-span-1 flex items-center justify-center">
                      <Link
                        href={`/collections-product/${item.id}`}
                        passHref
                      >
                        <Image
                          width={120}
                          height={90}
                          src={
                            item.colors && item.colors.length > 0
                              ? item.colors[0].images[0]
                              : "/path/to/default-image.jpg"
                          }
                          alt={item.name}
                          className="rounded-3xl hidden lg:block"
                        />
                        <Image
                          width={80}
                          height={90}
                          src={
                            item.colors && item.colors.length > 0
                              ? item.colors[0].images[0]
                              : "/path/to/default-image.jpg"
                          }
                          alt={item.name}
                          className="rounded-3xl lg:hidden"
                        />
                      </Link>
                    </div>
                    <div className="col-span-1 flex flex-col justify-end text-start">
                      <p className="text-black">Product:</p>
                      <p>{item.name}</p>
                    </div>
                    <div className="col-span-1 md:text-center">
                      <p className="text-black">Color: {item.color}</p>
                    </div>
                    <div className="col-span-1 md:text-center">
                      <p className="text-black">Qty: {item.quantity}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                      <p className="text-black">Price:</p>
                      <span>
                        <MdOutlineCurrencyRupee />
                      </span>
                      <span>{item.price}</span>
                    </div>
                  </div>
                  <hr className="my-4 border-gray-300" />
                  <div className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="w-full sm:w-1/5 text-black font-bold text-center sm:text-left">
                      Track Order
                    </div>
                    <div className="w-full sm:w-4/5">
                      <div className="relative pt-1">
                        <div className="flex mb-1 items-center justify-between">
                          <span className="text-xs text-black">
                            Order Placed
                          </span>
                          <span className="text-xs text-black">
                            {order.deliveryStatus === "Completed"
                              ? "Delivered"
                              : order.deliveryStatus === "Cancelled"
                              ? "Cancelled"
                              : "In Progress"}
                          </span>
                        </div>
                        <div className="flex h-2 overflow-hidden rounded bg-gray-200">
                          <div
                            className={`rounded ${
                              order.deliveryStatus === "Cancelled"
                                ? "bg-red-600"
                                : order.deliveryStatus === "Completed"
                                ? "bg-green-600"
                                : "bg-pink-600"
                            }`}
                            style={{
                              width:
                                order.deliveryStatus === "Completed"
                                  ? "100%"
                                  : order.deliveryStatus === "Cancelled"
                                  ? "100%"
                                  : "50%",
                            }} // Adjust width based on status
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <p className="text-md font-semibold text-black">
                      Delivery Status: {order.deliveryStatus}
                    </p>
                    {order.deliveryStatus !== "Cancelled" && (
                      <button
                        className="text-red-500 font-semibold"
                        onClick={() => {
                          setSelectedOrderId(order.id);
                          setShowCallPopup(true);
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="bg-pink-600 text-white rounded-b-lg px-4 py-5">
                  <h5 className="flex items-center justify-end text-white text-uppercase mb-0">
                    Total paid:{" "}
                    <span className="text-2xl flex items-center ml-2">
                      <MdOutlineCurrencyRupee /> {order.totalPrice}
                    </span>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
    );
  };

  const handleCloseCallPopup = () => {
    setShowCallPopup(false);
    setSelectedOrderId(null);
  };

  return (
    <div className="p-4">
      {activeTab === "All Orders" && renderOrders(orders)}
      {activeTab === "Completed" && renderOrders(completedOrders)}
      {activeTab === "Cancelled" && renderOrders(cancelledOrders)}

      {showCallPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-xs sm:max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold">Cancel Order</h2>
            <p className="text-sm sm:text-base">
              You cannot cancel the order{" "}
              <strong>(ID: {selectedOrderId}) </strong>as more than 24 hours
              have passed since the order was placed. <br />
              If you still wish to cancel, please contact our support team at{" "}
              <strong>+919800476217</strong>.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-[#5b5c70] font-bold hover:underline hover:bg-primary text-white p-3 px-7 hover:scale-95 transition-all duration-700 ease-in-out rounded-md"
                onClick={handleCloseCallPopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContent;
