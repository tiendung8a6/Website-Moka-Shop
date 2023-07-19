import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProductsAction } from "../../../redux/slices/products/productSlices";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import baseURL from "../../../utils/baseURL";
import "./HomeProductTrending.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PopupShopping from '../PopupShopping/PopupShopping';


const HomeProductTrending = () => {
  let productUrl = `${baseURL}/products`;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAction({ url: productUrl }));
  }, [dispatch]);

  const {
    products: { products },
    error,
    loading,
  } = useSelector((state) => state?.products);

  const sliderRef = useRef(null);

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },

      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },

      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function reloadPageAndNavigate(url) {
    window.location.reload();
    window.location.href = url;
  }

  return (
    <section aria-labelledby="trending-heading ">
      <div className="section-HomeProductTrending mb-20">
        <div className="md:flex md:items-center md:justify-between flex-col">
          

          <h1 id="favorites-heading" className='uppercase text-[35px] font-semibold text-[#1a3760] text-center mt-10 font-serif '>
            Trending Products</h1>
          <Link
            to="/products-filters"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all Products
            <span aria-hidden="true"> &rarr;</span>
          </Link>

        </div>

        <div className="mt-6 ">
          <Slider ref={sliderRef} {...settings} className="mx-10 rounded-3xl">
            {products?.map((product) => (
              <div key={product.id} className="px-2 Carousel-product-categoriges">
                <div

                  className="group relative flex flex-col overflow-hidden rounded-md p-6 "
                >
                  <div className="h-56 w-full overflow-hidden rounded-md  lg:h-52 xl:h-60">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover object-center "
                    />
                  </div>
                  <h3 className=" text-sm text-gray-700 uppercase text-center pt-5 text-black font-semibold">
                    <span className="absolute inset-0 boder-Carousel-product-categoriges" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-black uppercase text-center  ">

                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                      product.price
                    )}
                  </p>
                  <PopupShopping data={product} ></PopupShopping>



                  <Link to={`/products/${product._id}`} onClick={() => reloadPageAndNavigate(`/products/${product._id}`)}>
                    <button class="button-buynow-product-HomePage mt-4 w-full  ">
                      <span class="button_lg">
                        <span class="button_sl"></span>
                        <span class="button_text">Buy Now</span>
                      </span>
                    </button>
                  </Link>

                </div>
              </div>
            ))}
          </Slider>
          <div className="Carousel-product-categoriges-btn">
            <button onClick={handlePrev}> <FaArrowLeft style={{ fontSize: '30px' }} />
            </button>
            <button onClick={handleNext}> <FaArrowRight style={{ fontSize: '30px' }} />
            </button>
          </div>
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeProductTrending;
