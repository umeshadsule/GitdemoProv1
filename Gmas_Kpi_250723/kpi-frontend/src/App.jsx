import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import MonitorSubmission from './components/MonitorSubmission/MonitorSubmission';
import PaymentActivity from './components/PaymentActivity/PaymentActivity';
import Reporting from './components/Reporting/Reporting';
import GmasKpis from './components/GmasKpis/GmasKpis';
import Navbar from './components/Navbar/Navbar';

 



const App =()=>{
    return(
        <>


        <Navbar/>
        <Routes>
           {/*  <Route exact path="/"   element={<Signup  />}/>  */}
           <Route path="/payment-activity" element={<PaymentActivity />} />
            <Route exact path="/reporting" element={<Reporting />}></Route>
            <Route path="/gmas-kpis" element={<GmasKpis />} />
          
         
            
        </Routes>
        </>
    )
};

export default App;