import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import {
  deleteCouponAction,
  fetchCouponsAction,
} from '../../../redux/slices/coupons/couponsSlice';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import NoDataFound from '../../NoDataFound/NoDataFound';
import ButtonShort from '../Categories/ButtonShort/ButtonShort';

export default function ManageCoupons() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);

  const { coupons, loading, error } = useSelector((state) => state?.coupons);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10); // Add state for perPage
  // const perPage = 10;

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handlePerPageChange = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(0); // Reset the current page when changing perPage
  };

  const paginatedCoupons = coupons?.coupons?.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );

  const startIndex = currentPage * perPage + 1;
  const endIndex = Math.min(startIndex + perPage - 1, coupons?.coupons?.length);

  const deleteCouponHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to restore this coupon!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCouponAction(id)).then(() => {
          Swal.fire('Deleted!', 'Your coupon has been deleted.', 'success').then(() => {
            window.location.reload();
          });
        });
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">List of coupons</h1>
          <div className="flex items-center mt-2 text-sm text-gray-700">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier"> <g data-name="05 discount tag" id="_05_discount_tag"> <path d="M54.76,24.53l-3.3-5.19a10.005,10.005,0,0,0,1.68-5.35,1.274,1.274,0,0,0,.02-.28,10.21,10.21,0,0,0-20.41-.46l-6.99,3.09a3.986,3.986,0,0,0-1.7,1.4L8.72,39.81a.978.978,0,0,0-.06,1.04,25.789,25.789,0,0,0,7.13,8.47,24.756,24.756,0,0,0,9.9,4.54,1.492,1.492,0,0,0,.21.02.986.986,0,0,0,.85-.49l3.67-6.12v9.68a1,1,0,0,0,.58.91,28.321,28.321,0,0,0,23.88,0,.989.989,0,0,0,.58-.91V26.93A4.448,4.448,0,0,0,54.76,24.53ZM42.94,5.5a8.237,8.237,0,0,1,8.22,8.24.757.757,0,0,0-.01.15,8.223,8.223,0,0,1-.9,3.55l-1.72-2.71a5.6,5.6,0,0,0-4.73-2.59H41.99a5.469,5.469,0,0,0-1.97.37,4.926,4.926,0,0,0-4.66-.41l-.51.23A8.236,8.236,0,0,1,42.94,5.5ZM30.42,27.3V43.39l-5.01,8.35A22.691,22.691,0,0,1,17,47.73a23.7,23.7,0,0,1-6.29-7.29l15-21.56a2.01,2.01,0,0,1,.85-.71l9.61-4.24a2.875,2.875,0,0,1,1.85-.13,4.99,4.99,0,0,0-.83,1.05L31.06,25A4.528,4.528,0,0,0,30.42,27.3ZM53.46,56.31a26.784,26.784,0,0,1-21.04,0V27.3a2.489,2.489,0,0,1,.36-1.27L38.9,15.88a3.634,3.634,0,0,1,3.09-1.74H43.8a3.581,3.581,0,0,1,3.04,1.67l2.18,3.42a8.118,8.118,0,0,1-6.08,2.7,8.38,8.38,0,0,1-1.57-.17,2.463,2.463,0,0,1,2.15-1.29,1,1,0,0,0,0-2,4.455,4.455,0,1,0,0,8.91,1,1,0,0,0,0-2,2.457,2.457,0,0,1-2.3-1.6,10.144,10.144,0,0,0,8.9-2.81l2.96,4.64a2.446,2.446,0,0,1,.38,1.32Z" /> <path d="M38.33,32.3a3.3,3.3,0,1,0,3.31,3.3A3.3,3.3,0,0,0,38.33,32.3Zm0,4.6a1.3,1.3,0,1,1,1.31-1.3A1.3,1.3,0,0,1,38.33,36.9Z" /> <path d="M47.55,43.81a3.305,3.305,0,1,0,3.3,3.31A3.312,3.312,0,0,0,47.55,43.81Zm0,4.61a1.305,1.305,0,1,1,1.3-1.3A1.3,1.3,0,0,1,47.55,48.42Z" /> <path d="M48.693,33.67a1,1,0,0,0-1.406.149L37.043,46.489A1,1,0,0,0,38.6,47.747l10.244-12.67A1,1,0,0,0,48.693,33.67Z" /> <path d="M23.479,41.225a1,1,0,1,0-1.268,1.546l2.934,2.407a.99.99,0,0,0,.632.227,1,1,0,0,0,.635-1.773Z" /> <path d="M17.586,36.415a1,1,0,0,0-1.313,1.508l2.741,2.386A1,1,0,1,0,20.326,38.8Z" /> </g> </g>
            </svg>
            <span>Total: </span>
            <span className="ml-1 text-sm  font-bold text-blue-900">{coupons?.coupons?.length}</span>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <ButtonShort>
            <Link
              to="/admin/add-coupon"
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Coupon
            </Link>
          </ButtonShort>
        </div>
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error?.message || 'Something went wrong, please try again'} />
      ) : coupons?.coupons?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                          Code
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Percentage (%)
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Start Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          End Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Days Left
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Edit
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {paginatedCoupons?.map((coupon, index) => (
                        <tr key={coupon._id} className="hover:bg-gray-200">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-[90px]">
                            {currentPage * perPage + index + 1}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {coupon?.code}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{coupon?.discount}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coupon?.isExpired ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-700 text-gray-300">
                                Expired
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(coupon.startDate)?.toLocaleDateString()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(coupon.endDate)?.toLocaleDateString()}
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coupon?.daysLeft}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {coupon?.isExpired ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 cursor-not-allowed text-gray-400"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            ) : (
                              <Link to={`/admin/manage-coupon/edit/${coupon.code}`}>
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
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <button
                              onClick={() => deleteCouponHandler(coupon?._id)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer text-indigo-600">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-base text-gray-700">
              Showing {startIndex} to {endIndex} of {coupons?.coupons?.length} coupons
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-base text-gray-700">Items per page:</span>
              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="text-base text-gray-700 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={Math.ceil(coupons?.coupons?.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination flex items-center'}
              pageClassName={'mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white'}
              previousClassName={'mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white'}
              nextClassName={'mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white'}
              breakClassName={'px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white'}
              pageLinkClassName={'text-sm'}
              previousLinkClassName={'text-sm'}
              nextLinkClassName={'text-sm'}
              breakLinkClassName={'text-sm'}
              activeClassName={'active bg-blue-600 text-[#fff]'}
            />
          </div>
        </>
      )}
    </div>
  );
}
