import React from "react";
import { Fragment, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { getCartItemsFromLocalStorageAction } from "../../redux/slices/cart/cartSlices";
import { logoutAction } from "../../redux/slices/users/usersSlice";
import { fetchCouponsAction } from "../../redux/slices/coupons/couponsSlice";
import './NavbarReal.css'
const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};

// const navListMenuItems = [
//   {
//     color: "blue",
//     icon: FlagIcon,
//     title: "About us",
//     description: "Learn about our story and our mission statement.",
//   },
//   {
//     color: "orange",
//     icon: ChatBubbleOvalLeftIcon,
//     title: "Press",
//     description: "News and writings, press releases, and resources",
//   },
//   {
//     color: "green",
//     icon: UsersIcon,
//     title: (
//       <div className="flex items-center gap-1">
//         Careers{" "}
//         <Chip
//           size="sm"
//           color="green"
//           variant="ghost"
//           value="We're hiring!"
//           className="capitalize"
//         />
//       </div>
//     ),
//     description: "We are always looking for talented people. Join us!",
//   },
//   {
//     color: "blue-gray",
//     icon: FolderIcon,
//     title: "Legal",
//     description: "All the stuff that we dan from legal made us add.",
//   },
//   {
//     color: "purple",
//     icon: RocketLaunchIcon,
//     title: "Products",
//     description: "Checkout our products that helps a startup running.",
//   },
//   {
//     color: "teal",
//     icon: FaceSmileIcon,
//     title: "Icons",
//     description: "Set of beautiful icons that you can use in your project.",
//   },
//   {
//     color: "cyan",
//     icon: PuzzlePieceIcon,
//     title: "UI Kits",
//     description: "High quality UI Kits helps you to 2x faster.",
//   },
//   {
//     color: "pink",
//     icon: GiftIcon,
//     title: "Open Source",
//     description: "List of all our open-source projects, it's all free.",
//   },
// ];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //get data from store
  const { categories } = useSelector((state) => state?.categories);
  const categoriesToDisplay = categories?.categories?.slice(0, 12);





  // const [isOpen, setIsOpen] = useState(false);

  // const handleTogglePopover = () => {
  //   setIsOpen(!isOpen);
  // };
  // const buttonRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (buttonRef.current && !buttonRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   }

  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, []);

  const renderItems = categoriesToDisplay?.map(
    (category) => {
      return (
        <Link
          key={category?._id}
          to={`/products-filters?category=${category?.name}`}
          className="text-base font-medium text-gray-900 hover:text-gray-700 dd-item-navbar"
          onClick={() => {
            window.location.href = `/products-filters?category=${category?.name}`;
          }}
        >
          <img src={category.image} alt={category.name} className="w-6 h-6" />
          <p className="capitalize">{category?.name}</p>
        </Link>

      );
    }
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Categories
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block hover:outline-none">
          <ul className="grid grid-cols-4 gap-y-2 hover:outline-none">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  //get coupons
  const { coupons, loading, error } = useSelector((state) => state?.coupons);
  //Get current coupon
  const currentCoupon = coupons
    ? coupons?.coupons?.[coupons?.coupons?.length - 1]
    : console.log(currentCoupon);
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 lg:ml-[190px]">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <CubeTransparentIcon className="h-[18px] w-[18px]" />
          <Link to="/#">
            Home
          </Link>
        </ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <UserCircleIcon className="h-[18px] w-[18px]" />
          <Link to="/form" >
            Contact US
          </Link>
        </ListItem>
      </Typography>

      {/* <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <UserCircleIcon className="h-[18px] w-[18px]" />
          Account
        </ListItem>
      </Typography> */}
    </List>
  );
}

export default function NavbarReal() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //get data from store
  const { categories } = useSelector((state) => state?.categories);
  const categoriesToDisplay = categories?.categories?.slice(0, 12);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //get data from store
  useEffect(() => {
    dispatch(getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  const { cartItems } = useSelector((state) => state?.carts);
  //get cart items from local storage
  let cartItemsFromLocalStorage;
  //get login user from localstorage

  const user = JSON.parse(localStorage.getItem("userInfo"));

  const isLoggedIn = user?.token ? true : false;
  //logout handler
  const logoutHandler = () => {
    dispatch(logoutAction());
    //reload
    window.location.reload();
  };
  //coupons
  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);
  //get coupons
  const { coupons, loading, error } = useSelector((state) => state?.coupons);
  //Get current coupon
  const currentCoupon = coupons
    ? coupons?.coupons?.[coupons?.coupons?.length - 1]
    : console.log(currentCoupon);

  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Successfully copied
        console.log('Copied to clipboard:', text);
      })
      .catch((error) => {
        console.error('Failed to copy to clipboard:', error);
      });
  }

  return (
    <>
    {coupons?.coupons && (
        <div className="bg-yellow-600 h-[55px] flex items-center">
          <div className="flex coupon-row">
            {coupons.coupons
              .filter(coupon => !coupon.isExpired)
              .map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex text-center text-sm font-medium text-white lg:flex-none px-5 py-3 bg-gray-400 mx-2 my-2 rounded-lg relative"
                  style={{ width: '' }}
                >
                  <p>{`${coupon.code} - ${coupon.discount}%  - ${coupon.daysLeft}`} </p>
                  <span
                    className="material-symbols-outlined ml-3 cursor-pointer"
                    onClick={() => handleCopyToClipboard(coupon.code)}
                  >
                   content_copy
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
      <Navbar className="w-full max-w-screen-3xl  px-[100px] py-2">

        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Material Tailwind
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>
          <div className="hidden gap-2 lg:flex">
            <div className=" w-aaa">

              <div className="flex items-center lg:ml-8">
                {user?.userFound?.isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <div className="flex space-x-8 mx-10 ">
                  {/* {user?.userFound?.isAdmin && (
                    <Link
                      to="/admin"
                      className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Admin Dashboard
                    </Link>
                  )} */}
                  {isLoggedIn && (
                    <div className="flex">
                      <Link
                        to="/customer-profile"
                        className="-m-2 p-2 mr-2 text-gray-400 hover:text-gray-500"
                      >
                        <UserIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Link>
                      {/* logout */}
                      <button onClick={logoutHandler}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>
                      </button>
                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />
                      {/* login shopping cart mobile */}
                      <div className="flow-root">
                        <Link
                          to="/shopping-cart"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {cartItems?.length > 0 ? cartItems?.length : 0}
                          </span>
                        </Link>
                      </div>
                    </div>

                  )}
                  {/* is not login */}
                  {!isLoggedIn && (
                    <div className="lg:mr-[100px]">
                      <Link
                        to="/register" variant="text" size="sm" color="blue-gray"
                        className="lg:mr-[20px]"

                      >
                        <Button variant="text" size="sm" color="blue-gray">
                          Sign In
                        </Button>
                      </Link>



                      <Link
                        to="/login"
                      // className="text-sm font-medium text-white hover:text-gray-100"
                      >
                        <Button variant="gradient" size="sm" className="hover:animate-pulse">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>


              </div>
            </div>


          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
              Sign In
            </Button>
            <Button variant="gradient" size="sm" fullWidth>
              Sign Up
            </Button>
          </div>
        </Collapse>

      </Navbar>
    </>

  );
}