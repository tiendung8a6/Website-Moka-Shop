import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileAction,
  updateUserShippingAddressAction,
} from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

const AddShippingAddress = () => {
  //dispatch
  const dispatch = useDispatch();
  //user profile
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.user;
  console.log(user?.hasShippingAddress);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
    phone: "",
  });
  //onchange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //onsubmit
  const onSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    dispatch(updateUserShippingAddressAction(formData));
  };


  // Danh sách các quốc gia và thành phố tương ứng
  const countriesWithCities = {
    Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang", "Can Tho", "Hai Phong", "Nha Trang", "Vung Tau", "Hue", "Bien Hoa", "Ha Long",
      "Buon Ma Thuot", "Ninh Binh", "Da Lat", "Phan Thiet", "Long Xuyen", "My Tho", "Rach Gia", "Cam Ranh", "Quy Nhon", "Vinh",
      "Nam Dinh", "Rang Dong", "Thai Nguyen", "Vinh Long", "Bac Lieu", "Yen Bai", "Hoa Binh", "Thai Binh", "Ha Nam", "Lang Son",
      "Dong Hoi", "Soc Trang", "Ba Ria", "Phu Ly", "Cao Bang", "Ha Tinh", "Tuy Hoa", "Dien Bien Phu", "Bac Giang", "Vi Thanh",
      "Son Tay", "Dong Xoai", "Ben Tre", "Tan An", "Bac Ninh", "Hai Duong", "Tra Vinh", "Quang Ngai", "Hoi An", "Ha Giang",
      "Phan Rang-Thap Cham", "Dong Ha", "Vinh Yen", "Can Gio", "Son La", "Moc Chau", "Lao Cai", "Gia Nghia", "Dien Bien",
      "Dak Nong", "Tam Ky", "Vinh Chau", "Ha Tien", "Ca Mau", "Bac Ha", "Thanh Hoa", "Song Cau", "Sa Dec"],
    Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Krabi", "Chiang Rai", "Hua Hin", "Koh Samui", "Ayutthaya", "Pai"],
    Indonesia: ["Jakarta", "Bali", "Surabaya", "Bandung", "Yogyakarta"],
    Malaysia: ["Kuala Lumpur", "Penang", "Malacca", "Johor Bahru", "Ipoh", "Kota Kinabalu", "Kuching", "Langkawi", "Cameron Highlands", "Kuantan", "Georgetown"],
    Philippines: ["Manila", "Cebu City", "Davao City", "Quezon City", "Caloocan", "Zamboanga City", "Taguig", "Antipolo", "Cagayan de Oro", "Parañaque", "General Santos"],
    Singapore: ["Singapore"],
    Brunei: ["Bandar Seri Begawan", "Kuala Belait", "Tutong", "Seria", "Bangar"],
    Cambodia: ["Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang", "Kampong Cham", "Prey Veng", "Kampong Chhnang", "Kampong Speu", "Kratie", "Kampot"],
    Laos: ["Vientiane", "Luang Prabang", "Pakse", "Savannakhet", "Vang Vieng", "Thakhek", "Muang Xay", "Phonsavan", "Luang Namtha", "Xam Neua"],
    Myanmar: ["Yangon", "Mandalay", "Naypyidaw", "Bagan", "Inle Lake", "Mawlamyine", "Bago", "Pyin Oo Lwin", "Pathein", "Meiktila", "Hpa-An"],
    EastTimor: ["Dili", "Same", "Aileu", "Suai", "Baucau", "Lospalos", "Maliana", "Ainaro", "Viqueque", "Manatuto", "Bobonaro"]
  };


  // Danh sách thành phố dựa vào quốc gia được chọn
  const [cities, setCities] = useState([]);

  // Hàm xử lý khi người dùng chọn quốc gia
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    const selectedCities = countriesWithCities[selectedCountry] || [];
    setCities(selectedCities);
    setFormData({ ...formData, country: selectedCountry, city: "" });
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {/* shipping details */}
      {user?.hasShippingAddress ? (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">
            Shipping details
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Double check your information.
          </p>
          <div>
            <p className="mt-1 text-sm text-gray-500">
              First Name : {user?.shippingAddress?.firstName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Last Name : {user?.shippingAddress?.lastName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Country : {user?.shippingAddress?.country}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              City : {user?.shippingAddress?.city}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Address : {user?.shippingAddress?.address}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Phone : {user?.shippingAddress?.phone}
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                required
                onChange={onChange}
                value={formData.firstName}
                autoComplete="given-name"
                className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                required
                onChange={onChange}
                value={formData.lastName}
                className="block w-full rounded-md border-gray-300  p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                name="country"
                autoComplete="country"
                value={formData.country}
                onChange={handleCountryChange}
                required // Add the required attribute
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {/* Set default value to "Select Country" and disable it */}
                <option value="" disabled>
                  Select Country
                </option>
                <option value="Vietnam">Vietnam</option>
                <option value="Thailand">Thailand</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Malaysia">Malaysia</option>
                <option value="Philippines">Philippines</option>
                <option value="Singapore">Singapore</option>
                <option value="Brunei">Brunei</option>
                <option value="Cambodia">Cambodia</option>
                <option value="Laos">Laos</option>
                <option value="Myanmar">Myanmar</option>
                <option value="EastTimor">East Timor</option>
                {/* Thêm các quốc gia khác ở đây */}
              </select>
            </div>
          </div>


          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700">
              City
            </label>
            <div className="mt-1">
              <select
                id="city"
                name="city"
                autoComplete="address-level2"
                value={formData.city}
                onChange={onChange}
                required // Add the required attribute
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {/* Set default value to "Select City" and disable it */}
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>



          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="address"
                required
                onChange={onChange}
                value={formData.address}
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="region"
                required
                onChange={onChange}
                value={formData.region}
                autoComplete="address-level1"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium text-gray-700">
              Postal code
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="postalCode"
                required
                onChange={onChange}
                value={formData.postalCode}
                autoComplete="postal-code"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phone"
                id="phone"
                required
                onChange={onChange}
                value={formData.phone}
                autoComplete="tel"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
              Add Shipping Address
            </button>
          )}
        </form>
      )}
    </>
  );
};

export default AddShippingAddress;
