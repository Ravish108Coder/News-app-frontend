import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useDrawer } from "../context/DrawerContext";
import { toast } from "react-toastify";

// TODO: nodemailer for otp verification and contact us mail send functionality
 // TODO: - modify input fields and add button to send mail
const ContactUs = () => {
  const { open, toggleDrawer } = useDrawer();
  const [loading, setLoading] = useState(false);
  const [mailBody, setMailBody] = useState({
    email: "kravish1999@gmail.com",
    subject: "",
    message: "",
  
  });
  const handleSendEmail = () => {
    setLoading(true)
    try {
      const sendEmail = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/user/sendmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(mailBody)
        });
        const data = await response.json();
        console.log(data);
        if(data?.status){
          toast.success("Email sent successfully");
        }
      }
      sendEmail();
    } catch (error) {
      toast.error("Error sending email");
    }finally{
      setLoading(false)
      setMailBody({
        subject: "",
        message: "",
      })
      toggleDrawer()
    }
  }
  
  return (
    <React.Fragment>
     <Drawer transition={{type: "spring"}} size={500} placement="left" open={open} onClose={()=>toggleDrawer()}>
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography variant="h5" color="blue-gray">
            Contact Us
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={()=>toggleDrawer()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="mb-5 px-4">
          <Typography variant="small" color="gray" className="font-normal ">
            Write the message and then click button.
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Email Body
          </Typography>
          {/* <Input placeholder="johndoe@gmail.com" disabled={loading} name="email" value={mailBody.email} onChange={(e) => setMailBody({...mailBody, email: e.target.value})}  type="email" label="Email" required /> */}
          <Input placeholder="" disabled={loading} name="subject" value={mailBody.subject} onChange={(e) => setMailBody({...mailBody, subject: e.target.value})} label="Subject" required />
          <Textarea disabled={loading} name="message" value={mailBody.message} onChange={(e) => setMailBody({...mailBody, message: e.target.value})} rows={6} label="Message" required />
          <Button loading={loading} onClick={handleSendEmail}>Send Message</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}
 export default ContactUs;