
import React from "react";
import { countries } from '../../data/country';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import {chartWrapper,Chart,chartRangeFilter} from 'react-google-charts';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import Multiselect from "multiselect-react-dropdown";
import client from "../../apis/clientApi";
import socPocRoc from "../../apis/scoRocPocApi";
import paymentTrendDataApi from "../../apis/paymentTrendDataApi";
const dayArray=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const Reporting = () => {
  const [post, setPost] = React.useState([]);
  const location = useLocation();
  const [chartType, setChartType] = React.useState("7");
    const[active,setActive]=React.useState("7");
      const[variableChartHeader,setVariableChartHeader]=React.useState("7 Days");
      const [selectedDate, setSelectedDate] = React.useState(moment().format('YYYY-MM-DD'));
      const[rocsProcessed,setrocsProcessed]=React.useState("");
      const[noOfSubmissionFiles,setNoOfSubmissionFiles]=React.useState("");
      const[noOfNonSpendFiles,setNoOfNonSpendFiles]=React.useState("");
      const[socsProcessed,setsocsProcessed]=React.useState("");
      const[socsPaid,setsocsPaid]=React.useState("");
      const[countrySelect,setcountrySelect]=React.useState("");
      const[show,setShow]=React.useState("payment");
      const[currencyGraph,setCurrencyGraph]=React.useState("");
      const[daysToAdd,setdaysToAdd]=React.useState(1);
      const[dateShowOnXaxis,setdateShowOnXaxis]=React.useState(6);
      const[field,setField]=React.useState([]);
      const [LineDataCurrencyTrendState, setLineDataCurrencyTrendState] = React.useState([]);
      const [LineChartOptionsStateCurrencyTrend,setLineChartOptionsStateCurrencyTrend]=React.useState([]);
      const [LineDataCountTrendState, setLineDataCountTrendState] = React.useState([]);
      const [LineChartOptionsStateCountTrend,setLineChartOptionsStateCountTrend]=React.useState([]);
      const [dropDownValue,setdropDownValue] = React.useState([]);
    const [placeholderTrendData,setPlaceholderTrendData] = React.useState("Select Payment Window");
  
  
      const data = {
      currency: field,
      date: selectedDate,
      chart: chartType,
      country: countrySelect
    };
 
  React.useEffect(() => {
    setSelectedDate(location.state.dateValue);
    setcountrySelect(location.state.countryId);
  },[location.state.dateValue,location.state.countryId]);

// ****Payment Table **************************

React.useEffect(() => {
  client.get('', {
    params: {
      paymentDate: selectedDate,
      country: countrySelect,
      
    }
  }).then((response) => {
    
    var dropdownArr=[];
    var responseArray=[];
    for (let i = 0; i < response.data.length; i++) {
      
      dropdownArr.push(response.data[i].paymentType);
      if(i == 0 ){
        if(countrySelect === "India"){
         setField([(response.data[response.data.length-1]).paymentType ]);
        setPlaceholderTrendData("Select Currency");
        }else{
          setPlaceholderTrendData("Select Payment Window");
          setField([response.data[i].paymentType ]);
        }
        }
      if(countrySelect == "USA" || countrySelect == "Canada"){
      response.data[i].currency="$";
      setCurrencyGraph("$");
      }else if(countrySelect == "India" && response.data[i].paymentType == "INR" ){
        response.data[i].currency="₹";
        setCurrencyGraph("₹");
      }else if(countrySelect == "India" && response.data[i].paymentType == "USD"){
        response.data[i].currency="$";
      }
    response.data[i].totalCredit= Number(parseFloat(response.data[i].totalCredit).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
  });
        response.data[i].totalDebit= Number(parseFloat(response.data[i].totalDebit).toFixed(2)).toLocaleString('en', {
          minimumFractionDigits: 2
      });
      response.data[i].debitCount= Number(parseFloat(response.data[i].debitCount).toFixed(2)).toLocaleString('en', {	
        minimumFractionDigits: 2	
    });	
    response.data[i].creditCount= Number(parseFloat(response.data[i].creditCount).toFixed(2)).toLocaleString('en', {	
      minimumFractionDigits: 2	
  });
        response.data[i].noOfPayments= parseFloat(response.data[i].noOfPayments).toLocaleString('en-US');
        responseArray.push(response.data);
    } 
    console.log(responseArray);
    if(countrySelect === "India"){
    setPost((response.data).reverse());
    setdropDownValue(dropdownArr.reverse());
    }else{
      setPost(response.data);
    setdropDownValue(dropdownArr);
    }
   console.log("dropDownValue::::::::+++++",dropDownValue);
  });

}, [selectedDate,countrySelect,show,countrySelect]);

  //*****ROC SOC ************************** */
  React.useEffect(() => {
      socPocRoc.get('', {
      params: {
        socPocDate: selectedDate,
        country: countrySelect ,
        }
    }).then((response) => {
     console.log("response.data::");
     console.log(response.data.obj);
     setrocsProcessed(parseFloat(response.data.obj[0].rocsprocessed).toLocaleString('en-US'));
     setsocsProcessed(parseFloat(response.data.obj[0].socsprocessed).toLocaleString('en-US'));
     setsocsPaid(parseFloat(response.data.obj[0].pocsprocessed).toLocaleString('en-US'));
     setNoOfSubmissionFiles(parseFloat(response.data.obj[0].noOfSubmissionFiles).toLocaleString('en-US'));	
     setNoOfNonSpendFiles(parseFloat(response.data.obj[0].noOfNonSpendFiles).toLocaleString('en-US'));
      });
  }, [selectedDate,countrySelect]);

// *******************count trend data******************

React.useEffect(() => {
  console.log("FIELD::::::::::::::::::",field);

      paymentTrendDataApi(data)
      .then(response  => {
        console.log("Response +",response);
        const d = new Date(selectedDate);
        console.log("d::"+d);
        let day = d.getDay();
        console.log();
        console.log(dayArray[parseInt(day)]);
        console.log(parseInt(day));
       if(chartType=="30"){
        setActive("30");
        setdaysToAdd(7);
        setdateShowOnXaxis(4);
        setVariableChartHeader(" 1 Month");
       }else if(chartType=="7"){
        setActive("7");
        setdaysToAdd(1);
        setdateShowOnXaxis(6);
        setVariableChartHeader(" 7 Days");
    
       }else if(chartType=="15"){
        setActive("15");
        setdaysToAdd(1);
        setdateShowOnXaxis(14);
        setVariableChartHeader(" 15 Days");
    
       }else if(chartType=="365"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("365");
        setVariableChartHeader("yearly");
    
       }else if(chartType=="90"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("90");
        setVariableChartHeader("3 Months");
    
       }else if(chartType=="180"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("180");
        setVariableChartHeader("6 Months");
    
       }else if(chartType=="all"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("180");
        setVariableChartHeader("All days");
    
       }
      
      const LineDataCountTrend = [] ;
      const yAxisDataCountTrend= [];
      var paymentTypeKeyCountTrend=['date'];
        var zeroArrayCountTrend=[0];
       var responseDataCountTrend=(response.data);
        console.log(responseDataCountTrend.reverse());
        var leftIfYAxisCountTrend=1;
          var fromDateCountTrend;
        for(var i=0;i<responseDataCountTrend.length;i++){
           console.log("Response:",responseDataCountTrend);
            const dateString = responseDataCountTrend[i][0].date; // yyyy/mm/dd format
          const dateParts = dateString.split('-'); // split date string into an array of parts
          const year = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]); // extract month from date parts and convert to integer
          const day = parseInt(dateParts[2]); // extract day from date parts and convert to integer
      
          if(i==0){
         yAxisDataCountTrend.push(new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2])));
           fromDateCountTrend = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
         }
          var numberOfDaysToAdd = daysToAdd;
          var result = fromDateCountTrend.setDate(fromDateCountTrend.getDate() + numberOfDaysToAdd);
          const dateString2 =moment(new Date(result)).format("YYYY-MM-DD");
          const dateParts2 = dateString2.split('-'); // split date string into an array of parts
         
          fromDateCountTrend = new Date(parseInt(dateParts2[0]), parseInt(dateParts2[1]) - 1, parseInt(dateParts2[2]));

         const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(new Date(year, month - 1, day)); 
        var paymentValuesCountTrend=[ (new Date(year, month - 1, day))];
          for(var j=0;j<responseDataCountTrend[i].length;j++){
             const yAxisDataCountTrendObject = [];
             if(i==0){
                   paymentTypeKeyCountTrend.push(responseDataCountTrend[i][j].paymentType);
                   paymentTypeKeyCountTrend.push({ role: "tooltip", type: "string", p: { html: true} });
                   zeroArrayCountTrend.push(0);
                  } if(j<leftIfYAxisCountTrend){
                 if(i<dateShowOnXaxis ){ 
                    yAxisDataCountTrend.push(new Date(parseInt(dateParts2[0]), parseInt(dateParts2[1]) - 1, parseInt(dateParts2[2])));
                 }
               }
                paymentValuesCountTrend.push((Number(Number(responseDataCountTrend[i][j].totalCount))/1000000)); 	
               paymentValuesCountTrend.push("<div className='tooltipchart'><div>&nbsp &nbsp &nbsp &nbsp <b>"+formattedDate+"</b></div> <br> <div>&nbsp &nbsp &nbsp &nbsp"+responseDataCountTrend[i][j].paymentType+":: <b>"+(Number(Number(responseDataCountTrend[i][j].totalCount))/1000000).toLocaleString('en', {	
                minimumFractionDigits: 2	
            })+"</b></div></div>"); 
           }
         
         if(i==0){
            LineDataCountTrend.push(paymentTypeKeyCountTrend);
          }
         LineDataCountTrend.push(paymentValuesCountTrend);
         }

         setLineDataCountTrendState(LineDataCountTrend);
        setLineChartOptionsStateCountTrend({
           title:'Total Payment Volume Trending for  '+variableChartHeader,titlePosition:'',
           hAxis: {  type:'date',title: "DATE",format: 'EEE, MMM d, yyyy',textStyle : {
           fontSize: 10},
           ticks:  yAxisDataCountTrend  
                },
           series: {
              1: { curveType: '' },
            },
            vAxis: {title: ""+" THOUSANDS",textStyle : {
              fontSize: 10 
          }},
          legend: {
            textStyle: {
              fontSize: 10
            }
          }, 
          tooltip: {
            
            type:'date',
            format: 'EEE, MMM d, yyyy',
            isHtml: true,
            format: {
              pattern: 'EEE, MMM d, yyyy',
              type: 'date',
              format: 'EEE, MMM d, yyyy'
            },
          }
        });
      });
 }, [chartType,active,variableChartHeader,selectedDate,countrySelect,currencyGraph,field]);

// Currency trend data

React.useEffect(() => {
        paymentTrendDataApi(data)
      .then(response  => {
        const d = new Date(selectedDate);
        let day = d.getDay();
        console.log();
        console.log(dayArray[parseInt(day)]);
        console.log(parseInt(day));
        if(chartType=="30"){
        setActive("30");
        setdaysToAdd(7);
        setdateShowOnXaxis(4);
        setVariableChartHeader(" 1 Month");
       }else if(chartType=="7"){
        setActive("7");
        setdaysToAdd(1);
        setdateShowOnXaxis(6);
        setVariableChartHeader(" 7 Days");
       }else if(chartType=="15"){
        setActive("15");
        setdaysToAdd(1);
        setdateShowOnXaxis(14);
        setVariableChartHeader(" 15 Days");
     }else if(chartType=="365"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("365");
        setVariableChartHeader("yearly");
     }else if(chartType=="90"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("90");
        setVariableChartHeader("3 Months");
      }else if(chartType=="180"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("180");
        setVariableChartHeader("6 Months");
      }else if(chartType=="all"){
        setdaysToAdd(30);
        setdateShowOnXaxis(3);
        setActive("180");
        setVariableChartHeader("All days");
      }
      
      const LineDataCurrencyTrend = [] ;
      const yAxisDataCurrencyTrend= [];
      var paymentTypeKeyCurrencyTrend=['date'];
      var zeroArrayCurrencyTrend=[0];
      var responseDataCurrencyTrend=(response.data);
        console.log(responseDataCurrencyTrend.reverse());
        var leftIfYAxisCurrencyTrend=1;
        var fromDateCurrencyTrend;
        for(var i=0;i<responseDataCurrencyTrend.length;i++){
        console.log("Response:",responseDataCurrencyTrend);
        const dateString = responseDataCurrencyTrend[i][0].date; // yyyy/mm/dd format
        const dateParts = dateString.split('-'); // split date string into an array of parts
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]); // extract month from date parts and convert to integer
        const day = parseInt(dateParts[2]); // extract day from date parts and convert to integer
        const dateObj = new Date(year, month - 1, day);
        const dayOfWeek = dateObj.getDay(); // get day of the week as a number (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        if(i==0){
           yAxisDataCurrencyTrend.push(new Date(year, month - 1, day));
           fromDateCurrencyTrend = new Date(year, month - 1, day);
         }
          var numberOfDaysToAdd = daysToAdd;
          var result = fromDateCurrencyTrend.setDate(fromDateCurrencyTrend.getDate() + numberOfDaysToAdd);
          const dateString2 =moment(new Date(result)).format("YYYY-MM-DD");
          const dateParts2 = dateString2.split('-'); // split date string into an array of parts
         const year2 = parseInt(dateParts2[0]);
         const month2 = parseInt(dateParts2[1]); // extract month from date parts and convert to integer
         const day2 = parseInt(dateParts2[2]); // extract day from date parts and convert to integer
         fromDateCurrencyTrend = new Date(year2, month2 - 1, day2);
         var paymentValuesCurrencyTrend=[ (new Date(year, month - 1, day))];
          for(var j=0;j<responseDataCurrencyTrend[i].length;j++){
            const yAxisDataCurrencyTrendObject = [];
             if(i==0){
                   paymentTypeKeyCurrencyTrend.push(responseDataCurrencyTrend[i][j].paymentType);
                   paymentTypeKeyCurrencyTrend.push({ role: "tooltip", type: "string", p: { html: true} });
                   zeroArrayCurrencyTrend.push(0);
                } if(j<leftIfYAxisCurrencyTrend){
                 if(i<dateShowOnXaxis ){ 
                    yAxisDataCurrencyTrend.push(new Date(year2, month2 - 1, day2));
                 }
               }
              const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
          hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(new Date(year, month - 1, day)); 
                 paymentValuesCurrencyTrend.push((Number(Number(responseDataCurrencyTrend[i][j].paymentGraphData))/1000000)); 
                 paymentValuesCurrencyTrend.push("<div className='tooltipchart'><div>&nbsp &nbsp &nbsp &nbsp"+formattedDate+"</div> <br> <div>&nbsp &nbsp &nbsp &nbsp"+responseDataCurrencyTrend[i][j].paymentType+"::"+(Number(Number(responseDataCurrencyTrend[i][j].paymentGraphData))/1000000).toLocaleString('en', {
                  minimumFractionDigits: 2
              })+"</div></div>"); 
           }
           if(i==0){
            LineDataCurrencyTrend.push(paymentTypeKeyCurrencyTrend);
           }
            LineDataCurrencyTrend.push(paymentValuesCurrencyTrend);
           }
         setLineDataCurrencyTrendState(LineDataCurrencyTrend);
         setLineChartOptionsStateCurrencyTrend({
           title:'Payment Trending for  '+variableChartHeader,titlePosition:'',
           hAxis: {  type:'date', title: "DATE",format: 'EEE, MMM d, yyyy', textStyle : {
            fontSize: 10},
          ticks:  yAxisDataCurrencyTrend  
                },
          series: {
              1: { curveType: '' },
            },
          vAxis: {title: ""+" MILLIONS",textStyle : {
              fontSize: 10 // or the number you want
          }},
          legend: {
            textStyle: {
              fontSize: 10
            }
          },
          tooltip: {
            isHtml: true,
            trigger: 'both',
            textStyle: { fontSize: 14},
            format: {
              title: 'Day',
              prefix: 'Day ',
              suffix: '',
              decimalSymbol: '.',
              //pattern: 'EEE, MMM d, yyyy',
              format: { dateFormat: 'EEE, MMM d, yyyy' }
            },
           
          }, format: { dateFormat: 'EEE, MMM d, yyyy' }
  
          });
           
        });
 
    }, [chartType,active,variableChartHeader,selectedDate,countrySelect,currencyGraph,field]);





  //***Chart Data******************************************   
  
  
 
   // backToCountryPage
   let navigate = useNavigate(); 
    const backToCountryPage = () =>{ 
      let path = `/gmas-kpis`; 
     navigate(path,{state:{countryId:countrySelect,dateValue: selectedDate}}); 
   }

   
   
    setTimeout(function() { 
     }, 5000)
  
 
   function  onSelect(selectedList, selectedItem) {
      console.log(selectedList);
      setField([]);
      setField(selectedList);
  }

 function onRemove(selectedList, removedItem){
   setField([]);
      setField(selectedList);
   console.log(selectedList);
  }
  
 
  return (
    <>
  <div className="firstRow">
      <div className="dateSelect" >
          <Form.Group controlId="paymentDate">
              <Form.Label className="form-label-class">Select Date</Form.Label>
              <Form.Control type="date" className="paymentDateCountryClass" name="paymentDate" placeholder="Payment Date" value={selectedDate} onChange={e => setSelectedDate(moment(e.target.value).format('YYYY-MM-DD'))} />
          </Form.Group>
  </div>
  
  <div className="form-group countrySelect">
    <label className="form-label form-label-class " for="exampleFormControlSelect1">Select Country</label>
    <select class="form-control selectField paymentDateCountryClass"  value={countrySelect} onChange={e=>setcountrySelect(e.target.value)} id="exampleFormControlSelect1">
      <option>USA</option>
      <option>Canada</option>
      <option>India</option>
    </select>
  </div>
    </div>
    {   <Container className='payment-activity-3split'>
  
     <br></br>
        < div className="">
          <div className='flagdiv'>
          <center>   <h6 className="dateSize">{selectedDate}</h6>
            <img src={countries.get(countrySelect)} alt=" india" width="60" height="60" /></center> 
          </div>

          <div className='dataProcessCol rocdiv '>
            <div className='border dataProcessColDiv'>
              <div className="marginDiv">
              <div className='dataProcessDigit'>
                <center>{rocsProcessed}</center>
              </div>
              <div className='dataProcess '>
                <center>ROCs processed</center>
              </div>
              </div>
            </div>
          </div>
          &nbsp;&nbsp;
          <div className='dataProcessCol socdiv'>
          
            <div className='border dataProcessColDiv'>
              
            <div className="marginDiv">
              <div className='dataProcessDigit'><center>{socsProcessed}</center></div>
              <div className='dataProcess '><center>SOCs processed</center></div>
              </div>
             </div>
           </div>
          &nbsp;&nbsp;
          <div className='dataProcessCol socpaiddiv'>
            <div className='border dataProcessColDiv '>
            <div className="marginDiv">
              <div className='dataProcessDigit'><center>{socsPaid}</center></div>
              <div className='dataProcess'><center>SOCs paid</center></div>
              </div>
            </div>
          </div>

          &nbsp;&nbsp;
          <div className='dataProcessCol socpaiddiv'>
            <div className='border dataProcessColDiv '>
            <div className="marginDiv">
              <div className='dataProcessDigit'><center>{noOfSubmissionFiles}</center></div>
              <div className='dataProcess'><center>Submission Files Processed</center></div>
              </div>
            </div>
          </div>
         
          <div className='dataProcessCol socpaiddiv'>
            <div className='border dataProcessColDiv '>
            <div className="marginDiv">
              <div className='dataProcessDigit'><center>{noOfNonSpendFiles}</center></div>
              <div className='dataProcess'><center>Non-Spend Files Processed</center></div>
              </div>
            </div>
          </div>
     </div>
     <br></br>
      <br></br><br></br>
        <div className='tabSelect'>
                        <Row className='tabType '>
                        <Col onClick={()=>setShow("payment") } style={{ backgroundColor: show === "payment" ? "blue" : "darkgrey",color:show !== "payment" ? "":"white" }} className='border tabSelectCol1'><center>Payment Details</center></Col>
                        <Col onClick={()=>setShow("currency_trend") } style={{ backgroundColor: show === "currency_trend" ? "blue" : "darkgrey" ,color: show !== "currency_trend" ? "":"white" } }className='border tabSelectCol2'><center>Payment Trends</center></Col>
                        <Col onClick={()=>setShow("count_trend") } style={{ backgroundColor: show === "count_trend" ? "blue" : "darkgrey" ,color: show !== "count_trend" ? "":"white" } }className='border tabSelectCol2'><center>Volume Trends</center></Col>
                       {/*  <Col className='border paymentTrendsCol3' style={{backgroundColor:"darkgrey"}}><center>Gross Pay Trend</center></Col>
               */}
              
                      </Row>
                      </div>
              { show=== "count_trend"
                    ? <div>
                    <div>
                        <div>
                      <br></br>
                      <div>
                     <div className='paymentTable paymentTrends abc'>
                     <Row className='graphType '>
                          <Col onClick={()=>setChartType("7") } style={{ backgroundColor: active === "7" ? "green" : "rgb(203 189 189)",color:active !== "7" ? "":"white" }} className='border paymentTrendsCol1'><center>7D</center></Col>
                          <Col onClick={()=>setChartType("15") } className='border paymentTrendsCol3' style={{ backgroundColor: active === "15" ? "green" : "rgb(203 189 189)" ,color: active !== "15" ? "":"white" } }> <center>15D</center></Col>
                
                          <Col onClick={()=>setChartType("30") } style={{ backgroundColor: active === "30" ? "green" : "rgb(203 189 189)" ,color: active !== "30" ? "":"white" } } className='border paymentTrendsCol2'><center>1M</center></Col>
                          <Col onClick={()=>setChartType("90") } style={{ backgroundColor: active === "90" ? "green" : "rgb(203 189 189)" ,color: active !== "90" ? "":"white" } } className='border paymentTrendsCol2'><center>3M</center></Col>
                          <Col onClick={()=>setChartType("180") } style={{ backgroundColor: active === "180" ? "green" : "rgb(203 189 189)" ,color: active !== "180" ? "":"white" } } className='border paymentTrendsCol2'><center>6M</center></Col>
                         
                          <Col onClick={()=>setChartType("365") } className='border paymentTrendsCol3' style={{ backgroundColor: active === "365" ? "green" : "rgb(203 189 189)" ,color: active !== "365" ? "":"white" } }> <center>1Y</center></Col>
                          <Col onClick={()=>setChartType("AllTime") } className='border paymentTrendsCol3' style={{ backgroundColor: active === "all" ? "green" : "rgb(203 189 189)" ,color: active !== "all" ? "":"white" } }> <center>Max</center></Col>
                         </Row>
                        </div>
 <div className='MultiPaymentWindow def'>
 <Multiselect 
  onRemove={(a,b)=>onRemove(a,b) }  
  onSelect={(a,b)=>onSelect(a,b)}
  isObject={false} 
  options={dropDownValue} 
  showCheckbox
  selectedValues={field}
  placeholder={placeholderTrendData}
  />
</div>
</div>
<br></br><br></br><br></br><br></br><br></br><br></br>
  
  {
   field.length > 0 ?
  <div className='paymentTable1'>
  
                          <Row>
                           
                            <Col>
                             <Chart
                                height={'280px'}
                                width={'870px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                               
                                data={LineDataCountTrendState}
                                options={LineChartOptionsStateCountTrend}
                                rootProps={{ 'data-testid': '2' }}
                              />
                               </Col>
                              </Row>
                 </div> : <div className="CurrencyMsg"><br></br><br></br><br></br><h9>Please select currency</h9>
                 </div>
                }
       </div></div></div>

 : show === "payment"
?  

  <div className='tableHeight'>
                       <br></br>
                    <div >
                      <div className="paymentTableWidth">
                        <div className='paymentTable'>
                          <Table striped bordered hover paymentTableStyle>
                          
                            <thead>
  <tr className="tRow">
    <th  className="paymentTableTd netAmountDisplay" rowspan="2"><center className="netAmountDisplay"></center></th>
    <th className="paymentTableTd" colspan="3"><center>Amount</center></th>
     <th  className="paymentTableTdCount" colspan="3"><center >Volume</center></th>
     </tr>
  <tr className="tRow">
    <th className="paymentTableTd"><center className="netAmountDisplay">Credit</center></th>
    <th className="paymentTableTd"><center className="netAmountDisplay">Debit</center></th>
    <th className="paymentTableTd"><center className="netAmountDisplay">Net</center></th>
    <th className="paymentTableTd"><center className="netAmountDisplay">Credit</center></th>
    <th className="paymentTableTd"><center className="netAmountDisplay">Debit</center></th>
    <th className="paymentTableTd "><center className="netAmountDisplay">Total</center></th>
  </tr>
   </thead>
                            <tbody>
                {
                                post.map(
                                  (data) => (
                                      <tr className="tRow">
                                       <th className="paymentTableTd "><center className="netAmountDisplay">{data.paymentType}</center></th>
                                        <td className="paymentTableTd"><span className="numberAlign">{data.currency}{data.totalCredit}</span></td>
                                        <td className="paymentTableTd"><span className="numberAlign">{data.currency}{data.totalDebit}</span> </td>
                                         <td className="paymentTableTd"> <span className="numberAlign">{data.currency}{(Number((data.totalCredit).replaceAll(",", "")) - Number((data.totalDebit).replaceAll(",", ""))).toLocaleString('en', {
                                         minimumFractionDigits: 2
                                         })}</span></td>
                                         <td className="paymentTableTd"> <span className="numberAlign">{data.creditCount}</span></td>	
                                         <td className="paymentTableTd"> <span className="numberAlign">{data.debitCount}</span></td>	
                                          <td className="paymentTableTd"> <span className="numberAlign">{(Number((data.creditCount).replaceAll(",", "")) + Number((data.debitCount).replaceAll(",", ""))).toLocaleString('en', {	
                                           minimumFractionDigits: 2	
                                    })}</span></td>
                                      </tr>
                                  )
                                )
                                  }
                        </tbody>
                      </Table>
                        </div>
                      </div>
                    </div>
                  </div>

                 :  <div>
                  <div>
                      <div>
                    <br></br>
                   <div>
                     <div className='paymentTable paymentTrends abc'>
                     <Row className='graphType '>
                          <Col onClick={()=>setChartType("7") } style={{ backgroundColor: active === "7" ? "green" : "rgb(203 189 189)",color:active !== "7" ? "":"white" }} className='border paymentTrendsCol1'><center>7D</center></Col>
                          <Col onClick={()=>setChartType("15") } className='border paymentTrendsCol3' style={{ backgroundColor: active === "15" ? "green" : "rgb(203 189 189)" ,color: active !== "15" ? "":"white" } }> <center>15D</center></Col>
                
                          <Col onClick={()=>setChartType("30") } style={{ backgroundColor: active === "30" ? "green" : "rgb(203 189 189)" ,color: active !== "30" ? "":"white" } } className='border paymentTrendsCol2'><center>1M</center></Col>
                          <Col onClick={()=>setChartType("90") } style={{ backgroundColor: active === "90" ? "green" : "rgb(203 189 189)" ,color: active !== "90" ? "":"white" } } className='border paymentTrendsCol2'><center>3M</center></Col>
                          <Col onClick={()=>setChartType("180") } style={{ backgroundColor: active === "180" ? "green" : "rgb(203 189 189)" ,color: active !== "180" ? "":"white" } } className='border paymentTrendsCol2'><center>6M</center></Col>
                         
                          <Col onClick={()=>setChartType("365") } className='border paymentTrendsCol3' style={{ backgroundColor: active === "365" ? "green" : "rgb(203 189 189)" ,color: active !== "365" ? "":"white" } }> <center>1Y</center></Col>
                          <Col onClick={()=>setChartType("AllTime") } className='border paymentTrendsCol3' style={{ backgroundColor: active === "all" ? "green" : "rgb(203 189 189)" ,color: active !== "all" ? "":"white" } }> <center>Max</center></Col>
                     
                        </Row>
                        </div>

      <div className='MultiPaymentWindow def'>
   <Multiselect 
   onRemove={(a,b)=>onRemove(a,b) }  
   onSelect={(a,b)=>onSelect(a,b)}
   isObject={false} 
   options={dropDownValue} 
   showCheckbox
   selectedValues={field}
   placeholder={placeholderTrendData}
  />
</div>
</div>
<br></br><br></br><br></br><br></br>
{
 field.length > 0 ?
<div className='paymentTable1'>

                        <Row>
                         
                          <Col>
                           <Chart
                              height={'280px'}
                              width={'870px'}
                              chartType="LineChart"
                              loader={<div>Loading Chart</div>}
                             
                              data={LineDataCurrencyTrendState}
                              options={LineChartOptionsStateCurrencyTrend}
                              rootProps={{ 'data-testid': '2' }}
                            />
                             </Col>
              </Row>
              </div> : <div className="CurrencyMsg"><br></br><br></br><br></br><h9>Please select currency</h9>
              </div>
              }
         </div></div></div>
                }
        <br></br><br></br>
        <Row>
        <div className="backButton">
          <Button className="backButton"  onClick={()=>backToCountryPage()}>Back</Button>
        </div>
        </Row>

      </Container> }
      </>
  )
}

export default Reporting;




