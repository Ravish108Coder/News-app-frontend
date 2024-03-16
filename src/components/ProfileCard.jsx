import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
    Dialog,
} from "@material-tailwind/react";
import React, { useEffect } from "react";

const ProfileCard = React.forwardRef(({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState({})
    useEffect(() => {
        const fetchProfile = async () => {
            try {
              const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/profile`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              });
              const data = await response.json();
              console.log(data)
              let newUser = {
                username: data?.data?.username,
                email: data?.data?.email,
              }
                setUser(newUser)
            } catch (error) {
              console.log(error);
            }
          }
          fetchProfile();
    }, [])
  const handleOpen = () => setOpen((cur) => !cur);
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