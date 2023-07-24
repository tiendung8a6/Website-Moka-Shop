import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserShippingAddressAction } from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const UpdateAddressForm = () => {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [province, setProvince] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const loading = useSelector((state) => state.users.loading);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!firstName || !lastName || !address || !city || !postalCode || !province || !phone || !country) {
            setErrorMsg("Please fill out all required fields.");
            return;
        }
    
        try {
            const data = {
                firstName,
                lastName,
                address,
                city,
                postalCode,
                province,
                phone,
                country,
            };
    
            const updatedAddress = await dispatch(updateUserShippingAddressAction(data));
            setSuccessMsg('Shipping address updated successfully!');
        } catch (error) {
            setErrorMsg(error.message);
        }
    };

    return (
        <div className='bg-profileuser mt-[-10px] h-[650px]'>
            <div className="flex justify-center items-center">
                <Card color="transparent" shadow={false} className="relative mt-[5%] p-10 rounded-3xl bg-white w-[500px]">
                    <Typography variant="h4" color="blue-gray" className="text-center">
                        Change Shipping Address
                    </Typography>
                    <form className=" mx-auto mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 background" encType="multipart/form-data">
                        <div className="mb-4 flex flex-col gap-4">
                            <div className='flex justify-center gap-2 '>
                                <Input
                                    size="lg"
                                    type="text"
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required

                                />
                            </div>

                            


                            <div className='flex justify-center gap-2'>
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Postal Code"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                />
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Province"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex justify-center gap-2'>
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                                <Input
                                    size="lg"
                                    type="text"
                                    label="Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                />

                            </div>
                            <Input
                                className='  '
                                size="lg"
                                type="text"
                                label="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <Input
                                className=' '
                                size="lg"
                                type="text"
                                label="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <Button className="mt-6" fullWidth onClick={handleSubmit}>
                            {loading ? <LoadingComponent /> : "Change Shipping Address"}
                        </Button>

                        {successMsg && <SuccessMsg message={successMsg} />}
                        {errorMsg && <ErrorMsg message={errorMsg} />}
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default UpdateAddressForm;
