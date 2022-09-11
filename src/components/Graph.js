import React,{ useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';


function Graph(props) {
 

const hours = new Date(props.device.created_at).getHours()
const minutes = new Date(props.device.created_at).getMinutes()
const seconds = new Date(props.device.created_at).getSeconds()
  


  const chartData = {
    labels: [ 'Hours', 'Minutes', 'Seconds'],
    datasets: [
      {
        label: 'Total',
        backgroundColor: [ 'green', 'blue', 'red'],
        hoverBackgroundColor: ['gray'],
        data: [
          hours,
          minutes,
          seconds
        ],
      },
    ],
  };

  const handleCloseQuestion = () => {
    props.parentHandleCloseModal();
  };

  return (
    <div className="App pt-3">
      <div className="container">
     
      <div className="mb-3">
                  <button
                    type="button"
                    onClick={handleCloseQuestion}
                    className="btn btn-outline-dark float-end"
                  >
                    Close
                  </button>
                </div>
          <div className="col-lg-5 col-md-6 m-auto ">
            <Chart type="bar" data={chartData} />
          </div>
          
          
      </div>
    </div>
  );
}

export default Graph;
