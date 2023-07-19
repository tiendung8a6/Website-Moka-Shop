import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
import "./carousel_card_cus.css";
const items = [
  {
    // copy = content
    img: "https://i.pinimg.com/736x/48/0d/59/480d5961b9fe34fb1df2a6cfac81bbcd.jpg",
    name: "Chaeng",
    day: "13/11/2022",
    copy: "I love the style and quality of the clothing. The fabric is so soft and comfortable to wear.", 
    
  },
  {
    
    img: "https://i.pinimg.com/564x/98/e0/4b/98e04bebba74ba1ac2c0ca14979d5c8d.jpg",
    name: "Rose",
    day: "13/11/2022",
    copy: "The clothes fit perfectly and the designs are trendy. I've received many compliments while wearing them",
  },
  {
    
    img: "https://i.pinimg.com/564x/73/bc/d0/73bcd06b3727bb0be68ee4b29ce2cca5.jpg",
    name: "Jennie",
    day: "22/11/2022",

    copy: "The clothing line is amazing! The attention to detail and unique patterns make these clothes stand out from the rest.",
  },
  {
    
    img: "https://i.pinimg.com/564x/71/b1/ee/71b1ee1b52860350aa2e785f2d6ac79b.jpg",
    name: "Jisoo",
    day: "22/01/2022",

    copy: "I'm impressed with the durability of the clothes. They hold up well even after multiple washes.",
  },
  {
    
    img: "https://i.pinimg.com/564x/09/c6/27/09c62710757c72b37da2b53c9004b156.jpg",
    name: "Lalisa",
    day: "18/01/2023",

    copy: "These clothes are perfect for any occasion. Whether it's a casual outing or a formal event, they make me look and feel great.",
  },
  {
    img: "https://i.pinimg.com/564x/a9/37/44/a9374473e6019890be1f824f3f460ca3.jpg",
    name: "Ethan",
    day: "30/1/2023",
    copy: "The clothing brand offers a wide range of options for different body types. It's inclusive and makes everyone feel confident.",
  },
];

const Card = (props) => {
  return (
    <>
    
    <li className="card-ccc">
      {/* <span className="material-icons">{props.icon}</span> */}
      <img src={props.img} alt="" srcset="" className="h-[100px] w-[100px] rounded-full mx-auto" />
      <h3 className="my-2">{props.name}</h3>
      <span className="text-gray-400">{props.day}</span>
      <p>{props.copy}</p>
    </li>
    </>
  );
};

 const CarouselCardCustomer = () => {
  const [moveClass, setMoveClass] = useState("");
  const [carouselItems, setCarouselItems] = useState(items);

  useEffect(() => {
    document.documentElement.style.setProperty("--num", carouselItems.length);
  }, [carouselItems]);

  const handleAnimationEnd = () => {
    if (moveClass === "prev") {
      shiftNext([...carouselItems]);
    } else if (moveClass === "next") {
      shiftPrev([...carouselItems]);
    }
    setMoveClass("");
  };

  const shiftPrev = (copy) => {
    let lastcard = copy.pop();
    copy.splice(0, 0, lastcard);
    setCarouselItems(copy);
  };

  const shiftNext = (copy) => {
    let firstcard = copy.shift();
    copy.splice(copy.length, 0, firstcard);
    setCarouselItems(copy);
  };

  return (
    <div>
       <h1 className='uppercase text-[35px] font-semibold text-[#1a3760] text-center mt-10 font-serif '> Customer's feedback</h1>
      <div className="carouselwrapper module-wrapper">
      <div className="ui">
        <button onClick={() => setMoveClass("next")} className="prev">
          <span className="material-icons">chevron_left</span>
        </button>
        <button onClick={() => setMoveClass("prev")} className="next">
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      <ul
        onAnimationEnd={handleAnimationEnd}
        className={`${moveClass} CarouselCardCustomer`}
      >
        {carouselItems.map((t, index) => (
          <Card key={t.copy + index} img={t.img} name={t.name} day={t.day} copy={t.copy} />
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CarouselCardCustomer