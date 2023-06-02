import React, { useEffect, useRef, useState } from 'react'
import CustomTable from '../component/CustomTable';
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import axios from 'axios';

const Report = () => {
  const tableRef = useRef(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [dates, setDates] = useState({
    from: "",
    to: ""
  })  

  const printTable = useReactToPrint({
    content: () => tableRef.current,
    documentTitle: "Inventory Report",
  })

  const fetchFilterdData = () => {
    if(dates.from === "") return setInventoryData([]); 
    if(dates.to){
      axios.post("/date_filter", dates).then(({data}) => {
        setInventoryData(data.reverse());
      })
    }
  }

  useEffect(() => {
    fetchFilterdData();
  }, [dates.from, dates.to])

  const renderCustomerTableHeader = () => {
    return (
      <div className='mt-4 flex flex-col gap-4 md:gap-0 justify-between items-left md:flex-row'>
        <span className='uppercase font-semibold text-2xl'>inventory report</span>
        <div className='flex gap-4'>
            <div className='flex gap-1 bg-gray-100 rounded-lg'>
                <input type="date" name='dateFrom' value={dates.from} onChange={(e) => setDates(prev => ({...prev, from: e.target.value}))}/>
                <div className='flex items-center font-semibold text-gray-400'>
                    <span className='px-2'>FROM</span>
                    <div className="h-8 w-[1px] bg-gray-300 block max-md:hidden"/>
                    <span className='px-2'>TO</span>
                </div>
                <input type="date" name='dateTo' value={dates.to} onChange={(e) => setDates(prev => ({...prev, to: e.target.value}))}/>       
            </div>
            <div className="h-8 w-[1px] bg-gray-300 block max-md:hidden"/>
            <div className='hidden md:flex gap-2'>
              <button onClick={printTable} className='bg-blue-300 hover:bg-blue-200 p-2 grid place-items-center rounded-full shadow-lg '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                  </svg>
              </button>
              <CSVLink data={inventoryData} className='bg-green-300 hover:bg-green-200 p-2 grid place-items-center rounded-full shadow-lg '>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-spreadsheet" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                  <path d="M8 11h8v7h-8z"></path>
                  <path d="M8 15h8"></path>
                  <path d="M11 11v7"></path>
                </svg>
              </CSVLink>
            </div>
        </div>
      </div>
    )
  }

  const columns = [
    { field: "name", filter: "name", header: "ITEM NAME" },
    { field: "description", filter: "description", header: "DESCRIPTION" },
    { field: "category", filter: "category", header: "CATEGORY" },
    { field: "quantity", filter: "quantity", header: "# QTY" }
  ];
  
  return (
    <div className='side-margin'>
        <CustomTable columns={columns} dataValue={inventoryData} name="inventory report" customerHeader={renderCustomerTableHeader} tableRef={tableRef} />
    </div>
  )
}

export default Report