import Shoe1 from "./ImgPFuture/Shoe1.png";
import shoe1_1 from "./ImgPFuture/shoe1_1.png";
import shoe2 from "./ImgPFuture/shoe2.png";
import shoe2_1 from "./ImgPFuture/shoe2_1.png";
import shoe3 from "./ImgPFuture/shoe3.png";
import shoe3_1 from "./ImgPFuture/shoe3_1.png";
import shoe4 from "./ImgPFuture/shoe4.png";
import shoe4_1 from "./ImgPFuture/shoe4_1.png";
import shoe5 from "./ImgPFuture/shoe5.png";
import shoe5_1 from "./ImgPFuture/shoe5_1.png";
import shoe6 from "./ImgPFuture/shoe6.png";
import shoe6_1 from "./ImgPFuture/shoe6_1.png";

const ProductFuture = () => {

    const ImgProductFuture = [
        {

            header: 'Coming Soon',
            tag: 'Coming Soon',
            namePF: 'B33 Sneaker',
            imgPF: Shoe1,
            imgPF2: shoe1_1,
            priceExpected: 30000000,
            desc: 'Navy Blue Dior Oblique Jacquard and Suede',
        },
        {
            header: 'Coming Soon',
            tag: 'Coming Soon',
            namePF: 'B33 Sneaker',
            imgPF: shoe2,
            imgPF2: shoe2_1,
            priceExpected: 20000000,
            desc: 'Navy Blue Dior Oblique Jacquard and Suede',
        },
        {
            header: 'Coming Soon',
            tag: 'Coming Soon',
            namePF: 'B33 Sneaker',
            imgPF: shoe3,
            imgPF2: shoe3_1,
            priceExpected: 15000000,
            desc: 'Navy Blue Dior Oblique Jacquard and Suede',

        },
        {
            header: 'Coming Soon',
            tag: 'Coming Soon',
            namePF: 'B33 Sneaker',
            imgPF: shoe4,
            imgPF2: shoe4_1,
            priceExpected: 25000000,
            desc: 'Navy Blue Dior Oblique Jacquard and Suede',

        },
        {
            header: 'Coming Soon',
            tag: 'Coming Soon',
            namePF: 'B33 Sneaker',
            imgPF: shoe5,
            imgPF2: shoe5_1,
            priceExpected: 18000000,
            desc: 'Navy Blue Dior Oblique Jacquard and Suede',

        },
        {
            header: 'Coming Soon',
            tag: 'Coming Soon',
            namePF: 'B33 Sneaker',
            imgPF: shoe6,
            imgPF2: shoe6_1,
            priceExpected: 22000000,
            desc: 'Navy Blue Dior Oblique Jacquard and Suede',

        },
    ];

    return (

        <>
            <h1 id="favorites-heading" className='mb-10 uppercase text-[35px] font-semibold text-[#1a3760] text-center mt-10 font-serif '>
                Trending Products
            </h1>
            <div className="grid grid-cols-3 place-items-center gap-y-10 overflow-hidden">
                {ImgProductFuture.map((product, index) => (
                    <div key={index} className="group overflow-hidden">
                        <div className="relative w-[400px] h-[400px]  ">
                            <div className="z-10 absolute top-5 left-2  text-[#757575] font-thin font-serif group-hover:text-[#000] ">

                                {/* <span className=""> {product.header}</span> */}

                            </div>
                            <div className="z-10 absolute top-0 right-[-50px] bg-[#e35353] w-[280px] rotate-[45deg] text-[#fff] font-thin font-serif group-hover:text-[#000]">
                                <span className="mx-[150px]">{product.tag}</span>
                            </div>
                            <img
                                src={product.imgPF}
                                alt={`Product ${index + 1}`}
                                className="absolute inset-0 w-[120%] h-full transition-opacity duration-300 hover:opacity-0"
                            />
                            <img
                                src={product.imgPF2}
                                alt={`Product ${index + 1}`}
                                className="absolute inset-0 w-full h-full transition-opacity duration-300 opacity-0 hover:opacity-100"
                            />
                        </div>
                        <p className=" text-[#000] font-thin font-serif">Price Expected: {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.priceExpected)}</p>
                        <p className=" text-[#757575] font-thin font-serif text-sm">{product.namePF}</p>

                        <p className=" text-[#757575] font-thin font-serif text-sm opacity-0 group-hover:opacity-100    ">{product.desc}</p>



                    </div>
                ))}
            </div>
        </>

    );
}

export default ProductFuture;
