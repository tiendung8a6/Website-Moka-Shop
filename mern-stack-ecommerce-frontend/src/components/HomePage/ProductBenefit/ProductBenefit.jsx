const ProductBenefit = () => {
    return (
        <div className="ml-[50px] mr-[50px]">
            <h1 className='uppercase text-[35px] font-semibold text-[#1a3760]  mt-10 font-serif my-10 '>
                Warranty Policy</h1>
            <div className="grid grid-cols-4 gap-10">
                <div className="group" >
                    {/* <img src="https://cms-cdn.placeholder.co/Mask_group_1_45c7fc13f4.svg?width=256" alt="" className="w-[100px] mx-auto " /> */}
                    <div className="rounded-full h-[100px] w-[100px] mx-auto bg-orange-800 group-hover:animate-bounce  relative "><span  className="font-bold absolute top-[-25px] text-center text-[50px]  h-[100px] w-[100px] mt-10 text-white "> 1 </span></div> 
                    <h1 className="text-center mt-[40px] font-semibold">We grow with you</h1>
                    <p className="text-center mt[15px]">Easily transition into a new space as your business grows.</p>
                </div>

                <div className="group"> 
                    <div className="rounded-full h-[100px] w-[100px] mx-auto bg-green-800 group-hover:animate-bounce  relative "><span  className="font-bold absolute top-[-25px] text-center text-[50px]  h-[100px] w-[100px] mt-10 text-white "> 2 </span></div> 
                    <h1 className="text-center mt-[40px] font-semibold">We grow with you</h1>
                    <p className="text-center mt[15px]">Easily transition into a new space as your business grows.</p>
                </div>

                <div className="group">
                    <div className="rounded-full h-[100px] w-[100px] mx-auto bg-cyan-800 group-hover:animate-bounce  relative "><span  className="font-bold absolute top-[-25px] text-center text-[50px]  h-[100px] w-[100px] mt-10 text-white "> 3 </span></div> 
                    <h1 className="text-center mt-[40px] font-semibold">We grow with you</h1>
                    <p className="text-center mt[15px]">Easily transition into a new space as your business grows.</p>
                </div>

                <div className="group">
                    <div className="rounded-full h-[100px] w-[100px] mx-auto bg-indigo-800 group-hover:animate-bounce  relative "><span  className="font-bold absolute top-[-25px] text-center text-[50px]  h-[100px] w-[100px] mt-10 text-white "> 4 </span></div> 
                    <h1 className="text-center mt-[40px] font-semibold">We grow with you</h1>
                    <p className="text-center mt[15px]">Easily transition into a new space as your business grows.</p>
                </div>


            </div>
        </div>
    );
}

export default ProductBenefit;