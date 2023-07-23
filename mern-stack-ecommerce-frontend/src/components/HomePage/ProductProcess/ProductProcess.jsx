import Customer from '../ImgBanner/Support_Customer.png'

const ProductProcess = () => {
    return (
        <div className='my-[70px]'>
            <h1 className=' mt-20 uppercase text-[35px] font-semibold text-[#1a3760] text-center  font-serif '> How Moka Word</h1>
            <div className="grid lg:grid-cols-2 justify-between mx-[100px] gap-10 ">

                <div>

                   

                    <div className="flex mt-[30px] ">
                        {/* icon and conutent  */}
                        <div className='my-auto '>
                            <img src="https://cms-cdn.placeholder.co/icon_2_f4574751e6.png?width=128" alt="" srcset="" />

                        </div>
                        <div className=' ml-5'>
                            <p className='font-semibold text-xl'> Search</p>
                            <p>Enter your location and filter results based on size, price, and other criteria. New listings are added daily.</p>
                        </div>


                    </div>

                    <div className="flex mt-[30px] ">
                        {/* icon and conutent  */}
                        <div className='my-auto '>
                            <img src="https://cms-cdn.placeholder.co/icon1112_90b3da6b15.svg?width=128" alt="" srcset="" />

                        </div>
                        <div className=' ml-5'>
                            <p className='font-semibold text-xl'> Visit</p>
                            <p>You can come and see me at my office or production facility to visit us</p>
                        </div>


                    </div>

                    <div className="flex mt-[30px]">
                        {/* icon and conutent  */}
                        <div className='my-auto '>
                            <img src="https://cms-cdn.placeholder.co/icon4_812ad93d88.svg?width=128" alt="" srcset="" />

                        </div>
                        <div className=' ml-5'>
                            <p className='font-semibold text-xl'> Sign</p>
                            <p>Sign your rental agreement and you're ready to move in.</p>
                        </div>


                    </div>


                </div>

                <div className="h-[250px] w-[570px] bg-[#272727] flex mx-auto my-auto text-white">
                    <img src={Customer} alt="Take care customer" className='w-[170px] h-[190px]' />
                    <div className='mt-[20px]'>
                        <p className='text-2xl font-semibold'>
                            Your are not alone
                        </p>
                        <br />
                        <p>
                            We know you're busy. <br />
                            Let us know how we can help.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductProcess;