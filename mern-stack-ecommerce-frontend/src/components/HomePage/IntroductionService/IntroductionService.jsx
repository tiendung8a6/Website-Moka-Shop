import React from 'react';
import ConfigIntroSer from './ConfigIntroSer';
import ProductSearch from '../ProductSearch/ProductSeach';

const IntroductionService = () => {
  const data = [
    {
      label: 'Our Service',
      number: '100+',
      duration: '1',
    },
    {
      label: 'Branches in countries',
      number: '1999 +',
      duration: '1',
    },
    {
      label: 'Positive Feedback',
      number: '99 %',
      duration: '1',
    },
    {
      label: 'Khách Hàng thân thiết',
      number: '9999',

      duration: '2',
    },
  ];

  return (

    <div className='grid lg:grid-cols-2 md:grid-cols-1 gap-10 mx-[200px] my-[100px]'>
      <div className='mx-auto' >
        <h1 className='uppercase   text-[35px] font-serif font-semibold text-[#1a3760]'>Hundreds of products are <span className=''>perfected every day</span> </h1>
        <div className='text-gray-400 mt-10'>
          <ProductSearch> </ProductSearch>
          
        </div>
      </div>

      <div className='grid lg:grid-cols-2 md:grid-cols-1  mx-auto rounded-3xl shadow-2xl shadow-black-500'>
        <div className="hover:bg-[#eda9f2] hover:animate-spin  hover:scale-110 hover:border-none p-[35px]  border-r-[1px] border-b-[1px] border-black-400 ">
          <ConfigIntroSer data={data[0]} />

        </div>

        <div className=" hover:transform-gpu hover:animate-spin   hover:bg-[#eda9f2] hover:scale-110 hover:border-none p-[35px] border-b-[1px] border-black-400">
          <ConfigIntroSer data={data[1]} />
        </div>

        <div className="hover:bg-[#eda9f2] hover:animate-spin  hover:scale-110 hover:border-none p-[35px] border-r-[1px] border-black-400">
          <ConfigIntroSer data={data[2]} />
        </div>

        <div className="hover:bg-[#eda9f2] hover:animate-spin  hover:scale-110 hover:border-none p-[35px] ">
          <ConfigIntroSer data={data[3]} />
        </div>
      </div>
    </div>

  );
};

export default IntroductionService;

