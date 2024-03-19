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
import React, { useRef } from "react";
import { useDrawer } from "../context/DrawerContext";

const ProfileCard = React.forwardRef(({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [imageUploading, setImageUploading] = React.useState(false);
    const { user, setUser } = useDrawer();
    const fileInput = useRef(null);
    const handleOpen = () => setOpen((cur) => !cur);
    const handleUploadPic = () => {
        fileInput.current.click();
    }
    const ProfileImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileName = file?.name;
        if (!(fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png'))) {
            console.log('Only image files (jpg, jpeg, png) are allowed!');
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        const UploadFunction = async () => {
            try {
                setImageUploading(true);
                const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/upload`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    // Update user avatar in context
                    setUser({ ...user, avatar: data.user.avatar });
                    console.log('Image uploaded successfully:', data);
                } else {
                    console.error('Error uploading image:', data.message);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setImageUploading(false);
            }
        }
        UploadFunction();
    };
    return (
        <>
            <div onClick={handleOpen} ref={ref}>{children}</div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none flex justify-center"
            >
                <Card className="w-80 sm:w-96 py-3">
                    <CardHeader floated={false} className="sm:h-80 h-50 w-64 sm:w-80 shadow-md border border-gray-300 flex justify-center mx-auto ">
                        <img style={{ objectFit: 'cover' }} src={ user?.avatar || ProfileImage} alt="profile-picture" />
                    </CardHeader>

                    <CardBody className="text-center cursor-pointer">
                        <input name="image" multiple={false} className="h-0" ref={fileInput} type="file" accept="image/*" onChange={handleFileChange} />
                        <Button loading={imageUploading} color="blue" onClick={handleUploadPic} size="lg" variant="gradient" className="flex items-center justify-center -mt-8 mb-3 gap-3 w-full">
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
                </Card>
            </Dialog>
        </>
    );
})

export default ProfileCard;