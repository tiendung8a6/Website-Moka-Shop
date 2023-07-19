import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carouselcategories.css";


const CarouselCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const { categories } = useSelector((state) => state?.categories);
  const categoriesToShow = categories?.categories;

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
  

  return (
    <div className=" flow-root">
      <div className="carousel-container">

        <div className="Header-carousel">
          
          <h1 id="category-heading" className='uppercase text-[35px] font-semibold text-[#1a3760] text-center mt-10 font-serif '>
          Shop by Category</h1>

          <Link
            to="/all-categories"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <Slider ref={sliderRef} {...settings} className="custom-carousel">
          {categoriesToShow?.map((category) => (
            <div key={category.name} className="categories-item">
              <Link
                to={`/products-filters?category=${category.name}`}
                className="category-link category-border"
              >
                <div className="category-image">
                  <img
                    src={category.image}
                    alt={category.name}
                  />
                </div>
                <div className="category-details">
                  <div className="category-name uppercase pt-5">{category.name}</div>
                  <div className="category-products pt-5">{category.products.length} products</div>
                </div>
                
              </Link>
            </div>
          ))}
        </Slider>
        <div className="carousel-buttons">
          <button className="carousel-button-left" onClick={handlePrev}><FaArrowLeft style={{ fontSize: '30px' }} /></button>
          <button className="carousel-button-right" onClick={handleNext}><FaArrowRight style={{ fontSize: '30px' }} /></button>
        </div>
      </div>
    </div>
  );
};

export default CarouselCategories;
