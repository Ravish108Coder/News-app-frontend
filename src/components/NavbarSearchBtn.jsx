import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function NavbarSearchBtn() {
  const [filter, setFilter] = React.useState("");
  const onChange = ({ target }) => setFilter(target.value);
  const navigate = useNavigate();

  const handleFilterNews = (e) => {
    e.preventDefault();
    navigate(`/search/${filter}`)
    setFilter("")
  }
  return (
      <form onSubmit={(e)=>handleFilterNews(e)}>
    <div className="relative flex sm:w-full mx-auto w-[80%] sm:mx-0">
        <Input
          type="text"
          label="Search"
          value={filter}
          onChange={onChange}
          className="pr-20"
          placeholder="crime ipl ..."
          containerProps={{
            className: "min-w-0",
          }}
          minLength={1}

        />
        <Button
          type="submit"
          size="sm"
          color={filter ? "gray" : "blue-gray"}
          disabled={!filter}
          // disabled mein clicked nhi hota hai

          className="!absolute right-1 top-1 rounded"
        >
          Submit
        </Button>
    </div>
      </form>
  );
}