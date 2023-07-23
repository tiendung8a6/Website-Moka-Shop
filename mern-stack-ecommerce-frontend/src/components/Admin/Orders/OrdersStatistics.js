import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrdersStatsAction } from "../../../redux/slices/orders/ordersSlices";
import { Typography } from "@material-tailwind/react";
import MoneyBag from "./img-order/MoneyBag.svg";
import Loworder from "./img-order/icon-low.svg";
import Highorder from "./img-order/icon-high.svg";
import TotalSales from "./img-order/total_sale.svg";





export default function OrdersStats() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(OrdersStatsAction());
  }, []);
  //get data from store
  const { stats, loading, error } = useSelector((state) => state?.orders);
  const obj = stats?.orders;
  const statistics = obj && obj.length > 0 ? Object.values(obj[0]) : [];
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Today's sales */}
        <div className="relative overflow-hidden rounded-lg bg-indigo-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <div className="flex justify-around">
            <div>
              <p className="text-md truncate text-sm font-medium text-gray-200">
                Today's Sales <br></br>
                {date}
              </p>
              <p className="text-2xl font-semibold text-gray-200">
              {stats?.saleToday?.length <= 0 ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(0) : new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(0)}
              </p>
            </div>
            <div className=" rounded-md bg-indigo-400 p-3">
              <img src={MoneyBag} className="w-[50px]"></img>
            </div>
          </div>
        </div>
        {/* stat 1 */}
        <div className="relative overflow-hidden rounded-lg bg-red-800 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <div className="flex justify-around">
            <div>
              <p className="text-md truncate text-sm font-medium text-gray-200">
                Minimum Order
              </p>
              <p className="text-2xl font-semibold text-gray-200">
                
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(statistics[1])}

              </p>
            </div>
            <div className=" rounded-md bg-red-500 p-3">
              <img src={Loworder} className="w-[50px]"></img>
            </div>
          </div>
        </div>
        {/* stat 2 */}
        <div className="relative overflow-hidden rounded-lg bg-yellow-900 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <div className="flex justify-around">
            <div>
              <p className="text-md truncate text-sm font-medium text-gray-200">
                Maximum Oder
              </p>
              <p className="text-2xl font-semibold text-gray-200">
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(statistics[3])}
                
              </p>
            </div>
            <div className=" rounded-md bg-yellow-800 p-3">
              <img src={Highorder} className="w-[50px]"></img>
            </div>
          </div>
        </div>
        {/* stat 3 */}
        <div className="relative overflow-hidden rounded-lg bg-green-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
          <div className="flex justify-around">
            <div>
              <p className="text-md truncate text-sm font-medium text-gray-200">
              Total Sales
              </p>
              <p className="text-2xl font-semibold text-gray-200">
              {" "}
              {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(statistics[2])}

              </p>
            </div>
            <div className=" rounded-md bg-green-400 p-3">
              <img src={TotalSales} className="w-[50px]"></img>
            </div>
          </div>
        </div>
      </dl>
    </div>
  );
}
