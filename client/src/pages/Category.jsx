import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomTable from '../component/CustomTable';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [tableAction, setTableAction] = useState("");

  useEffect(() => {
    axios.get("/category").then(({data}) => {
      setCategoryData(data.reverse());
      setTableAction("");
    })
  }, [tableAction])

  const columns = [
    { field: "name", filter: "name", header: "ITEM NAME" },
    { body: "actionButtons", header: "" },
  ];

  return (
    <div className='side-margin'>
      <CustomTable columns={columns} dataValue={categoryData} name="category" setTableAction={setTableAction}/>
    </div>
  )
}

export default Category