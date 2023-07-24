// import { useEffect } from "react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { fetchOrdersAction } from "../../../redux/slices/orders/ordersSlices";
import { fetchUsersAction, toggleLockCustomersAction } from "../../../redux/slices/users/usersSlice";


import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import Swal from 'sweetalert2';



export default function Customers() {
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  // get data from store
  const { error, loading, users } = useSelector((state) => state?.users);
  const customers = users?.users;


  // Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageOptions = [5, 10, 15, 20];
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredCustomers = customers?.filter(customer =>
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCustomers?.length / selectedItemsPerPage);
  const startIndex = (currentPage - 1) * selectedItemsPerPage;
  const endIndex = Math.min(startIndex + selectedItemsPerPage, filteredCustomers?.length);
  const currentItems = filteredCustomers?.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  //---delete handler---
  const toggleLockCustomersHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to restore this color!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(toggleLockCustomersAction(id)).then(() => {
          Swal.fire(
            'Deleted!',
            'Your color has been deleted.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        });
      }
    });
  };


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">
          All Customers
        </h1>
        <div className="flex items-center mt-2 text-sm text-gray-700">
          <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path d="M983.902 1023.894H40.098a7.994 7.994 0 0 1-7.998-8v-95.98c0-68.64 35.562-94.948 101.174-119.474 11.654-4.342 26.706-8.858 42.64-13.636 67.572-20.262 160.124-48.022 160.124-106.838 0-4.422 3.578-7.998 7.998-7.998s7.998 3.576 7.998 7.998c0 70.718-99.134 100.45-171.528 122.162-15.676 4.702-30.478 9.138-41.63 13.31-61.504 22.978-90.778 44.49-90.778 104.476v87.982h927.808v-87.982c0-59.986-29.276-81.498-90.792-104.476-11.138-4.172-25.95-8.61-41.618-13.31-72.39-21.712-171.528-51.444-171.528-122.162a7.994 7.994 0 0 1 7.998-7.998 7.992 7.992 0 0 1 7.998 7.998c0 58.816 92.544 86.576 160.124 106.838 15.934 4.78 30.992 9.294 42.63 13.636 65.626 24.528 101.182 50.834 101.182 119.474v95.98c0 4.422-3.578 8-7.998 8z" fill="" />
              <path d="M512 719.958c-109.562 0-268.006-158.608-286.152-327.058a7.99 7.99 0 0 1 7.092-8.81c4.552-0.39 8.342 2.71 8.81 7.092 8.154 75.656 46.888 155.576 106.274 219.252 53.786 57.69 116.616 93.528 163.974 93.528 51.928 0 121.724-42.836 177.854-109.134a8.044 8.044 0 0 1 11.28-0.938 8.014 8.014 0 0 1 0.938 11.28c-59.034 69.732-133.644 114.788-190.07 114.788zM741.14 543.992a7.992 7.992 0 0 1-6.92-12.012c32.54-56.058 49.722-115.516 49.722-171.95a7.994 7.994 0 0 1 8-7.998 7.992 7.992 0 0 1 7.996 7.998c0 59.254-17.934 121.482-51.878 179.978a7.984 7.984 0 0 1-6.92 3.984z" fill="" />
              <path d="M344.036 694.632a7.994 7.994 0 0 1-7.998-7.998v-68.766c0-4.422 3.578-7.998 7.998-7.998s7.998 3.576 7.998 7.998v68.766a7.994 7.994 0 0 1-7.998 7.998zM679.964 687.962a7.994 7.994 0 0 1-7.998-7.998v-62.08a7.994 7.994 0 0 1 7.998-7.998 7.992 7.992 0 0 1 7.998 7.998v62.08a7.992 7.992 0 0 1-7.998 7.998zM376.02 992.462c-0.874 0-1.756-0.14-2.632-0.454a8 8 0 0 1-4.92-10.186 151.48 151.48 0 0 1 16.894-33.976c28.276-42.524 75.618-67.924 126.638-67.924 11.358 0 22.668 1.25 33.62 3.732a8.006 8.006 0 0 1 6.06 9.562c-0.968 4.31-5.28 7.044-9.56 6.03a137.668 137.668 0 0 0-30.12-3.328c-45.654 0-88.012 22.73-113.312 60.786a135.646 135.646 0 0 0-15.114 30.4 8 8 0 0 1-7.554 5.358zM647.972 992.462a8.01 8.01 0 0 1-7.56-5.358 134.146 134.146 0 0 0-15.124-30.384 137.06 137.06 0 0 0-22.62-26.166 7.986 7.986 0 0 1-0.624-11.294c2.952-3.266 8.03-3.546 11.278-0.61a153.044 153.044 0 0 1 25.308 29.198 152.962 152.962 0 0 1 16.902 33.976 8.012 8.012 0 0 1-7.56 10.638zM496.004 991.9a7.996 7.996 0 0 1-5.656-13.654l143.97-143.968a7.996 7.996 0 1 1 11.31 11.308l-143.97 143.97a7.964 7.964 0 0 1-5.654 2.344zM823.936 328.038a7.994 7.994 0 0 1-7.998-8C815.938 152.45 679.59 16.102 512 16.102S208.064 152.45 208.064 320.04c0 4.422-3.578 8-8 8a7.994 7.994 0 0 1-7.998-8C192.066 143.63 335.592 0.106 512 0.106c176.4 0 319.934 143.526 319.934 319.934a7.994 7.994 0 0 1-7.998 7.998z" fill="" />
              <path d="M200.064 759.95a7.994 7.994 0 0 1-7.998-8V320.04a7.994 7.994 0 0 1 7.998-7.998c4.422 0 8 3.578 8 7.998v431.91c0 4.422-3.578 8-8 8z" fill="" />
              <path d="M823.936 759.95a7.994 7.994 0 0 1-7.998-8V320.04c0-4.42 3.576-7.998 7.998-7.998s7.998 3.578 7.998 7.998v431.91c0 4.422-3.576 8-7.998 8z" fill="" />
              <path d="M201.682 375.864l-3.234-15.668c277.74-57.308 505.576-282.95 507.854-285.222l11.31 11.294c-2.294 2.312-233.41 231.296-515.93 289.596z" fill="" />
              <path d="M820.874 344.988c-149.876-54.59-259.04-137.746-260.118-138.582l9.748-12.684c1.062 0.82 108.4 82.522 255.838 136.236l-5.468 15.03z" fill="" />
              <path d="M603.982 607.98a8.018 8.018 0 0 1-7.938-6.984 8.002 8.002 0 0 1 6.938-8.95c1.482-0.188 149.718-19.762 184.336-84.664 10.216-19.106 9.374-39.976-2.532-63.792a8.004 8.004 0 0 1 3.578-10.732 8.012 8.012 0 0 1 10.732 3.578c14.2 28.4 14.98 54.808 2.342 78.492-38.524 72.164-190.024 92.176-196.458 92.988a7.138 7.138 0 0 1-0.998 0.064z" fill="" />
              <path d="M577.986 623.976c-19.058 0-33.992-10.544-33.992-23.996 0-13.45 14.934-23.994 33.992-23.994s33.992 10.544 33.992 23.994c0 13.452-14.934 23.996-33.992 23.996z m0-31.992c-11.154 0-17.996 5.17-17.996 7.996 0 2.828 6.842 8 17.996 8s17.996-5.172 17.996-8c0-2.826-6.842-7.996-17.996-7.996z" fill="" />
              <path d="M512 815.938c-155.264 0-195.068-81.14-196.686-84.594a7.992 7.992 0 0 1 3.85-10.636c3.976-1.876 8.734-0.156 10.616 3.826 0.398 0.812 37.938 75.406 182.22 75.406 144.876 0 176.244-74.204 176.526-74.954 1.64-4.092 6.312-6.108 10.404-4.452a8.016 8.016 0 0 1 4.468 10.388c-1.406 3.468-35.804 85.016-191.398 85.016z" fill="" />
            </g>
          </svg>
          <span className="ml-2">Total: </span>
          <span className="ml-1 text-sm  font-bold text-blue-900">{customers ? customers.length : 'Loading...'}</span>
        </div>
      </div>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">

        <div className="flex items-center mb-4">
          <label htmlFor="search" className="mr-2 text-gray-600">
            Search by Email:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search customers ..."
            className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none text-sm font-medium"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorMsg message={error?.message} />
        ) : filteredCustomers?.length <= 0 ? (
          <NoDataFound />
        ) : (
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
                  Image
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Full Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Number of Orders
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  First Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  City
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Postal Code
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
                  Toggle Lock
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentItems?.map((customer, index) => (
                <tr key={customer?._id}>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {startIndex + index + 1}
                  </td>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    <img
                      src={customer?.image}
                      alt={customer?.fullname}
                      className="h-8 w-8 rounded-full"
                    />
                  </td>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:w-auto sm:max-w-none sm:pl-6">
                    {customer?.fullname}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-900">
                    {customer?.email}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.orders?.length}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.firstName ?? "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.lastName ?? "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 ">
                    {customer?.shippingAddress?.address ?? "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.city ?? "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.phone ?? "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.postalCode ?? "N/A"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer.lock ?
                      (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Locked
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Normal
                        </span>
                      )}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer.lock ? (
                      <button onClick={() => toggleLockCustomersHandler(customer?._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className="w-6 h-6 cursor-pointer text-indigo-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </button>
                    ) : (
                      <button onClick={() => toggleLockCustomersHandler(customer?._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" className="w-6 h-6 cursor-pointer text-indigo-600">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-gray-600 font-medium text-[16px]">
          Showing {startIndex + 1} to {endIndex} of {filteredCustomers?.length} categories
        </div>
        <div className="flex items-center">
          <div className="mr-4 flex items-center">
            <label htmlFor="itemsPerPage" className="mr-2 text-gray-600">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none text-sm font-medium text-center"
              value={selectedItemsPerPage}
              onChange={(e) => setSelectedItemsPerPage(Number(e.target.value))}
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
              className={`mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white ${currentPage === pageNumber ? "bg-blue-600 text-[#fff] hover:bg-blue-500" : "text-gray-700 hover:bg-blue-500 "}`}
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
  );
}
