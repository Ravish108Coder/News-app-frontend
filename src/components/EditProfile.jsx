import React, { useEffect } from "react";
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
import { toast } from "react-toastify";

const DialogBox = ({ open, setOpen, handleOpen, newProfile, setNewProfile, showPassword, setShowPassword, profileUpdadteBtnloading, setProfileUpdadteBtnloading }) => {
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
        if(data?.status){
          let newUser = {
            name: data?.data?.username,
            email: data?.data?.email,
          }
          setUser(newUser)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
    return () => {
      setNewProfile({
        name: "",
        email: "",
        password: "",
      });
      setProfileUpdadteBtnloading(false);
      setOpen(false);
    }
  }, [])
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log(newProfile)
    try {
      setProfileUpdadteBtnloading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProfile),
      });
      const data = await response.json();
      if (data?.status) {
        setProfileUpdadteBtnloading(false);
        setOpen(false);
        toast.success(data?.message || "Success Notification !");
      }else{
        toast.error(data?.message || "Something went wrong !");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong !");
    } finally {
      setProfileUpdadteBtnloading(false);
      setOpen(false);
    }
  }
  return (
    <Dialog
      onClick={(e) => e.stopPropagation()}
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
      <form onSubmit={handleUpdateProfile}>
        <CardBody className="flex flex-col gap-4">
          <Typography
            style={{ textAlign: 'center' }}
            className="mb-3 font-normal"
            variant="h4"
            color="orange"
          >
            Update Your Profile
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Your New Name
          </Typography>
          <Input disabled={profileUpdadteBtnloading} type="text" value={newProfile.name} onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} label="Name" placeholder={user?.name ||  "John Doe"} size="lg" required />
          <Typography className="-mb-2" variant="h6">
            Your New Email
          </Typography>
          <Input disabled={profileUpdadteBtnloading} type="email" value={newProfile.email} onChange={(e) => setNewProfile({ ...newProfile, email: e.target.value })} label="Email" size="lg" placeholder={user?.email ||  "abc@mail.com"} required />
          <Typography className="-mb-2" variant="h6">
            Your New Password
          </Typography>
          <Input
            disabled={profileUpdadteBtnloading}
            variant="outlined"
            label="Password"
            name="password"
            value={newProfile.password}
            type={showPassword ? "text" : "password"}
            icon={
              !showPassword ?
                <svg onClick={() => setShowPassword(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                :
                <svg onClick={() => setShowPassword(prev => !prev)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            }
            onChange={(e) => setNewProfile({ ...newProfile, password: e.target.value })}
            size="lg"
            placeholder="********"
            required={true}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" loading={profileUpdadteBtnloading} variant="gradient" fullWidth>
            Update Profile
          </Button>
          <Button disabled={profileUpdadteBtnloading} className="mt-4" variant="outlined" color="red" onClick={handleOpen} fullWidth>
            Cancel
          </Button>

        </CardFooter>
            </form>
      </Card>
    </Dialog>
  )
}

const EditProfile = React.forwardRef(({ children }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [profileUpdadteBtnloading, setProfileUpdadteBtnloading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState("");
  const handleOpen = () => setOpen((cur) => !cur);
  const [newProfile, setNewProfile] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <>

      <div onClick={handleOpen} ref={ref}>{children}</div>
      <DialogBox open={open} setOpen={setOpen} handleOpen={handleOpen} newProfile={newProfile} setNewProfile={setNewProfile} showPassword={showPassword} setShowPassword={setShowPassword} profileUpdadteBtnloading={profileUpdadteBtnloading} setProfileUpdadteBtnloading={setProfileUpdadteBtnloading} />
    </>
  );
})

export default EditProfile;