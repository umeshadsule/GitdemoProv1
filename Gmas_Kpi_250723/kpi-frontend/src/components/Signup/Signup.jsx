import React from "react";
import axios from 'axios';
import $, { timers } from "jquery"
import { useEffect } from "react";
import { countries } from '../../data/country';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Chart from 'react-google-charts';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { useState } from "react";


const Signup = () => {
    const [values, setValues] = useState({
        
        
        country: 'India',
        totalCredit: '2213',
        

    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {   country, totalCredit } = values;
        const payments = { country, totalCredit};

       // await axios.post('${localhost:3000)/insertPaymentDetails', payments);   
       const response = await axios.post('http://localhost:8080/save', payments)
        .then(response => console.log(response));
    
    };

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
               

                <div className="form-group">
                    <input
                        value={values.country}
                        onChange={handleChange('country')}
                        type="text"
                        className="form-control"
                        placeholder="country"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={values.totalCredit}
                        onChange={handleChange('totalCredit')}
                        type="number"
                        className="form-control"
                        placeholder="total credit"
                    />
                </div>

               

               

                <div>
                    <button className="btn btn-primary">Save</button>
                </div>
                <div>
                    <button className="btn btn-primary">Save</button>
                </div>
            </form>
        );
    };

    return <React.Fragment>
        {showLoading()}
        {signupForm()} 
         </React.Fragment>;
};

export default Signup;