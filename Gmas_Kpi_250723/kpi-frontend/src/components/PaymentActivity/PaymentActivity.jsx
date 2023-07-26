import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Chart from 'react-google-charts';
import Button from 'react-bootstrap/Button';
import '../Navbar/Navbar.css';
import { countries } from "../../data/country";

const LineData = [
  ['Date', 'g', 'f'],
  [new Date(2014, 0), -.5, 5.7],
  [new Date(2014, 1), .4, 8.7],
  [new Date(2014, 2), .5, 12],
  [new Date(2014, 3), 2.9, 15.3],
  [new Date(2014, 4), 6.3, 18.6],
  [new Date(2014, 5), 9, 20.9],
  [new Date(2014, 6), 10.6, 19.8],
  [new Date(2014, 7), 10.3, 16.6],
  [new Date(2014, 8), 7.4, 13.3],
  [new Date(2014, 9), 4.4, 9.9],
  [new Date(2014, 10), 1.1, 6.6],
  [new Date(2014, 11), -.2, 4.5]
];

const LineChartOptions = {
  chart: {
    title: 'Average Temperatures and Daylight in Iceland Throughout the Year'
  },
  width: 900,
  height: 500,
  series: {
    0: { axis: 'Temps' },
    1: { axis: 'Daylight' }
  },
  axes: {
    y: {
      Temps: { label: 'Temps (Celsius)' },
      Daylight: { label: 'Daylight' }
    }
  }
};

const classicOptions = {
  title: 'Average Temperatures and Daylight in Iceland Throughout the Year',
  width: 900,
  height: 500,
  series: {
    0: { targetAxisIndex: 0 },
    1: { targetAxisIndex: 1 }
  },
  vAxes: {
    0: { title: 'Temps (Celsius)' },
    1: { title: 'Daylight' }
  },
  hAxis: {
    ticks: [
      new Date(2014, 0),
      new Date(2014, 1),
      new Date(2014, 2),
      new Date(2014, 3),
      new Date(2014, 4),
      new Date(2014, 5),
      new Date(2014, 6),
      new Date(2014, 7),
      new Date(2014, 8),
      new Date(2014, 9),
      new Date(2014, 10),
      new Date(2014, 11)
    ]
  },
  vAxis: {
    viewWindow: {
      max: 30
    }
  }
};

const PaymentActivity = () => {
  const [show, setShow] = useState(false);
  const [colorSelected1, setColorSelected1] = useState("");
  const [colorSelected2, setColorSelected2] = useState("");
  const [colorSelected3, setColorSelected3] = useState("");
  const [colorSelected4, setColorSelected4] = useState("");

  const changeColorOnSelection = (field) => {
    if (field === "gmas-kpis") {
      setColorSelected3("YellowColor");
    } else if (field === "Reporting") {
      setColorSelected2("YellowColor");
    } else if (field === "payment-activity") {
      setColorSelected1("YellowColor");
    } else if (field === "Monitor_Submission") {
      setColorSelected4("YellowColor");
    } else if (field === "") {
      setColorSelected1("");
    }
  }

  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        role="button"
        tabIndex="-3"
      >
        {hover ? "SKILLS" : <img src={countries.get("India")} alt=" india" width="60" height="60" />}
      </div>

      <section>
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="col-md-6" pt-2 pt-lg-0 order-2 order-1></div>

            <div className='payment-activity-table-design'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Credit Amount</th>
                    <th>Debit Amount</th>
                    <th>Number of payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Opt-Blue(JPM/WF)</td>
                    <td>$919,764,075.22</td>
                    <td>$2.00</td>
                    <td>279</td>
                  </tr>
                  <tr>
                    <td>Prop SOP (WF)</td>
                    <td>$523,131,171.78</td>
                    <td>$1,138,627.89</td>
                    <td>32,981</td>
                  </tr>
                  <tr>
                    <td>Prop NSOP(WF)</td>
                    <td>1,281,811,892.73</td>
                    <td>$5,152,195.45</td>
                    <td>161,791</td>
                  </tr>
                  <tr>
                    <td>BIP</td>
                    <td>$24,826,695.35</td>
                    <td>$108,452.23</td>
                    <td>393</td>
                  </tr>
                  <tr>
                    <td>Late-SOP</td>
                    <td>$583,319,069.71</td>
                    <td>$5,265,243.50</td>
                    <td>169,084</td>
                  </tr>
                  <tr>
                    <td>Total US</td>
                    <td>$3,332,852,904.79</td>
                    <td>$11,664,521.07</td>
                    <td>364,528</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="line-chart-design">
              <h2>US Payment Amount Trending for Last 10 Days</h2>
              <Chart
                height={'380px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={LineData}
                options={LineChartOptions}
                rootProps={{ 'data-testid': '2' }}
              />
            </div>

            <div>
              <Button className="button" href="/REPORTING" variant="primary">NEXT</Button>{' '}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentActivity;
