import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBrandsAction, deleteBrandAction } from "../../../redux/slices/categories/brandsSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import ButtonShort from "./ButtonShort/ButtonShort";
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
export default function BrandsList() {
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  const {
    brands: { brands },
    loading,
    error,
  } = useSelector((state) => state?.brands);

  //---delete brands handler---
  const deleteBrandHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to restore this brand!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBrandAction(id)).then(() => {
          Swal.fire(
            'Deleted!',
            'Your brand has been deleted.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        });
      }
    });
  };


  // Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageOptions = [5, 10, 15, 20];
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const filteredBrands = brands?.filter(brand => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredBrands?.length / selectedItemsPerPage);
  const startIndex = (currentPage - 1) * selectedItemsPerPage;
  const endIndex = Math.min(startIndex + selectedItemsPerPage, filteredBrands?.length);
  const currentItems = filteredBrands?.slice(startIndex, endIndex);

  console.log("===========filteredBrands", filteredBrands)

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when searching
  };


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            List of brands
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-700">
            <svg fill="#000000" width="35px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier"> <g data-name="17 quality" id="_17_quality"> <path d="M40.4,20.57a1.009,1.009,0,0,0-.95-.69H34.48l-1.53-4.72a1,1,0,0,0-1.9,0l-1.53,4.72H24.55a1.009,1.009,0,0,0-.95.69.991.991,0,0,0,.37,1.12l4.01,2.92-1.53,4.72a1,1,0,0,0,.36,1.12,1.022,1.022,0,0,0,1.18,0L32,27.53l4.01,2.92a1.086,1.086,0,0,0,.59.19,1.036,1.036,0,0,0,.59-.19,1,1,0,0,0,.36-1.12l-1.53-4.72,4.01-2.92A.991.991,0,0,0,40.4,20.57Zm-6.14,2.85a1.006,1.006,0,0,0-.37,1.12l.81,2.48-2.11-1.54a1.011,1.011,0,0,0-1.18,0L29.3,27.02l.81-2.48a1.006,1.006,0,0,0-.37-1.12l-2.11-1.54h2.61a.991.991,0,0,0,.95-.69L32,18.71l.81,2.48a.991.991,0,0,0,.95.69h2.61Z" /> <path d="M32,10.26a13.239,13.239,0,0,0-1.13,26.43c.38.03.75.05,1.13.05.34,0,.69-.02,1.03-.05h.1v-.01A13.234,13.234,0,0,0,32,10.26Zm9.81,18.72a.01.01,0,0,0-.01.01,11.191,11.191,0,0,1-8.85,5.7l-.01.01h-.01a9.1,9.1,0,0,1-1.88-.01,11.236,11.236,0,1,1,10.76-5.71Z" /> <path d="M58.88,52.73,55.12,46.9q-4.035-6.225-8.06-12.47c.21-.08.45-.17.69-.25a4.179,4.179,0,0,0,2.67-1.8,4.179,4.179,0,0,0-.25-3.19,4.06,4.06,0,0,1-.37-1.63,3.96,3.96,0,0,1,1.01-1.25,4.234,4.234,0,0,0,1.64-2.81,4.19,4.19,0,0,0-1.64-2.8,4.091,4.091,0,0,1-1.01-1.26,4.06,4.06,0,0,1,.37-1.63,4.157,4.157,0,0,0,.25-3.18,4.2,4.2,0,0,0-2.67-1.8,4.218,4.218,0,0,1-1.49-.71,4.362,4.362,0,0,1-.36-1.61,4.191,4.191,0,0,0-1.15-3,4.2,4.2,0,0,0-3.17-.45,4.081,4.081,0,0,1-1.65,0,4.051,4.051,0,0,1-1.01-1.27,4.212,4.212,0,0,0-2.37-2.23,4.132,4.132,0,0,0-3.02.96A4.143,4.143,0,0,1,32,5.25a4.143,4.143,0,0,1-1.53-.73,4.122,4.122,0,0,0-3.01-.96,4.2,4.2,0,0,0-2.38,2.23,4.2,4.2,0,0,1-1,1.27,4.136,4.136,0,0,1-1.66,0,4.174,4.174,0,0,0-3.16.45,4.164,4.164,0,0,0-1.16,3.01,3.961,3.961,0,0,1-.37,1.6,3.944,3.944,0,0,1-1.47.7,4.226,4.226,0,0,0-2.68,1.8,4.179,4.179,0,0,0,.25,3.19,4.06,4.06,0,0,1,.37,1.63,4.091,4.091,0,0,1-1.01,1.26,4.19,4.19,0,0,0-1.64,2.8,4.234,4.234,0,0,0,1.64,2.81,3.96,3.96,0,0,1,1.01,1.25,4.06,4.06,0,0,1-.37,1.63,4.157,4.157,0,0,0-.25,3.18,4.142,4.142,0,0,0,2.67,1.8c.23.09.47.17.69.26Q12.905,40.67,8.88,46.9L5.12,52.73a.981.981,0,0,0,.01,1.1.992.992,0,0,0,1.01.42l6.83-1.27,1.66,6.76a1,1,0,0,0,.81.74.875.875,0,0,0,.16.02.985.985,0,0,0,.84-.46L27.22,43.35c.08.02.15.07.23.09a2.2,2.2,0,0,0,.5.06,5.009,5.009,0,0,0,2.52-1.02A4.143,4.143,0,0,1,32,41.75a4.143,4.143,0,0,1,1.53.73,4.1,4.1,0,0,0,3.03.96c.08-.02.15-.07.22-.09L47.56,60.04a.985.985,0,0,0,.84.46.875.875,0,0,0,.16-.02,1,1,0,0,0,.81-.74l1.66-6.76,6.83,1.27a1,1,0,0,0,1.01-.42A.981.981,0,0,0,58.88,52.73ZM16.02,57l-1.33-5.41a1,1,0,0,0-1.15-.75L8.06,51.86l2.5-3.87q3.75-5.82,7.52-11.64a.784.784,0,0,1,.02.14,4.191,4.191,0,0,0,1.15,3,4.205,4.205,0,0,0,3.17.45,4.081,4.081,0,0,1,1.65,0,3.935,3.935,0,0,1,1.01,1.27c.19.29.38.58.58.86ZM36.4,41.29a.7.7,0,0,1-.3.2c-.28.06-1.02-.39-1.5-.7A5.071,5.071,0,0,0,32,39.75a5.071,5.071,0,0,0-2.6,1.04c-.48.31-1.22.77-1.49.71a.828.828,0,0,1-.32-.22,6.488,6.488,0,0,1-.81-1.13,5.026,5.026,0,0,0-1.83-2.01,3.246,3.246,0,0,0-1.45-.29,11.376,11.376,0,0,0-1.3.1c-.62.07-1.46.17-1.7-.02s-.34-1.04-.41-1.66a5.025,5.025,0,0,0-.79-2.64,1.7,1.7,0,0,0-.27-.27,1.249,1.249,0,0,0-.12-.09l-.01-.01h-.01a6.3,6.3,0,0,0-1.98-.97c-.59-.21-1.39-.49-1.53-.79-.14-.28.14-1.07.34-1.65a4.932,4.932,0,0,0,.43-2.73,4.848,4.848,0,0,0-1.55-2.23c-.44-.44-1.05-1.05-1.05-1.39s.61-.95,1.05-1.39a4.848,4.848,0,0,0,1.55-2.23,4.932,4.932,0,0,0-.43-2.73c-.2-.58-.48-1.37-.34-1.66s.95-.57,1.54-.78a4.864,4.864,0,0,0,2.37-1.34,4.91,4.91,0,0,0,.8-2.63c.07-.62.16-1.46.41-1.66s1.08-.1,1.7-.03a5.007,5.007,0,0,0,2.75-.19,4.956,4.956,0,0,0,1.83-2.01c.33-.54.79-1.27,1.12-1.34.28-.07,1.02.4,1.5.7A5.071,5.071,0,0,0,32,7.25a5.071,5.071,0,0,0,2.6-1.04c.48-.3,1.21-.76,1.5-.7.33.07.79.8,1.12,1.34a4.956,4.956,0,0,0,1.83,2.01,5.007,5.007,0,0,0,2.75.19c.62-.07,1.46-.17,1.7.02s.34,1.04.41,1.66a5.025,5.025,0,0,0,.79,2.64,5.024,5.024,0,0,0,2.39,1.35c.59.2,1.39.48,1.53.78.14.28-.14,1.07-.34,1.65a4.932,4.932,0,0,0-.43,2.73,4.848,4.848,0,0,0,1.55,2.23c.44.44,1.05,1.05,1.05,1.39s-.61.95-1.05,1.39a4.848,4.848,0,0,0-1.55,2.23,4.932,4.932,0,0,0,.43,2.73c.2.58.48,1.37.34,1.66s-.95.58-1.53.78a6.074,6.074,0,0,0-2.07,1.02,3.107,3.107,0,0,0-.31.32,4.91,4.91,0,0,0-.8,2.63c-.07.62-.16,1.46-.41,1.66s-1.08.1-1.7.03a4.916,4.916,0,0,0-2.75.19,5.026,5.026,0,0,0-1.83,2.01A6.464,6.464,0,0,1,36.4,41.29Zm14.06,9.55a1,1,0,0,0-1.15.75L47.98,57,38.34,42.07c.2-.28.39-.57.58-.86a4.07,4.07,0,0,1,1-1.27,4.136,4.136,0,0,1,1.66,0,4.174,4.174,0,0,0,3.16-.45,4.157,4.157,0,0,0,1.16-3,.675.675,0,0,1,.02-.14q3.765,5.82,7.52,11.64l2.5,3.87Z" /> </g> </g>
            </svg>
            <span className="ml-1" >Total: </span>
            <span className="ml-1 text-sm  font-bold text-blue-900">{brands ? brands.length : 'Loading...'}</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <ButtonShort>
            <Link
              to="/admin/add-brand"
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
              Add New Brand
            </Link>
          </ButtonShort>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="search" className="mr-2 text-gray-600">
          Search by Name:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search brand ..."
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none text-sm font-medium"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : filteredBrands?.length <= 0 ? (
        <NoDataFound />
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        STT
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentItems?.map((brand, index) => (
                      <tr key={brand?._id} className="hover:bg-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-[130px]">
                          {startIndex + index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900">
                              {brand?.name}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(brand?.createdAt).toLocaleDateString()}
                        </td>
                        {/* delete icon */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button onClick={() => deleteBrandHandler(brand?._id)}>
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
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-gray-600 font-medium text-[16px]">
              Showing {startIndex + 1} to {endIndex} of {filteredBrands?.length} brands
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
      )}
    </div>
  );
}