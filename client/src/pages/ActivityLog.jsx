import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomTable from '../component/CustomTable';

const ActivityLog = () => {
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    axios.get("/activity-log").then(({data}) => {
      setActivityLog(data.reverse());
    })
  }, [])

  const columns = [
    { field: "action", filter: "action", header: "ACTION" },
    { body: "dateFormat", filter: "date", header: "DATE" }
  ];

  return (
    <div className='side-margin'>
      <CustomTable columns={columns} dataValue={activityLog} name="activity logs"/>
    </div>
  )
}

export default ActivityLog