import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesAction, deleteCategoryAction } from "../../../redux/slices/categories/categoriesSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import ButtonShort from "./ButtonShort/ButtonShort";
import Swal from 'sweetalert2';

const ManageCategories = () => {
  const dispatch = useDispatch();

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const {
    categories: { categories },
    loading,
    error,
  } = useSelector((state) => state?.categories);

  // Delete category handler
  const deleteCategoryHandler = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to restore this category!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryAction(id)).then(() => {
          Swal.fire(
            'Deleted!',
            'Your category has been deleted.',
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  
  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCategories?.length / selectedItemsPerPage);
  const startIndex = (currentPage - 1) * selectedItemsPerPage;
  const endIndex = Math.min(startIndex + selectedItemsPerPage, filteredCategories?.length);
  const currentItems = filteredCategories?.slice(startIndex, endIndex);
  


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            List of categories
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-700">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
              <g id="SVGRepo_iconCarrier"> <g data-name="29 online shop 2" id="_29_online_shop_2"> <path d="M58.5,3.5H5.5a2,2,0,0,0-2,2v53a2,2,0,0,0,2,2h53a2,2,0,0,0,2-2V5.5A2,2,0,0,0,58.5,3.5Zm0,2v7.167H5.5V5.5Zm-53,53V14.667h53l0,43.833Z" /> <path d="M15.5,7.046a2.037,2.037,0,1,0,2,2.037,2.018,2.018,0,0,0-2-2.037Z" /> <path d="M9.5,7.046a2.037,2.037,0,1,0,2,2.037,2.018,2.018,0,0,0-2-2.037Z" /> <path d="M21.5,7.046a2.037,2.037,0,1,0,2,2.037,2.018,2.018,0,0,0-2-2.037Z" /> <path d="M43.171,27.1a9.81,9.81,0,0,0-3.411-2.479,8.143,8.143,0,0,0-2.786-.608,4.212,4.212,0,0,0-2.92.614,4.271,4.271,0,0,0-.755.787,3.053,3.053,0,0,1-.354.4,1.3,1.3,0,0,1-1.877.012,3.078,3.078,0,0,1-.367-.415,4.246,4.246,0,0,0-.741-.776,4.214,4.214,0,0,0-2.928-.625,8.149,8.149,0,0,0-2.788.606,9.809,9.809,0,0,0-3.415,2.482l-2.57,2.84a1,1,0,0,0,0,1.342l3.66,4.05a1,1,0,0,0,.741.329h0a1,1,0,0,0,.74-.328L25,33.576v11.43a1,1,0,0,0,1,1H38a1,1,0,0,0,1-1V33.576l1.6,1.762a1,1,0,0,0,.74.328h0a1,1,0,0,0,.741-.329l3.66-4.05a1,1,0,0,0,0-1.342Zm-1.833,6.073-2.6-2.863a1,1,0,0,0-1.74.672v13.02H27V30.986a1,1,0,0,0-1.74-.672l-2.6,2.863-2.313-2.561,1.963-2.168a7.78,7.78,0,0,1,2.708-1.981,6.146,6.146,0,0,1,2.114-.452,2.658,2.658,0,0,1,1.6.206,2.689,2.689,0,0,1,.405.444,5.022,5.022,0,0,0,.628.686,3.293,3.293,0,0,0,4.482-.012,5.015,5.015,0,0,0,.614-.674,2.708,2.708,0,0,1,.418-.455,2.721,2.721,0,0,1,1.592-.2,6.139,6.139,0,0,1,2.112.454,7.78,7.78,0,0,1,2.7,1.978l1.963,2.169Z" /> <path d="M55.4,9.083l.813-.827a1,1,0,0,0-1.428-1.4l-.786.8-.786-.8a1,1,0,0,0-1.428,1.4l.813.827-.813.828a1,1,0,0,0,1.428,1.4l.786-.8.786.8a1,1,0,0,0,1.428-1.4Z" /> <path d="M44.5,10.083h4a1,1,0,0,0,0-2h-4a1,1,0,0,0,0,2Z" /> <path d="M10.519,33.9l5.13-4.387a1,1,0,0,0-1.3-1.52l-6,5.13a1,1,0,0,0-.018,1.505l6,5.37a1,1,0,0,0,1.334-1.49Z" /> <path d="M49.649,27.99a1,1,0,0,0-1.3,1.52l5.13,4.387-5.148,4.608a1,1,0,1,0,1.334,1.49l6-5.37a1,1,0,0,0-.018-1.505Z" /> </g> </g>
            </svg>
            <span className="ml-2">Total: </span>
            <span className="ml-1 text-sm  font-bold text-blue-900">{categories ? categories.length : 'Loading...'}</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <ButtonShort>
            <Link
              to="/admin/add-category"
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Category
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
          placeholder="Search category name..."
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none text-sm font-medium"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : filteredCategories?.length <= 0 ? (
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
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        STT
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        No. Products
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {currentItems?.map((category, index) => (
                      <tr key={category?._id} className="hover:bg-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-[150px]">
                          {startIndex + index +1}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.image}
                                alt={category?.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {category?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {category?.products?.length}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(category?.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                          <button onClick={() => deleteCategoryHandler(category?._id)}>
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
              Showing {startIndex + 1} to {endIndex} of {filteredCategories?.length} categories
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
};

export default ManageCategories;
