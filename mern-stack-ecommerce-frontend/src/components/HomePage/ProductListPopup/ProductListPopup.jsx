import React, { useState, useEffect } from "react";

const ProductListPopup = () => {
  const productList = [
    { name: "Dior Klein Jeans", price: "100.000 Đ", img: "https://cdn.shopify.com/s/files/1/0155/2957/4454/products/09_0d699675-44e1-439a-a05e-dda7f34c8cf8.jpg?v=1651237631" },
    { name: "Cavin Klein Jeans", price: "300.000 Đ", img: "https://cdn.shopify.com/s/files/1/0155/2957/4454/products/09_0d699675-44e1-439a-a05e-dda7f34c8cf8.jpg?v=1651237631" },
    { name: "Adidas Tracksuit", price: "800.000 Đ ", img: "https://cdn.shopify.com/s/files/1/0155/2957/4454/products/09_0d699675-44e1-439a-a05e-dda7f34c8cf8.jpg?v=1651237631" },
  ];

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
            <div className="flex justify-between px-3 pb-3 pt-3"> 
              <img className="h-[90px] w-[70px] border" src={currentProduct.img} alt={currentProduct.name} />
              <div className="mt-5">
                <h3>{currentProduct.name}</h3>
                <p>{currentProduct.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListPopup;
