import { Link } from "react-router-dom";
// import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending/HomeProductTrending";
import BannerHomePage from "./BannerHomePage/BannerHP";
import CarouselCategories from "./CarouselCategories/CarouselCategories";
import Form from "./Form/Form";
import VideoHp from "./VideoHP/VideoHp";
import ProductListPopup from './ProductListPopup/ProductListPopup'
import CarouselCardCustomer from "./CarouselCardCustomer/CarouselCardCutomer";
import MokaSpeedDial from "../SpeedDial/SpeedDial";
import Footer from "../Footer/Footer";
import NavbarReal from "../NavBarReal/NavBarReal";
import ProductSearch from "./ProductSearch/ProductSeach";
import ProductBenefit from "./ProductBenefit/ProductBenefit";
import ProductProcess from "./ProductProcess/ProductProcess";
import FrequentlyQuestion from "./FrequentlyQuestion/FrequentlyQuestion";
import IntroductionService from "./IntroductionService/IntroductionService";
import AboutUs from "./AboutUs/AboutUs";
import ImageSlider from "./SliderImg/SliderImg";
import ProductFuture from "./ProductFuture/ProductFuture";



// const offers = [
//   {
//     name: "Download the app",
//     description: "Get an exclusive $5 off code",
//     href: "#",
//   },
//   {
//     name: "Return when you're ready",
//     description: "60 days of free returns",
//     href: "#",
//   },
//   {
//     name: "Sign up for our newsletter",
//     description: "15% off your first order",
//     href: "#",
//   },
// ];

// const perks = [
//   {
//     name: "Free returns",
//     imageUrl:
//       "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
//     description:
//       "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
//   },
//   {
//     name: "Same day delivery",
//     imageUrl:
//       "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
//     description:
//       "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
//   },
//   {
//     name: "All year discount",
//     imageUrl:
//       "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
//     description:
//       'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
//   },
//   {
//     name: "For the planet",
//     imageUrl:
//       "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
//     description:
//       "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
//   },
// ];
export default function Example() {
  return (
    <div className="bg-white overflow-x-hidden">
      <main>
                {/* <NavbarReal></NavbarReal> */}
        {/* <ProductSearch></ProductSearch> */}
        {/* Hero */}

        {/* <ImageSlider></ImageSlider> */}
        <BannerHomePage></BannerHomePage>
        
        <IntroductionService></IntroductionService>
        <AboutUs></AboutUs>
      

      </main>
      <main>
        {/* Category section */}
        <CarouselCategories></CarouselCategories>
        {/* Home trending trending */}
        <HomeProductTrending />
        {/* info */}
        <FrequentlyQuestion></FrequentlyQuestion>


        <ProductProcess></ProductProcess>
        <ProductBenefit></ProductBenefit>
        <VideoHp></VideoHp>
        <ProductFuture></ProductFuture>
        <ProductListPopup></ProductListPopup>
        <CarouselCardCustomer />
        <MokaSpeedDial></MokaSpeedDial>
        <Footer />
      </main>
    </div>
  );
}