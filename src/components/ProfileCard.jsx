import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Dialog,
    Button,
} from "@material-tailwind/react";
import React, { useEffect, useRef } from "react";
import { useDrawer } from "../context/DrawerContext";

const ProfileCard = React.forwardRef(({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const { user, setUser } = useDrawer();
    const fileInput = useRef(null);
    const handleOpen = () => setOpen((cur) => !cur);
    const handleUploadPic = () => fileInput.current.click();
    return (
        <>
            <div onClick={handleOpen} ref={ref}>{children}</div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="w-72 sm:w-96 mx-auto">
                    <CardHeader floated={false} className="h-80">
                        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="profile-picture" />
                    </CardHeader>
                    <CardBody className="text-center">
                        <input className="h-0" ref={fileInput} type="file" />
                        <Button color="blue" onClick={handleUploadPic} size="sm" fullWidth variant="gradient" className="flex items-center justify-center -mt-8 mb-3 gap-3 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5 -ml-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                />
                            </svg>
                            Upload Pic
                        </Button>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            {user?.username || "Tania Andrew"}
                        </Typography>
                        <Typography color="blue-gray" className="font-medium" textGradient>
                            {user?.email || "abc@email.com"}
                        </Typography>
                    </CardBody>
                    <CardFooter className="flex justify-center gap-7 pt-2">
                        <Tooltip content="Like">
                            <Typography
                                as="a"
                                href="#facebook"
                                variant="lead"
                                color="blue"
                                textGradient
                            >
                                <i className="fab fa-facebook" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography
                                as="a"
                                href="#twitter"
                                variant="lead"
                                color="light-blue"
                                textGradient
                            >
                                <i className="fab fa-twitter" />
                            </Typography>
                        </Tooltip>
                        <Tooltip content="Follow">
                            <Typography
                                as="a"
                                href="#instagram"
                                variant="lead"
                                color="purple"
                                textGradient
                            >
                                <i className="fab fa-instagram" />
                            </Typography>
                        </Tooltip>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
})

export default ProfileCard;