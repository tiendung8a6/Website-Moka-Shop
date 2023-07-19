import React from 'react';

const AboutUs = () => {
    const dataAboutUs = [
        {
            "header": "Establishment Date ",
            "content": "We established our clothing website in 2018. Since our inception, we have been committed to providing our customers with exceptional fashion shopping experiences."
        },
        {
            "header": "Product Message ",
            "content": "At our clothing website, we believe that everyone has the right to feel confident and express their personal style. That's why we offer a diverse collection of fashionable clothes that cater to various preferences. We believe that anyone can find their favorite pieces and shine on any occasion."
        },
        {
            "header": "Product Warranty",
            "content": "We stand behind the quality of our products. All items are carefully selected from reputable manufacturers, and we inspect each product before it goes on sale. If there are any issues with a product, we will assist you through the warranty process to ensure your satisfaction and trust."
        },
        {
            "header": "Our Development ",
            "content": "Since our establishment in [establishment year], we have continuously grown and expanded our business network. Thanks to the dedication and passion of our team, we have built a respected customer community and served thousands of customers nationwide. This growth motivates us to constantly improve for everyone."
        },
        {
            "header": "Product Quality",
            "content": "Quality is one of our top priorities. We use premium materials and employ rigorous manufacturing processes to ensure that each product meets the highest standards. We aim to create fashion items that not only look great but also provide comfort and durability, allowing you to enjoy them for a long time."
        },
        {
            "header": "Customer Service Commitment",
            "content": "At our company, customer service is our top priority. Our support team is always ready to listen and address any inquiries, concerns, or feedback from customers. We are committed to providing professional, friendly, and prompt service."
        }
    ];

    return (
        <div >
            <h1 className='uppercase text-[35px] font-semibold text-[#1a3760] text-center mt-10 font-serif '> About US</h1>
            <div className=' grid lg:grid-cols-3 gap-10 mx-[150px] my-[40px]'>
                {/* block 1 */}
                <div className='lg:h-[800px]  '>
                    <div className='lg:animate-bounce lg:hover:animate-none lg:h-[35%] lg:mt-[30px] bg-[#d1fae5] rounded-2xl lg:px-4 lg:transform lg:transition-transform lg:duration-300  lg:hover:bg-white lg:hover:shadow-md hover:shadow-gray-400' >
                        <h3 className='lg:pt-[40px] lg:text-2xl font-semibold text-[#1a3760;] lg:text-center  '>{dataAboutUs[0].header}</h3>
                        <p className='lg:mt-2 lg:text-justify text-gray-500  '>{dataAboutUs[0].content}</p>
                    </div>
                    <div className='lg:h-[10%]'></div>
                    <div className='lg:h-[50%] bg-[#f4eefa] rounded-2xl lg:px-4 lg:transition-transform lg:duration-300 lg:hover:-translate-y-2 lg:hover:bg-white lg:hover:shadow-md hover:shadow-gray-400' >
                        <h3 className='lg:pt-[40px] lg:text-2xl font-semibold text-[#1a3760;] lg:text-center  '>{dataAboutUs[1].header}</h3>
                        <p className='lg:mt-2 lg:text-justify text-gray-500  '>{dataAboutUs[1].content}</p>
                    </div>
                </div>
                {/* block 2 */}

                <div className='lg:h-[800px]'>
                    <div className='lg:h-[50%]  bg-[#fce7f3] rounded-2xl lg:px-4 lg:transition-transform lg:duration-300 lg:hover:-translate-y-2 lg:hover:bg-white lg:hover:shadow-md hover:shadow-gray-400'>
                        <h3 className='lg:pt-[40px] lg:text-2xl font-semibold text-[#1a3760;] lg:text-center  '>{dataAboutUs[2].header}</h3>
                        <p className='lg:mt-2 lg:text-justify text-gray-500  '>{dataAboutUs[2].content}</p>
                    </div>
                    <div className='lg:h-[10%]'></div>
                    <div className='lg:h-[45%] bg-[#f5f1cd] rounded-2xl lg:px-4 lg:transition-transform lg:duration-300 lg:hover:-translate-y-2 lg:hover:bg-white lg:hover:shadow-md hover:shadow-gray-400' >
                        <h3 className='lg:pt-[40px] lg:text-2xl font-semibold text-[#1a3760;] lg:text-center  '>{dataAboutUs[3].header}</h3>
                        <p className='lg:mt-2 lg:text-justify text-gray-500  '>{dataAboutUs[3].content}</p>
                    </div>
                </div>
                {/* block 3 */}


                <div className='lg:h-[800px]'>
                    <div className='lg:h-[35%] lg:mt-[35px] bg-[#cffafe] rounded-2xl lg:px-4 lg:transition-transform lg:duration-300 lg:animate-bounce lg:hover:animate-none lg:hover:bg-white lg:hover:shadow-md hover:shadow-gray-400'>
                        <h3 className='lg:pt-[40px] lg:text-2xl font-semibold text-[#1a3760;] lg:text-center  '>{dataAboutUs[4].header}</h3>
                        <p className='lg:mt-2 lg:text-justify text-gray-500  '>{dataAboutUs[4].content}</p>
                    </div>
                    <div className='lg:h-[10%]'></div>
                    <div className='lg:h-[50%] bg-[#e2e8f0] rounded-2xl lg:px-4 lg:transition-transform lg:duration-300 lg:hover:-translate-y-2 lg:hover:bg-white lg:hover:shadow-md hover:shadow-gray-400' >
                        <h3 className='lg:pt-[40px] lg:text-2xl font-semibold text-[#1a3760;] lg:text-center  '>{dataAboutUs[5].header}</h3>
                        <p className='lg:mt-2 lg:text-justify text-gray-500  '>{dataAboutUs[5].content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
