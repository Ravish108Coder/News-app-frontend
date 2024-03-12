import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { Link, useNavigate } from "react-router-dom";
  import {useRef, useState} from 'react'
  import {toast} from 'react-toastify'
  import axios from 'axios'
   
  export default function SimpleRegistrationForm() {
    const SignUpBtnRef = useRef(null);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUpSubmit = (e) => {
      e.preventDefault();
      console.log('Sign Up form submitted');
      const submitBtn = SignUpBtnRef.current;
      const formData = {};
      formData.username = e.target.name.value;
      formData.email = e.target.email.value;
      formData.password = e.target.password.value;
      console.log(formData)
      const fetchdata = async () => {
        try {
          const response = await fetch('http://localhost:3333/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const data = await response.json()
          if(data?.status){
            navigate('/signin');
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
      setName('');
      setEmail('');
      setPassword('');
    }

    return (
       <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSignUpSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              name="name"
              type="text"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
              placeholder="Password"
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

          <Button ref={SignUpBtnRef} type="submit" className="mt-6" fullWidth>
            sign up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to={'/signin'} className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    );
  }