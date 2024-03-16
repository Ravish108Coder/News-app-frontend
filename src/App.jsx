import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation } from 'react-router-dom'
import NewsItemsCont from './components/NewsItemsCont'
import PrivateRoutes from './components/PrivateRoutes';
import Navbar from './components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';

function App() {
  //TODO: - add protected routes functionality
  //TODO: - admin priviledge

  const [progress, setProgress] = useState(0)

  

  const location = useLocation()
  return (
    <>
        <ToastContainer />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress} 
      />
        {
          (location.pathname.includes('/signin') || location.pathname.includes('/signup')) ? null : <Navbar />
        }
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />

          {/* protected routes */}
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<NewsItemsCont setProgress={setProgress} />} />
            <Route exact path="/general" element={<NewsItemsCont setProgress={setProgress} category='general' />} />
            <Route exact path="/science" element={<NewsItemsCont setProgress={setProgress} category='science' />} />
            <Route exact path="/sports" element={<NewsItemsCont setProgress={setProgress} category='sports' />} />
            <Route exact path="/business" element={<NewsItemsCont setProgress={setProgress} category='business' />} />
            <Route exact path="/health" element={<NewsItemsCont setProgress={setProgress} category='health' />} />
            <Route exact path="/entertainment" element={<NewsItemsCont setProgress={setProgress} category='entertainment' />} />
            <Route exact path="/tech" element={<NewsItemsCont setProgress={setProgress} category='tech' />} />
            <Route exact path="/politics" element={<NewsItemsCont setProgress={setProgress} category='politics' />} />
            <Route exact path="/food" element={<NewsItemsCont setProgress={setProgress} category='food' />} />
          </Route>

          <Route path="*" element={<h1>404 Not Found</h1>} />

        </Routes>
    </>
  )
}

export default App
