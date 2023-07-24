import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAction } from "../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

import { Square3Stack3DIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";

export default function SettingCustomer() {
    // Local state to store current password, new password, and error message
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);



    // Redux store
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.users);

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset error message
        setErrorMessage("");

        // Mark the form as submitted
        setSubmitted(true);
        // console.log(setSubmitted);
        // Check if the currentPassword and newPassword fields are not empty
        if (currentPassword.trim() === "" || newPassword.trim() === "") {
            // If any of the fields is empty, don't dispatch the changePasswordAction
            return;
        }

        // Dispatch the changePasswordAction with currentPassword and newPassword
        dispatch(changePasswordAction({ currentPassword, newPassword }))
            .unwrap()
            .then((response) => {
                window.alert("Password reset successfull");
            })
            .catch((error) => {
                // Password change failed, update the error message
                window.NavigationPreloadManager()
                setErrorMessage(error.message);
                // window.location.reload()
            });
    };

    return (
        <div className=' bg-profileuser-Cp mt-[-10px] h-[600px] ' >
            <div className="flex justify-center items-center  ">
                <Card color="transparent" shadow={false} className="relative mt-[5%]  p-10 rounded-3xl bg-white w-[450px]">
                    <Typography variant="h4" color="blue-gray">
                        Change Password
                    </Typography>

                    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                        <div className="mb-4 flex flex-col gap-6">
                            <Input
                                size="lg"
                                label="Current Password"
                                //   type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <Input
                                size="lg"
                                label="New Password"
                                //   type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <Checkbox
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    Hide Password
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />
                        <Button type="submit" className="mt-6" fullWidth>
                            {loading ? <LoadingComponent /> : "Change password"}
                        </Button>
                        {submitted && (currentPassword.trim() === "" || newPassword.trim() === "") && (
                            <ErrorMsg message="Please enter both current and new passwords." />
                        )}
                        {submitted && errorMessage && <ErrorMsg message={errorMessage} />}
                        {submitted && error && <ErrorMsg message={error?.message} />}
                    </form>
                </Card>
            </div>

        </div>

    );
}
