import Navbar from "./Navbar";
import NewsItemsCont from "./NewsItemsCont";
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const Home = ({category="general"}) => {
  // const [category2, setCategory] = useState("general")
  const location = useLocation();
  useEffect(() => {
    // setCategory(category)
  }, [location])
  
  return (
    <div>
      <Navbar />
      <NewsItemsCont category={category} />
    </div>
  )
}

export default Home

// no use of this component in the project