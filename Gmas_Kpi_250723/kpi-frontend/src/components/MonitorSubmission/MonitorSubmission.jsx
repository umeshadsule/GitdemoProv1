import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './MonitorSubmission.css'; // Import CSS file for styling

const MonitorSubmission = () => {
  return (
    <>
      <img src={require('../../assets/images/united-states.png').default} alt="United States" width="60" height="60" />

      <section id="datepicker">
        <div className="container-fluid" nav_bg>
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="col-md-6 pt-2 pt-lg-0 order-2 order-1"></div>
              <h1>datepicker</h1>
              <div>
                <Table striped bordered hover className="table-design">
                  <thead>
                    <tr>
                      <th>Countries</th>
                      <th>Payments made</th>
                      <th>Disbursed</th>
                      <th>Collected</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><img src={require("../../assets/images/united-states.png").default} alt="United states" width="60" height="60" /></td>
                      <td>364,528</td>
                      <td>$3,332,852,905</td>
                      <td>$11,664,521</td>
                    </tr>
                    <tr>
                      <td><img src={require("../../assets/images/canada.png").default} alt="Canada" width="60" height="60" /></td>
                      <td>35,443</td>
                      <td>$119,300,614</td>
                      <td>$498,292</td>
                    </tr>
                    <tr>
                      <td><img src={require("../../assets/images/india.png").default} alt="India" width="60" height="60" /></td>
                      <td>5,420</td>
                      <td>₹ 1,149,640,201</td>
                      <td>$ 49,140</td>
                    </tr>
                    <tr>
                      <td><img src={require("../../assets/images/japan.png").default} alt="Japan" width="60" height="60" /></td>
                      <td></td>
                      <td>¥10,621,158,359</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div>
                <Button className="button" href="/payment-activity" variant="primary">NEXT</Button>{' '}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MonitorSubmission;
