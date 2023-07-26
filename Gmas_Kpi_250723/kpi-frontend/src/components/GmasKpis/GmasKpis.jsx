import React from "react";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { countries } from '../../data/country';
import {Form} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { useLocation, useNavigate } from "react-router-dom";
import getReports from "../../apis/reportApi";

var messageWhenNoData='';
var curr1;
var curr2;
var dateValue;

const GmasKpis=()=>{
  const location = useLocation();
  // console.log('location.state.dateValue');
  // console.log(location);
    const [post, setPost] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [columnHead, setColumnHead] = React.useState("");
  const[countrySelect,setcountrySelect]=React.useState("");

  /* let navigate1 = useNavigate(); 
    const backToCountryPage = () =>{ 
      let path = `/gmas-kpis`; 
      navigate1(path,{state:{countryId:countrySelect,dateValue: selectedDate}}); 
   } */


   

 /*  React.useEffect(() => {
    
    setSelectedDate(location.state.dateValue);
    
  },[location.state.dateValue]);

 */
    React.useEffect(() => {
     // setSelectedDate(a);
      getReports.get('', {
        params:{
          reportDate: selectedDate,
        }
        
      }).then((response) => {
        console.log("ResponseData::");
        console.log(response.data);
        if(response.data.statusCode === "200"){
          var responseArray=[];
          for (let i = 0; i < response.data.obj.length; i++) {
           var obj1=response.data.obj[i];
          console.log(obj1);
         
          obj1.disbursed=Number(parseFloat(obj1.disbursed).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2
        });
          obj1.collected=Number(parseFloat(obj1.collected).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2
        });
          obj1.paymentMade=parseFloat(obj1.paymentMade).toLocaleString("en-US");
        if(obj1.country==="India"){
          obj1.col1Title="merchants paid";
          obj1.col3Title="payments";
          obj1.col2Title="payments";
          obj1.curr1="₹";
          obj1.curr2="$";
        }else if(obj1.country === "USA"){
          obj1.col1Title="merchants paid";
          obj1.col3Title="collections";
          obj1.col2Title="payments";
          obj1.curr1="$"; obj1.curr2="$";
        }else if(obj1.country === "Japan"){
          obj1.col1Title="";
          obj1.col2Title="payments (JCB)";
          obj1.col3Title="";
          obj1.paymentMade="";
          obj1.collected="";
          obj1.curr1="¥";
          obj1.curr2="";
        }else if(obj1.country==="Canada"){
          obj1.col1Title="merchants paid";
          obj1.col3Title="collections";
          obj1.col2Title="payments";
          obj1.curr1="$"; obj1.curr2="$";
          
        }
        responseArray.push(obj1);
        
      }
      console.log("responseArray");
        console.log(responseArray);


          setPost(responseArray);
          messageWhenNoData='';

        }else {
          setPost([]);
           messageWhenNoData= <h5><center>No record found for this date..!</center> </h5>
        }
        
      });
    }, [selectedDate]);
  var index=1;
  
  

    let navigate = useNavigate(); 
    const routeChange = (countryValue,dateId) =>{ 
      
      
      let path = `/reporting`; 
     navigate(path,{state:{countryId:countryValue,dateValue: dateId}}); 
   } 
    
    
    const [hover, setHover] = React.useState("");
    const onHover = (country) => {
      console.log(country);
      setHover(country);
    };
  
    const onLeave = () => {
      setHover("");
    };


  return (

    
    <div>
      {/* move this date picker functionality to separate component */}
      <div style={{float: 'right', marginRight:180}}>
          <Form.Group controlId="paymentDate">
              <Form.Label>Select Date</Form.Label>
              <Form.Control type="date" name="paymentDate" placeholder="Payment Date" value={selectedDate} onChange={e => setSelectedDate(moment(e.target.value).format('YYYY-MM-DD'))} />
          </Form.Group>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="noMessageAlert">{messageWhenNoData}</div>
      <div className="reportdiv">
      <table className="reportTable" >
        <thead>
          {/* <tr>
            <th>Countries</th>
            <th>Payments made</th>
            <th>Disbursed</th>
            <th>Collected</th>
          </tr> */}
        </thead>
        <tbody>


         { 
            post.map(
              (data) => (
               
                <tr className="reportTableTr" onMouseEnter={()=>onHover(data.country)} onMouseLeave={()=>onLeave(countries.get(data.country))} onClick={()=>routeChange(data.country,data.date)} >
                  <td  className="reportTableTd "><center> <img 
                src={countries.get(data.country)} alt=" india" width="60" height="60" />
                    <br>
                    </br> 
                    <div className="" >
                      
                    <span className="hoverCountryTitle">{hover === data.country ? data.country : ""}</span>
                    </div>
                    </center> 
                    </td>
                  <td className="reportTableTd"> <center><table><tr><td className="fontNumber"><center>{data.paymentMade}</center></td></tr><tr><td className="fontChange"><center>{data.col1Title}</center></td></tr></table> </center></td>
                  <td className="reportTableTd">  <center><table><tr><td className="fontNumber"><center>{data.curr1}{data.disbursed}</center></td></tr><tr><td className="fontChange"><center>{data.col2Title}</center></td></tr></table></center></td>
                  <td className="reportTableTd"> <center><table><tr><td className="fontNumber"><center>{data.curr2}{data.collected}</center></td></tr><tr><td className="fontChange"><center>{data.col3Title}</center></td></tr></table> </center> </td>
                </tr>

              )
            )
          }

        </tbody>
      </table>
      </div>
     
     </div>
    
  );
};






export default GmasKpis;