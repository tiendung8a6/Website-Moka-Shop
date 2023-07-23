import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Animated } from "react-animated-css";
import Banner2 from '../ImgBanner/1.png'
import Banner1 from '../ImgBanner/2.svg'
import Banner3 from '../ImgBanner/3.png'

import { Link } from "react-router-dom";


const BannerHomePage = () => {
  return (
    <Carousel className="">
      <div className="relative h-full w-full">
        <img
          src={Banner1}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/30">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >

              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                The Beauty of Nature
              </Animated>
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 animate__animated animate__bounce animate__delay-2s"
            >

              <Animated animationIn="rubberBand" animationOut="fadeOut" isVisible={true}>
                <div>
                  
                  Welcome to Moka Shop, your ultimate destination for all things fashion and style! At Moka Shop, we believe that fashion is not just about clothing; it's a way of life, a means of expressing your unique personality and embracing your individuality.
                </div>
              </Animated>
            </Typography>
            <div className="flex justify-center gap-2">
              <Button size="lg" color="white">
                <Link to="/products-filters">
                Buy Now
                </Link>
                
              </Button>
              <Button size="lg" color="white" variant="text">
                
                <Link to="/form">
                Contact us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={Banner2}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/30">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              <Animated animationIn="rubberBand" animationOut="fadeOut" isVisible={true}>
                <div>
                Whether you're dressing up for a special occasion, seeking everyday comfort, or looking to refresh your wardrobe with the latest trends, Moka Shop has got you covered. Our user-friendly website and intuitive navigation make shopping a breeze, while our attentive customer service team is always ready to assist you on your fashion journey.
                </div>
              </Animated>
            </Typography>
            <div className="flex gap-2">
            <Button size="lg" color="white">
                <Link to="/products-filters">
                Buy Now
                </Link>
                
              </Button>
              <Button size="lg" color="white" variant="text">
                
                <Link to="/form">
                Contact us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <img
          src={Banner3}
          alt="image 3"
          className="h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
          <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              The Beauty of Nature
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that
              quality of air that emanation from old trees, that so
              wonderfully changes and renews a weary spirit.
            </Typography>
            <div className="flex gap-2">
              <Button size="lg" color="white">
                Explore
              </Button>
              <Button size="lg" color="white" variant="text">
                Gallery
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </Carousel>
  );
}

export default BannerHomePage;


