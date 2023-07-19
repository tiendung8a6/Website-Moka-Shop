import React, { Fragment, useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

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
                How long are the rental terms?
            </AccordionHeader>
            <AccordionBody className="text-base font-normal pt-0">
                We're not always in the position that we want to be at.
                We're constantly growing. We're constantly making mistakes.
                We're constantly trying to express ourselves and actualize our dreams.
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
                What if I need my space back?
            </AccordionHeader>
            <AccordionBody className="text-base font-normal pt-0">
                We're not always in the position that we want to be at.
                We're constantly growing. We're constantly making mistakes.
                We're constantly trying to express ourselves and actualize our dreams.
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
                How do payments work?
            </AccordionHeader>
            <AccordionBody className="text-base font-normal pt-0">
                We're not always in the position that we want to be at.
                We're constantly growing. We're constantly making mistakes.
                We're constantly trying to express ourselves and actualize our dreams.
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
                How do payments work?
            </AccordionHeader>
            <AccordionBody className="text-base font-normal pt-0">
                We're not always in the position that we want to be at.
                We're constantly growing. We're constantly making mistakes.
                We're constantly trying to express ourselves and actualize our dreams.
            </AccordionBody>
        </Accordion>

    </Fragment>
</div>

<div className="lg:flex-auto lg:w-[30%] md:w-full  h-[full] bg-[#272727] rounded-lg rounded-tr-3xl text-white sm:mt-[20px] lg:mt-[0] ">
    <div className="lg:p-[50px 50px 50px 0]  sm:p-[20px]">
        <img src="https://cms-cdn.placeholder.co/Group_1444_41c0a27ae4.svg?width=3840" alt="" srcset="" />
        <span className=" font-semibold text-2xl ">Still have <span className="text-orange-500">question?</span></span> <br /> <br></br>
        <span>
            Email us at <span>Kinranx@gmail.com</span> <br />
            and tell us how we can help.
        </span>
    </div>
</div>
</div>
        </div>

    );
}
