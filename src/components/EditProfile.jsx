import React from "react";
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
 
export default function EditProfile({children}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              className="mb-3 font-normal"
              variant="h4"
              color="orange"
            >
              Update Your Profile Name and Password
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your New Name
            </Typography>
            <Input label="Name" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your New Email
            </Typography>
            <Input label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your New Password
            </Typography>
            <Input label="Password" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Update Profile
            </Button>
            <Button className="mt-4" variant="outlined" color="red" onClick={handleOpen} fullWidth>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}