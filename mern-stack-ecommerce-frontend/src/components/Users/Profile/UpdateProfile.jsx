// UpdateProfile.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Input, Button, Typography, Avatar } from "@material-tailwind/react";
import { updateUserAction } from "../../../redux/slices/users/usersSlice"; // Đảm bảo đường dẫn đến action updateUserAction là chính xác
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import imgFashionProfile from './Img-profile/bg-fashion-profile.jpg'
import './profileuser.css'

export default function UpdateProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newFullName, setNewFullName] = useState(user?.fullname || "");
    const [newEmail, setNewEmail] = useState(user?.email || "");
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleProfileUpdate = async () => {
        setErrorMsg("");
        setSuccessMsg("");

        try {
            await dispatch(
                updateUserAction({ fullname: newFullName, email: newEmail, image: selectedImage })
            );
            setSuccessMsg("Profile updated successfully!");
        } catch (error) {
            setErrorMsg(error.message);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file); // Update the selected image file
        const reader = new FileReader();

        // When the file is loaded, set the imagePreview state with the base64 data
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };

        // Read the selected image file as a data URL (base64-encoded)
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const { profile } = useSelector((state) => state?.users);
    return (
        <div className=' bg-profileuser mt-[-10px] h-[600px] ' >
            <div className="flex justify-center items-center  ">
                <Card color="transparent" shadow={false} className=" relative mt-[5%]  p-10 rounded-3xl bg-white w-[450px]">
                    {/* <Typography variant="h4" color="blue-gray">
                        Change Profile
                    </Typography> */}

                    {/* <img src={profile?.user?.image} alt="" /> */}
                    <Avatar src={profile?.user?.image} alt="avatar" size="xxl" className="mx-auto" />
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 background " encType="multipart/form-data">
                        <div className="mb-4 flex flex-col gap-6">


                            <Input
                                size="lg"
                                label="Full Name"
                                value={newFullName}
                                onChange={(e) => setNewFullName(e.target.value)}
                            />
                            <Input
                                size="lg"
                                label="Email"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                            <div className="flex ">
                                <input type="file" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="mt-2">
                                        {/* <img src={imagePreview} alt="Preview" className="max-w-full h-auto" /> */}
                                        <Avatar src={imagePreview} alt="Preview"  size="xl" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button className="mt-6" fullWidth onClick={handleProfileUpdate}>
                            {loading ? <LoadingComponent /> : "Change Profile"}
                        </Button>

                        {successMsg && <SuccessMsg message={successMsg} />}
                        {errorMsg && <ErrorMsg message={errorMsg} />}
                    </form>
                </Card>
            </div>
        </div>
    );
}
