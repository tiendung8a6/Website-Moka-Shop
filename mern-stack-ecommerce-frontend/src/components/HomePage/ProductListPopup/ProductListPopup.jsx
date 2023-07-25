import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProductListPopup = () => {
  const productList = [
    {href:'/products/64bf96c6a610ecee77f6bcbc', name: "Áo Sơ Mi Nam Tay ...", price: "520.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690277573/image-api/wvkoopxrzagyxwzkjr4b.jpg" },
    {href:'/products/64bf9873a610ecee77f6bd52', name: "Áo Thun Tay Ngắn ...", price: "422.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690278002/image-api/a3zr76oy6ethakebm2ia.jpg" },
    {href:'/products/64bf9aa3a610ecee77f6bdea', name: "Áo Polo Nam Tay ...", price: "442.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690278561/image-api/cqsnuhac3zypgioxsqws.jpg" },
    {href:'/products/64bf9b34a610ecee77f6be22', name: "Áo Khoác Nam Cộc ...", price: "569.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690278707/image-api/n0ugxfbortz6r2twrebh.jpg" },
    {href:'/products/64bf9bada610ecee77f6be44', name: "Áo sơ mi tay ngắn...", price: "440.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690278828/image-api/t13cnliv81ca3ivntzai.jpg" },
    {href:'/products/64bf9d4ea610ecee77f6bf18', name: "Áo Thun Nam Tay...", price: "370.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690279243/image-api/fkb7kid9rkpsppxg6hgr.jpg" },
    {href:'/products/64bfa11ea610ecee77f6c00c', name: "Áo Polo Nam Tay ...", price: "540.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690280220/image-api/xzgmu05megmpe26gb0bz.jpg" },
    {href:'/products/64bfa0aba610ecee77f6bfea', name: "Áo Thun Nam Tay ...", price: "422.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690280106/image-api/pr3iz8lolt8e9yhjjqi7.jpg" },
    {href:'/products/64bfa168a610ecee77f6c02e', name: "Áo Sơ Mi Nam Tay ...", price: "520.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690280295/image-api/s7ytwqgllfqwdud5aadg.jpg" },
    {href:'/products/64bfa1dea610ecee77f6c050', name: "Áo Polo Nam Tay ...", price: "450.000 Đ", img: "https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690280412/image-api/bs9qlxgxfsikuxhdtsvq.jpg" },
  ];

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handdleReload =()=>{
    
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => {
        if (prevIndex === productList.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
      setIsPopupVisible(true);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentProduct = productList[currentProductIndex];

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="fixed bottom-10 left-10 z-50">
      
      <div className="content-container">
        {/* Your main content goes here */}
      </div>
      {isPopupVisible && (
        <div className="popup-overlay relative rounded-b-xl rounded-l-xl bg-white shadow-[0px_35px_60px_-15px_rgba(0,0,0,0.9)] w-[280px] ">
          <div className="popup-content">
            <button className="close-button absolute -right-2 -top-2 rounded-full bg-red-500 w-[30px] h-[30px]  " onClick={closePopup}>
              X
            </button>
            <Link to={currentProduct.href} onClick={handdleReload}>
            <div className="flex justify-between px-3 pb-3 pt-3"> 
              <img className="h-[90px] w-[70px] border" src={currentProduct.img} alt={currentProduct.name} />
              <div className="mt-5">
                <h3>{currentProduct.name}</h3>
                <p>{currentProduct.price}</p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPopup;
