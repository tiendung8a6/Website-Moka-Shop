
import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
    Carousel,
    Select, Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';

export default function PopupShopping(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const { data } = props;
    const handleClick = () => {
        // Cuộn lên đầu trang khi nhấp vào liên kết
        window.scrollTo(0, 0);
      };
    return (
        <React.Fragment>
            <Button onClick={handleOpen} className="hover:bg-blue-gray-500 mt-[10px]">Detail Product</Button>
            <Dialog size="lg" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <Typography variant="h5" color="blue-gray">
                        DETAIL PRODUCT
                    </Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <XMarkIcon strokeWidth={2} className="h-5 w-5" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="overflow-y-scroll pr-2">
                    <div className="mb-6 ">
                        <Typography

                            color="black"
                            className="font-semibold text-center text-xl mb-10"
                        >
                            {data.name}
                        </Typography>

                        <Typography
                            variant="small"
                            color="black"
                            className=" grid lg:grid-cols-2  sm:grid-cols-1"
                        >
                            <Carousel className="rounded-xl h-[300px] w-[300px] lg:ml-[5%]">
                                {data.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                ))}
                            </Carousel>

                            <div className="lg:-ml-[50px]">
                                <span className="mt-[20px]">
                                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(data.price)}

                                </span>
                                <br />

                                <span>
                                    {data.brand}
                                </span>
                                <br />

                                <span className="mt-[20px] flex">

                                    <Select label="Select sizes available" className="">

                                        {data.sizes.map((size) => (
                                            <Option key={size}>{size}</Option>
                                        ))}
                                    </Select>
                                </span>
                                <br />
                                <span className="mt-[20px]">
                                    <Select label="Select colors available">

                                        {data.colors.map((size) => (
                                            <Option key={size}>{size}</Option>
                                        ))}
                                    </Select>
                                </span>
                                <br />

                                <span className="mt-[20px] text-center">
                                    {data.description}<br />
                                </span>
                                <br />


                                <Button variant="filled">
                                    <Link onClick={handleClick}  to={`/products/${data._id}`}>
                                        View Full detail
                                    </Link>
                                </Button>
                            </div>

                        </Typography>

                    </div>

                </DialogBody>
                <DialogFooter className="justify-between gap-2 border-t border-blue-gray-50">
                    <Typography variant="small" color="gray" className="font-normal">
                        Product of Moka
                    </Typography>
                    <Link onClick={handleClick} to={'/form'}>
                        <Button variant="text" size="sm">
                            
                            Connect with us
                        </Button>
                    </Link>
                </DialogFooter>
            </Dialog>
        </React.Fragment>
    );
}