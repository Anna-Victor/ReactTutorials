import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Cube from './Cube';
import Menu from './Menu';
import SignIn from './SignIn'; // Import the SignIn component
import CodeVerification from './CodeVerification';
import About from './About';
import Gallery from './Gallery';
import FundMePage from './FundMePage';
import Start from './Start';
import Feedback from './Feedback';
import Contact from './Contact';
import Response from './Response';
import Public from './Public';
import AdminRegister from './AdminRegister';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function App() {

  return (
    <Router>
      <div className="App">
        {/* Define Routes for Pages */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                {/* Background */}
                <div className="background">
                  {/* Cubes */}
                  <Cube />
                </div>

                {/* Animated Text */}
                <div className="animated-text">
                  <p className="text1">FUNDATION support CHARITY donation</p>
                  <p className="text2">fundation SUPPORT charity DONATION</p>
                  <p className="text3">FUNDATION support CHARITY donation</p>
                  <p className="text4">fundation SUPPORT charity DONATION</p>
                  <p className="text5">FUNDATION support CHARITY DONATION</p>
                </div>

                {/* Menu Component */}
                <Menu />

              </>
            }
          />

          {/* Sign In Page */}
           <Route path="/signin" element={<SignIn />} /> {/* Sign In Page */}
           <Route path="/code" element={<CodeVerification />} /> {/* Code Verification Page */}
           <Route path="/about" element={<About />} />  {/* Add About Route */}
           <Route path="/Gallery" element={<Gallery />} />  {/* Add Gallery Route */}
           
            {/* Solution to display FundMePage */}
           <Route path="/FundMePage/:id" element={<FundMePage />} />  {/* Add FundMePage Route */}

           <Route path="/Start" element={<Start />} />  {/* Add Start Route */}
           <Route path="/Feedback" element={<Feedback />} /> {/* Add Feedback Route */}
           <Route path="/Contact" element={<Contact />}/> {/* Add Contact Route */}
           <Route path="/Respone" element={<Response />} /> {/* Add Feedback Route */}
           <Route path="/Public" element={<Public />} /> {/* Add Public page */}
           <Route path="/AdminRegister" element={<AdminRegister />} /> {/* Add Public page */}
           <Route path="/AdminLogin" element={<AdminLogin />} /> {/* Add Public page */}
           <Route path="/AdminDashboard" element={<AdminDashboard />} /> {/* Add Public page */}

        </Routes>


      </div>
    </Router>
  );
}

export default App;
