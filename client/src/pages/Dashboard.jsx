import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState } from 'react';
import axios from "axios";
import moment from 'moment';

const Dashboard = () => {
  const [recentActivity, setRecentActivity] = useState({
    stock: "",
    user: "",
    activity: []
  });

  useEffect(() => {
    axios.get("/item_number").then(({ data }) => {
      setRecentActivity(prev => ({...prev, stock: data.STOCK}));
    })
    axios.get("/user_number").then(({ data }) => {
       setRecentActivity(prev => ({...prev, user: data.USER}));
    })
    axios.get("/recent_activity").then(({ data }) => {
       setRecentActivity(prev => ({...prev, activity: data}));
    })
  }, [])

  const columns = [
    { field: "action", header: "ACTION" },
    { body: "dateFormat", header: "DATE" }
  ];

  const dateFormat = (rowData) => {
    const { date } = rowData;
    return <span>{moment(date).format("lll")}</span> 
  }


  return (
    <div className='side-margin'>
      <div className='pt-4'>
        <span className='uppercase font-semibold text-2xl'>DASHBOARD</span>
      </div>
      <div className='grid gap-4 mt-6 md:gap-8 md:grid-cols-2'>
        <div className='py-6 px-8 border border-gray-300 rounded-lg'>
          <span className='text-2xl font-semibold'>Inventory Stocks</span>
          <div className='mt-4 flex gap-4 items-center'>
            <div className='bg-gray-200 rounded-lg p-2 text-violet-400 self-end'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div className='grid'>
              <span className='text-gray-500 text-sm'>Number of items</span>
              <span className='text-4xl font-semibold'>{recentActivity.stock}</span>
            </div>
          </div>
        </div>
        <div className='py-6 px-8 border border-gray-300 rounded-lg'>
          <span className='text-2xl font-semibold'>User Accounts</span>
          <div className='mt-4 flex gap-4 items-center'>
            <div className='bg-gray-200 rounded-lg p-2 text-violet-400 self-end'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <div className='grid'>
              <span className='text-gray-500 text-sm'>Number of users</span>
              <span className='text-4xl font-semibold'>{recentActivity.user}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
          <span className='text-2xl font-semibold'>Recent Activity</span>
          <DataTable
            className='mt-4'
            value={recentActivity.activity}
          >
            {
              columns.map((item, idx) => (
                <Column 
                  key={idx}
                  header={item.header}
                  field={item.field}
                  body={item.body === "dateFormat" && dateFormat}
                />
              ))
            }
          </DataTable>
        </div>
    </div>
  )
}

export default Dashboard