import React, { useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteAccountModal = React.forwardRef(({ children }, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [password, setPassword] = React.useState("");
    const [type, setType] = React.useState("password");
    const handleInputTypeChange = () => type === "password" ? setType('text') : setType('password');
    const [captcha, setCaptcha] = React.useState("123456");
    const [inputCaptcha, setInputCaptcha] = React.useState("")
    const [errorType, setErrorType] = React.useState("none")
    const navigate = useNavigate()

    const handleDeleteAccount = async (e) => {
        e.preventDefault()
        if (inputCaptcha !== captcha) {
            setInputCaptcha("")
            setErrorType('captchaError')
            setCaptcha(generateCaptcha(6));
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/deleteAccount`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (data?.success) {
                localStorage.removeItem("token");
                toast.success(data.message)
                handleOpen()
                navigate('/signin')
            } else {
                setErrorType('passError')
                console.log(data?.message)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPassword("");
            setInputCaptcha("")
            setCaptcha(generateCaptcha(6));
        }
    }
    function generateCaptcha(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let captcha = "";
        for (let i = 0; i < length; i++) {
            captcha += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return captcha;
    }
    useEffect(() => {
        setCaptcha(generateCaptcha(6));
        return () => {
            setPassword("");
            setInputCaptcha("")
            setType("password");
        };

    }, [])

    return (
        <>
            <div ref={ref} onClick={handleOpen}>{children}</div>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <form onSubmit={handleDeleteAccount}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h4" color="blue-gray">
                                Are you sure you want to delete your account?
                            </Typography>
                            <Typography
                                className="mb-3 font-normal"
                                variant="paragraph"
                                color="gray"
                            >
                                Enter your password to continue.
                            </Typography>
                            <Typography className="-mb-2" variant="h6">
                                Your Password
                            </Typography>
                            <Input label="Password" type={type} size="lg" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*******"
                                icon={<i onClick={handleInputTypeChange} className={`${type === "password" ? "fa-solid fa-eye cursor-pointer" : "fa-solid fa-eye-slash cursor-pointer"}`} />} required />
                            <p className={`text-sm text-red-900 ml-2 -mt-4 ${errorType === "passError" ? "block" : "hidden"}`}>Wrong Password...</p>
                            <div className="flex space-x-2 items-center">
                                <Input
                                    containerProps={{ className: "min-w-[0]" }}
                                    label="Captcha" type="text" value={inputCaptcha} onChange={(e) => setInputCaptcha(e.target.value)} minLength={6} maxLength={6}
                                    placeholder="Exact 6 length"
                                    required />
                                <p onClick={() => setCaptcha(generateCaptcha(6))} className="mr-4 cursor-pointer"><i className="fa-solid fa-rotate fa-lg"></i></p>
                                <div className="rounded-lg text-lg text-white bg-gradient-to-r from-purple-500 to-pink-500" style={{ border: "3px solid red", display: 'inline', width: '40%' }}>
                                    <span className=" p-2 inline-block tracking-widest">
                                        {captcha}
                                    </span>
                                </div>
                            </div>
                            <p className={`text-sm text-red-900 ml-2 -mt-4 ${errorType === "captchaError" ? "block" : "hidden"}`}>Wrong captcha...</p>
                        </CardBody>

                        <CardFooter className="pt-0 flex justify-end space-x-4">
                            <Button variant="filled" color="amber" onClick={handleOpen}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="gradient" >
                                Confirm
                            </Button>
                        </CardFooter>
                    </form>

                </Card>
            </Dialog>
        </>
    );
})

export default DeleteAccountModal;