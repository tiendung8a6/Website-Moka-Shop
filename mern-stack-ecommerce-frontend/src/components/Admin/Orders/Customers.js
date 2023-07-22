import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchOrdersAction } from "../../../redux/slices/orders/ordersSlices";
import { fetchUsersAction } from "../../../redux/slices/users/usersSlice";


import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";

export default function Customers() {
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);

  // get data from store
  const { error, loading, users } = useSelector((state) => state?.users);
  const customers = users?.users;
  console.log("============customers", customers)


  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>

      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
        All Customers [{customers?.length}]
      </h3>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        {loading ? (
          <LoadingComponent />
        ) : customers?.length <= 0 ? (
          <NoDataFound />
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customers?.map((customer) => (
                <tr key={customer?._id}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                    {customer?.fullname}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.email}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.orders?.length}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.firstName}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.lastName}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.address}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.city}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.phone}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {customer?.shippingAddress?.postalCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
