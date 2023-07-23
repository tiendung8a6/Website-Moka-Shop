import React, { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
export default function FrequentlyQuestion() {
    const [open, setOpen] = useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (

        <div className="mt-[150px]">
            <h1 className=' my-20 uppercase text-[35px] font-semibold text-[#1a3760] text-center  font-serif '> frequently questioned answers</h1>
            <div className=" lg:flex mx-[100px] gap-10  ">

                <div className="lg:flex-auto lg:w-[70%]">
                    <Fragment >
                        <Accordion
                            open={open === 1}
                            className="border border-blue-gray-100 px-4 rounded-lg mb-2 bg-[#E7EDE3]"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(1)}
                                className={`border-b-0 transition-colors text-black ${open === 1 ? "text-blue-500 hover:text-blue-700" : ""
                                    }`}
                            >
                                What are the latest fashion trends for the upcoming season?
                            </AccordionHeader>
                            <AccordionBody className="text-base font-normal pt-0">
                                The latest fashion trends for the upcoming season include oversized blazers, pastel colors, leather pieces, chunky sneakers, and statement accessories like large hoop earrings.
                            </AccordionBody>
                        </Accordion>

                        <Accordion
                            open={open === 2}
                            className="border border-blue-gray-100 px-4 rounded-lg mb-2 bg-[#E7EDE3]"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(2)}
                                className={`border-b-0 transition-colors text-black ${open === 2 ? "text-blue-500 hover:text-blue-700" : ""
                                    }`}
                            >
                                How can I create a stylish and versatile wardrobe on a budget?
                            </AccordionHeader>
                            <AccordionBody className="text-base font-normal pt-0">
                            To create a stylish and versatile wardrobe on a budget, focus on investing in timeless and classic pieces that can be mixed and matched. Look for high-quality basics like a white button-down shirt, well-fitted jeans, a little black dress, and neutral-colored blazers. You can then accessorize and layer these pieces to create various stylish outfits.
                            </AccordionBody>
                        </Accordion>

                        <Accordion
                            open={open === 3}
                            className="border border-blue-gray-100 px-4 rounded-lg bg-[#E7EDE3]"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(3)}
                                className={`border-b-0 transition-colors text-black ${open === 3 ? "text-blue-500 hover:text-blue-700" : ""
                                    }`}
                            >
                                What are some essential fashion pieces every woman should have in her closet?
                            </AccordionHeader>
                            <AccordionBody className="text-base font-normal pt-0">
                            Every woman's wardrobe should include essential fashion pieces such as a well-tailored blazer, a comfortable pair of jeans, a classic white shirt, a little black dress, versatile ballet flats or ankle boots, a stylish handbag, and a statement piece of jewelry like a necklace or a bracelet.
                            </AccordionBody>
                        </Accordion>

                        <Accordion
                            open={open === 4}
                            className="border border-blue-gray-100 px-4 rounded-lg bg-[#E7EDE3] mt-[10px]"
                        >
                            <AccordionHeader
                                onClick={() => handleOpen(4)}
                                className={`border-b-0 transition-colors text-black ${open === 4 ? "text-blue-500 hover:text-blue-700" : ""
                                    }`}
                            >
                                How can I accessorize my outfit to elevate its overall look?
                            </AccordionHeader>
                            <AccordionBody className="text-base font-normal pt-0">
                            Accessorizing can elevate your outfit's overall look. Try adding a statement necklace or a colorful scarf to draw attention to your neckline. Belts can define your waist and add a touch of style to dresses and oversized tops. Layering bracelets and rings can add a trendy and chic vibe to your ensemble. Lastly, don't forget the power of a stylish handbag and the right pair of shoes to complete your look.
                            </AccordionBody>
                        </Accordion>

                    </Fragment>
                </div>

                <div className="lg:flex-auto lg:w-[30%] md:w-full  h-[full] bg-[#272727] rounded-lg rounded-tr-3xl text-white sm:mt-[20px] lg:mt-[0] ">
                    <div className="lg:p-[50px 50px 50px 0]  sm:p-[20px]">
                        <img src="https://cms-cdn.placeholder.co/Group_1444_41c0a27ae4.svg?width=3840" alt="" srcset="" />
                        <span className=" font-semibold text-2xl ">Still have <span className="text-orange-500">question?</span></span> <br /> <br></br>
                        <span>
                            Email us at <Link to='/form' className="text-blue-500">KinRanx@gmail.com</Link> <br />
                            and tell us how we can help.
                        </span>
                    </div>
                </div>
            </div>
        </div>

    );
}
