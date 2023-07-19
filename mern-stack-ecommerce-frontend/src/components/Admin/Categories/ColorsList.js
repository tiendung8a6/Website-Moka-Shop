import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchColorsAction, deleteColorAction } from "../../../redux/slices/categories/colorsSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import ButtonShort from "./ButtonShort/ButtonShort";
import Swal from 'sweetalert2';

export default function ColorsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const {
    colors: { colors },
    loading,
    error,
  } = useSelector((state) => state?.colors);


  //---delete handler---
  const deleteColorHandler = (id) => {
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
        dispatch(deleteColorAction(id)).then(() => {
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

  // Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPageOptions = [5, 10, 15, 20];
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredColors = colors?.filter(color => color.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredColors?.length / selectedItemsPerPage);
  const startIndex = (currentPage - 1) * selectedItemsPerPage;
  const endIndex = Math.min(startIndex + selectedItemsPerPage, filteredColors?.length);
  const currentItems = filteredColors?.slice(startIndex, endIndex);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            List of colors
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-700">
            <svg fill="#000000" width="24px" height="24px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <g data-name="14 giftbox" id="_14_giftbox">
                  <path d="M58.48,17.94H39.1l3.09-.89c.7-.2,1.42-.37,2.13-.55a31.437,31.437,0,0,0,3.98-1.16c2.26-.87,6-3.23,7.07-6.14a4.346,4.346,0,0,0-.24-3.68c-1-1.85-3.08-2.46-5.85-1.71a16.948,16.948,0,0,0-6.67,3.36,56.652,56.652,0,0,0-4.12,3.89c-.46.46-.91.92-1.38,1.38q-1.965,1.935-3.91,3.89L32,17.53l-1.2-1.2q-1.95-1.95-3.91-3.89c-.47-.46-.92-.92-1.38-1.38a56.652,56.652,0,0,0-4.12-3.89,16.948,16.948,0,0,0-6.67-3.36c-2.77-.75-4.85-.14-5.85,1.71A4.346,4.346,0,0,0,8.63,9.2c1.07,2.91,4.81,5.27,7.07,6.14a31.437,31.437,0,0,0,3.98,1.16c.71.18,1.43.35,2.13.55l3.09.89H5.52A2.019,2.019,0,0,0,3.5,19.95v5.07a2.027,2.027,0,0,0,2.02,2.02H7.57V58.49A2.019,2.019,0,0,0,9.59,60.5H54.41a2.019,2.019,0,0,0,2.02-2.01V27.04h2.05a2.027,2.027,0,0,0,2.02-2.02V19.95A2.019,2.019,0,0,0,58.48,17.94ZM38.52,13.86c.47-.46.93-.93,1.39-1.39a51.9,51.9,0,0,1,3.98-3.76,15.025,15.025,0,0,1,5.92-2.97,6.07,6.07,0,0,1,1.6-.24,2.068,2.068,0,0,1,1.97.98,2.394,2.394,0,0,1,.12,2.03c-.8,2.15-3.94,4.2-5.92,4.97a30.476,30.476,0,0,1-3.73,1.08c-.74.18-1.48.36-2.21.57l-6.19,1.78Q36.98,15.38,38.52,13.86ZM22.36,15.13c-.73-.21-1.47-.39-2.21-.57a30.476,30.476,0,0,1-3.73-1.08c-1.98-.77-5.12-2.82-5.92-4.97a2.394,2.394,0,0,1,.12-2.03,2.068,2.068,0,0,1,1.97-.98,6.07,6.07,0,0,1,1.6.24,15.025,15.025,0,0,1,5.92,2.97,51.9,51.9,0,0,1,3.98,3.76c.46.46.92.93,1.39,1.39q1.545,1.515,3.07,3.05ZM5.5,25.02l.02-5.08H26.93v5.1H8.57Zm21.43,2.02V37.21H9.57V27.04Zm0,31.45H9.57V47.32H26.93Zm27.48.01-17.34-.01V47.32H54.41Zm0-13.18H36.07a1,1,0,0,0-1,1V58.49H28.93V46.32a1,1,0,0,0-1-1H9.57V39.21H27.93a1,1,0,0,0,1-1V19.95h6.14V38.21a1,1,0,0,0,1,1H54.42Zm.01-8.11H37.07V27.04H54.43Zm4.06-12.17H37.07V19.95H58.5Z" />
                </g>
              </g>
            </svg>
            <span className="ml-1">Total: </span>
            <span className="ml-1 text-sm  font-bold text-blue-900">
              {colors ? colors.length : 'Loading...'}
            </span>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <ButtonShort>
            <Link
              to="/admin/add-color"
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add New Color
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
          className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none text-sm font-medium"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : filteredColors?.length <= 0 ? (
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
                    {currentItems?.map((color, index) => (
                      <tr key={color?._id} className="hover:bg-gray-200">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 w-[140px]">
                          {startIndex + index + 1}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900">
                              {color?.name}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(color?.createdAt).toLocaleDateString()}
                        </td>
                        {/* delete */}
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <button
                            onClick={() => deleteColorHandler(color?._id)}
                          >
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
              Showing {startIndex + 1} to {endIndex} of {filteredColors?.length} colors
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
                  onChange={(e) =>
                    setSelectedItemsPerPage(Number(e.target.value))
                  }
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`mx-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white ${currentPage === pageNumber
                        ? "bg-blue-600 text-[#fff] hover:bg-blue-500"
                        : "text-gray-700 hover:bg-blue-500"
                      }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
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
