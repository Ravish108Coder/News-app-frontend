import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
   
  export default function SimpleRegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignInSubmit = (e) => {
      e.preventDefault();
      console.log('Sign Up form submitted');
      const formData = {};
      formData.email = e.target.email.value;
      formData.password = e.target.password.value;
      console.log(formData)
      const fetchdata = async () => {
        try {
          const response = await fetch('http://localhost:3333/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
          const data = await response.json()
          if(data?.status){
            navigate('/');
            toast.success(data?.message || "Success Notification !");
          }else{
            toast.error(data?.message || "Something went wrong !")
          }
          console.log(data)
        } catch (error) {
          console.log(error.message)
          toast.error(error?.message || "Something went wrong !")
        }
      }

      // loading set and navigate

      fetchdata();
      setEmail('');
      setPassword('');
    }
    return (
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome Back! Enter your details to Sign In.
        </Typography>
        <form onSubmit={handleSignInSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              name="email"
              type="email"
              size="lg"
              placeholder="abc@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
          </div>

            {/* this is optional */}
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />


          <Button type="submit" className="mt-6" fullWidth>
            sign in
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link to={'/signup'} className="font-medium text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    );
  }