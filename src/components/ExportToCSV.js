import React from 'react';
import { CSVLink } from "react-csv";
 


const ExportToCSV =(props) => {

const headers = [
  { label: "Device Mac Id", key: "macid" },
  { label: "Device Type", key: "type" },
  { label: "Device Info", key: "info" },
  { label: "Time", key: "time" },
  { label: "Tds", key: "tds" }
];
 
const data = [
];


for (let index = 0; index < props.listData.length; index++) {
    let single_obj = {};
    single_obj.macid = props.listData[index].device.macid;
    single_obj.type = props.listData[index].device.type;
    single_obj.info = props.listData[index].device.info;
    single_obj.time = new Date(props.listData[index].created_at).toLocaleString();
    single_obj.tds = JSON.parse(props.listData[index].desc.replaceAll("'", '"')).tds;

    data.push(single_obj);
  }

 
const csvReport = {
  data: data,
  headers: headers,
  filename: 'Device_Telemetry_Report.csv'
};
 
  return (
    <div className='d-flex ms-4 mt-4'>
     
     <p className='mt-2'>Export to CSV</p>
      <CSVLink {...csvReport} style={{'fontSize' : '25px'}}><i className="fa-sharp fa-solid fa-file-arrow-down ms-2"></i></CSVLink>
    </div>
  );
}
 
export default ExportToCSV;