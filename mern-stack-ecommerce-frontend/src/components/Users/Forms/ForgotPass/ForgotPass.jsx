import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../../../redux/slices/users/usersSlice";
import ErrorMsg from "../../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../../LoadingComp/LoadingComponent";
import Swal from 'sweetalert2';

// config interface
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";

export default function ForgotPass() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.users);

    const handleSendPasswordReset = () => {
        // Dispatch the forgotPasswordAction with the entered email
        dispatch(forgotPasswordAction({ email }))
            .then((data) => {
                // Action hoàn thành thành công, hiển thị thông báo
                window.alert("Password reset link has been sent to your email");
            })
            .catch((error) => {
                console.log(error);
                window.alert("Something went wrong!");
            });
    };

    // Reset the email field when the dialog is opened
    useEffect(() => {
        if (open) {
            setEmail("");
        }
    }, [open]);

    return (
        <React.Fragment>
            <div className="cursor-pointer text-md hover:scale-110 hover:underline hover:underline-offset-8" onClick={handleOpen}>Forgot Password</div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Forgot Password
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Input
                            label="Email"
                            size="lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <ErrorMsg message={error.message} />} {/* Show error message if available */}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            onClick={handleSendPasswordReset}
                            fullWidth
                            disabled={loading} // Disable the button when the action is ongoing
                        >
                            {loading ? (
                                <LoadingComponent size={24} color="white" /> // Show loading spinner if the action is ongoing
                            ) : (
                                "Send"
                            )}
                        </Button>
                        <Typography variant="small" className="mt-6 flex justify-center">
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue"
                                className="ml-1 font-bold"
                                onClick={handleOpen}
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </Dialog>
        </React.Fragment>
    );
}