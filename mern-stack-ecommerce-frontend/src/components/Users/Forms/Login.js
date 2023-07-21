import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { NavLink, Link, Outlet } from "react-router-dom";

// config interface
import './FormLogin.css'
// import ImgFomSignin from "./ImgForm/FormSignin.svg"
import ImgFomSignin from "./ImgForm/Beige Simple Fashion Poster.png"
import ModelJiooDior from "./ImgForm/JisooDiorRB.png";
import ButtonLogin0ut from "./ButtonLogin-out/ButtonLogin0ut";
import ForgotPass from "./ForgotPass/ForgotPass";

const Login = () => {
  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "12345",
  });
  //---Destructuring---
  const { email, password } = formData;
  //---onchange handler----
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //---onsubmit handler----
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  //get data from store
  const { error, loading, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  //redirect
  useEffect(() => {
    if (userInfo?.userFound) {
      window.location.href = "/";
    }
  }, [userInfo]);
  return (
    <>
      <section className="relative overflow-x-hidden h-[745px] bg-form-login  ">
        <div className="container px-4 mx-auto w-[50%] bg-[#fff] h-[75%] mt-[100px] rounded-3xl shadow-xl shadow-blue-500/50" >
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-3/6 px-4 mb-12 lg:mb-0">
              <div className="py-20 text-center">
                <h3 className="mb-8 text-xl md:text-4xl font-bold font-heading font-serif">
                  Login
                </h3>

                {/* errr */}
                {error && <ErrorMsg message={error?.message} />}
                {/* <p className="mb-10"></p> */}
                <form onSubmit={onSubmitHandler}>
                  <div className="relative ml-4 lg:my-5">
                    <span class="material-symbols-outlined absolute top-[20%] ">
                      account_circle
                    </span>

                    <input
                      name="email"
                      value={email}
                      onChange={onChangeHandler}
                      className="w-full mb-4 px-12 py-3 border-b border-black focus:outline-none "
                      type="email"
                    />
                  </div>
                  <div className="relative ml-4 lg:my-5">
                    <span class="material-symbols-outlined absolute top-[20%]">
                      lock
                    </span>
                    <input
                      name="password"
                      value={password}
                      onChange={onChangeHandler}
                      className="w-full mb-4 px-12 py-3 border-b border-black focus:outline-none "
                      type="password"
                    />
                  </div>

                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <button className=" mt-4  text-white font-bold font-heading rounded-md uppercase">

                      <ButtonLogin0ut>Login</ButtonLogin0ut>
                    </button>
                  )}

                </form>
                <div className="flex justify-around mt-10">
                  <div>
                    <ForgotPass></ForgotPass>
                  </div>

                  <div className="cursor-pointer text-md hover:scale-110 hover:underline hover:underline-offset-8">
                    <Link to='/register'> 
                     Don't Have Accout
                     </Link>

                  </div>
                </div>

              </div>
            </div>
            <div className="w-full lg:w-3/6 px-4 mb-12 lg:mb-0 lg:block md:hidden sm:hidden ">
              <img src={ModelJiooDior} className="w-[290px] ml-[50px]" ></img>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Login;
