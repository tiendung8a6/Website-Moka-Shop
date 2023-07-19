import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateOrderAction } from "../../../redux/slices/orders/ordersSlices";

const UpdateOrders = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState({
    status: "pending", // Đặt giá trị mặc định của status là "pending"
  });

  const onChange = (e) => {
    const updatedStatus = e.target.value; // Lấy giá trị mới từ dropdown
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: updatedStatus, // Cập nhật trạng thái mới vào order state
    }));
  };

  React.useEffect(() => {
    // Khi component render, dispatch action để cập nhật trạng thái ban đầu của đơn hàng
    dispatch(updateOrderAction({ status: order.status, id }));
  }, [dispatch, id, order.status]);

  const onSubmit = (e) => {
    e.preventDefault();
    // redirect
    window.location.href = "/admin";
  };

  return (
    <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
      <div className="flex flex-1 justify-center">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Update Order
          </label>
          <form onSubmit={onSubmit}>
            <select
              id="location"
              name="status"
              onChange={onChange}
              value={order.status}
              className="mt-1 block w-full rounded-md border-2 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="Returned">Returned</option>
              <option value="delivered">Delivered</option>
            </select>
            <button type="submit" className="mt-2 text-white bg-indigo-500 rounded-md px-4 py-2">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrders;