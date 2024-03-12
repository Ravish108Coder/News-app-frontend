import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation } from 'react-router-dom'
import NewsItemsCont from './components/NewsItemsCont'
import ContactUs from './components/ContactUs';
import PrivateRoutes from './components/PrivateRoutes';
import Navbar from './components/Navbar';

function App() {
  //TODO: - add protected routes functionality
  //TODO: - admin privielge

  const location = useLocation()
  return (
    <>
        <ToastContainer />
        {
          (location.pathname.includes('/signin') || location.pathname.includes('/signup')) ? null : <Navbar />
        }
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />

          {/* protected routes */}
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<NewsItemsCont />} />
            <Route exact path="/contact" element={<ContactUs />} />
            <Route exact path="/business" element={<NewsItemsCont category='business' />} />
            <Route exact path="/entertainment" element={<NewsItemsCont category='entertainment' />} />
            <Route exact path="/general" element={<NewsItemsCont category='general' />} />
            <Route exact path="/health" element={<NewsItemsCont category='health' />} />
            <Route exact path="/science" element={<NewsItemsCont category='science' />} />
            <Route exact path="/sports" element={<NewsItemsCont category='sports' />} />
            <Route exact path="/technology" element={<NewsItemsCont category='technology' />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
    </>
  )
}

export default App
