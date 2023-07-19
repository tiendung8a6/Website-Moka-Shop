import { useState } from 'react';

const ImageSlider = () => {
  const images = [
    'https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9jyeynlFwVGBRreQHauSuqrkhoKGk7ytIw8OpgZbNA&s',
    'https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9jyeynlFwVGBRreQHauSuqrkhoKGk7ytIw8OpgZbNA&s',
    'https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9jyeynlFwVGBRreQHauSuqrkhoKGk7ytIw8OpgZbNA&s',
    'https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg',
    'https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg',
    'https://webaffiliatevn.com/wp-content/uploads/2020/08/IMGLOGO_Primary_CMYK_Blue_Rel_webready.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const setCurrent = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container mx-auto my-10 h-4/5 w-4/5 shadow-md">
      <div className="main h-5/6 relative">
        <span
          className="control prev absolute top-1/2 transform -translate-y-1/2 text-6xl text-white cursor-pointer left-2"
          onClick={goToPrev}
        >
          <i className="bx bx-chevron-left"></i>
        </span>
        <span
          className="control next absolute top-1/2 transform -translate-y-1/2 text-6xl text-white cursor-pointer right-2"
          onClick={goToNext}
        >
          <i className="bx bx-chevron-right"></i>
        </span>
        <div className="img-wrap h-full">
          <img 
            src={images[currentIndex]}
            alt=""
            className="w-[1000px] h-[500px] object-cover object-center"
          />
        </div>
      </div>
      <div className="list-img flex">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 bg-gray-300 flex-1 ${
              currentIndex === index ? 'bg-red-500' : ''
            }`}
            onClick={() => setCurrent(index)}
          >
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
