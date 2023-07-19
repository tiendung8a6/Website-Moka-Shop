import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrdersAction, deleteOrderAction } from "../../../redux/slices/orders/ordersSlices";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import OrdersStats from "./OrdersStatistics";
import Swal from 'sweetalert2';

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function OrdersList() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);
  //get data from store
  const {
    error,
    loading,
    orders: { orders },
  } = useSelector((state) => state?.orders);

  //deleteHandler
  const deleteOrderHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to restore this order!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call dispatch to delete the order
        dispatch(deleteOrderAction(id)).then(() => {
          Swal.fire(
            'Deleted!',
            'Your order has been deleted.',
            'success'
          ).then(() => {
            // Reload the page after successful deletion
            window.location.reload();
          });
        });
      }
    });
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center"></div>
        {/* order stats */}
        <OrdersStats />

        <h2 className="text-xl font-medium leading-6 text-gray-900 mt-3">
          Recent Orders
        </h2>
        <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  STT
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Order Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Delivery Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Delete
                </th>
              </tr>
            </thead>
            {loading ? (
              <LoadingComponent />
            ) : currentItems?.length <= 0 ? (
              <NoDataFound />
            ) : (
              <tbody className="divide-y divide-gray-200 bg-white ">
                {currentItems?.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-[60px]">
                      {startIndex + index}
                    </td>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                      {order.orderNumber}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {order.paymentStatus === "Not paid" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-600 text-gray-300">
                          {order.paymentStatus}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-600 text-white">
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      Unknown
                    </td>
                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {order.status === "pending" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-100">
                          {order.status}
                        </span>
                      ) : order.status === "delivered" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
                          {order.status}
                        </span>
                      ) : order.status === "processing" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-400 text-gray-800">
                          {order.status}
                        </span>
                      ) : order.status === "shipped" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500 text-white">
                          {order.status}
                        </span>
                      ) : order.status === "Returned" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white">
                          {order.status}
                        </span>
                      ) : null}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order?.totalPrice)}
                    </td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {order?.paymentStatus === "Not paid" ? (
                        <Link
                          to={`/admin/orders/${order?._id}`}
                          className="text-black-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer text-indigo-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <Link
                          to={`/admin/orders/${order?._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer text-indigo-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </Link>
                      )}
                    </td>
                    {/* delete */}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <button onClick={() => deleteOrderHandler(order?._id)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer text-indigo-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-gray-600 font-medium text-[16px]">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, orders?.length)} of {orders?.length} orders
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white ${currentPage === pageNumber ? "bg-blue-600 text-[#fff] hover:bg-blue-500" : "text-gray-700 hover:bg-blue-500 "
                  }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
