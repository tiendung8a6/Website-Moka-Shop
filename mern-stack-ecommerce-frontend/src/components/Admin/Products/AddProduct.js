import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { fetchBrandsAction } from "../../../redux/slices/categories/brandsSlice";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";
import { fetchColorsAction } from "../../../redux/slices/categories/colorsSlice";
import { createProductAction } from "../../../redux/slices/products/productSlices";

import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import ButtonOrder from '../../Admin/Categories/ButtonOrder/buttonOrder'

//animated components for react-select
const animatedComponents = makeAnimated();

export default function AddProduct() {
  const dispatch = useDispatch();
  //files
  const [files, setFiles] = useState([]);
  const [fileErrs, setFileErrs] = useState([]);
  //file handlechange
  const [showUploadInstructions, setShowUploadInstructions] = useState(true);
  const [imageURL, setImageURL] = useState([]);

  const fileHandleChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const newErrs = [];
    const newImageURLs = [];
  
    newFiles.forEach((file) => {
      if (file?.size > 1000000) {
        newErrs.push(`${file?.name} is too large`);
      }
      if (!file?.type?.startsWith('image/')) {
        newErrs.push(`${file?.name} is not an image`);
      }
  
      const reader = new FileReader();
      reader.onloadend = () => {
        file.base64 = reader.result;
        newImageURLs.push(reader.result);
        setFiles([...newFiles]);
        setImageURL(newImageURLs);
      };
      reader.readAsDataURL(file);
    });
  
    setFileErrs(newErrs);
    setShowUploadInstructions(false);
  };

  //Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [sizeOption, setSizeOption] = useState([]);
  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };
  //converted sizes
  const sizeOptionsCoverted = sizes?.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  //categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //select data from store
  const { categories } = useSelector((state) => state?.categories?.categories);

  //brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  //select data from store
  const {
    brands: { brands },
  } = useSelector((state) => state?.brands);
  //colors
  const [colorsOption, setColorsOption] = useState([]);

  const {
    colors: { colors },
  } = useSelector((state) => state?.colors);
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  const handleColorChange = (colors) => {
    setColorsOption(colors);
  };
  //converted colors
  const colorsCoverted = colors?.map((color) => {
    return {
      value: color?.name,
      label: color?.name,
    };
  });

  //---form data---
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    district: "",
    phone: "",
  });

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //get product from store
  const { product, isAdded, loading, error } = useSelector(
    (state) => state?.products
  );

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(fileErrs);
    //dispatch
    dispatch(
      createProductAction({
        ...formData,
        files,
        colors: colorsOption?.map((color) => color.label),
        sizes: sizeOption?.map((size) => size?.label),
      })
    );

    //reset form data
    setFormData({
      name: "",
      description: "",
      category: "",
      sizes: "",
      brand: "",
      colors: "",
      images: "",
      price: "",
      totalQty: "",
    });
  };
  /////////////////////////////////////
  const [selectedColors, setSelectedColors] = useState([]);



  return (
    <>

      {error && <ErrorMsg message={error?.message} />}
      {fileErrs?.length > 0 && (
        <ErrorMsg message="file too large or upload an image" />
      )}
      {isAdded && <SuccessMsg message="Product Added Successfully" />}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create New Product
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a href="/admin/manage-products" className="font-medium text-indigo-600 hover:text-indigo-500">
              Manage Products
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name<span className="text-red-500 font-bold"> *</span>
                </label>
                <div className="mt-1">
                  <input
                    name="name"
                    value={formData?.name}
                    onChange={handleOnChange}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* size option */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Size<span className="text-red-500 font-bold"> *</span>
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="sizes"
                  options={sizeOptionsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(item) => handleSizeChange(item)}
                />
              </div>
              {/* Select category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Category<span className="text-red-500 font-bold"> *</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleOnChange}
                  className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
                  defaultValue="Canada"
                >
                  <option>-- Select Category<span className="text-red-500 font-bold"> *</span> --</option>
                  {categories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Select Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Brand<span className="text-red-500 font-bold"> *</span>
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleOnChange}
                  className="mt-1  block w-full rounded-md border-gray-300 py-2  pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border"
                  defaultValue="Canada"
                >
                  <option>-- Select Brand<span className="text-red-500 font-bold"> *</span> --</option>
                  {brands?.map((brand) => (
                    <option key={brand?._id} value={brand?.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Color<span className="text-red-500 font-bold"> *</span>
                </label>
                <Select
                  components={animatedComponents}
                  isMulti
                  name="colors"
                  options={colorsCoverted}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isClearable={true}
                  isLoading={false}
                  isSearchable={true}
                  closeMenuOnSelect={false}
                  onChange={(e) => handleColorChange(e)}
                  styles={{
                    multiValue: (styles, { data }) => {
                      const color = data.label.toLowerCase(); // Lấy màu sắc từ label và chuyển thành chữ thường
                      return {
                        ...styles,
                        backgroundColor: color, // Đặt màu nền tương ứng
                        color: "black", // Đặt màu chữ để hiển thị trên màu nền
                      };
                    },
                  }}
                />

              </div>

              {/* upload images */}
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Upload Images<span className="text-red-500 font-bold"> *</span>
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <div className="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      {showUploadInstructions ? (
                        <>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload files</span>
                              <input
                                multiple
                                onChange={fileHandleChange}
                                type="file"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 1MB
                          </p>
                        </>
                      ) : (

                        <div className="lg:ml-[100px]">
                          {imageURL.map((url, index) => (
                            <img className="h-[100px] pt-2" key={index} src={url} alt={`Uploaded Image ${index}`} />
                            
                          ))}

                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload files</span>
                              <input
                                multiple
                                onChange={fileHandleChange}
                                type="file"
                              />
                            </label>
                          
                        </div>
                      )}
                    </div>


                  </div>
                </div>
              </div>

              {/* price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price<span className="text-red-500 font-bold"> *</span>
                </label>
                <div className="mt-1">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Quantity<span className="text-red-500 font-bold"> *</span>
                </label>
                <div className="mt-1">
                  <input
                    name="totalQty"
                    value={formData.totalQty}
                    onChange={handleOnChange}
                    type="number"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* description */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Product Description<span className="text-red-500 font-bold"> *</span>
                </label>
                <div className="mt-1">
                  <textarea
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
                    className="block w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {/* <ButtonOrder>ssss</ButtonOrder> */}
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <ButtonOrder
                    disabled={fileErrs?.length > 0}
                    type="submit"
                    className=" flex w-[2000px] justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add Product
                  </ButtonOrder>

                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
