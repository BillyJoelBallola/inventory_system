import React, { useEffect, useState } from 'react';
import axios from "axios";
import CustomTable from '../component/CustomTable';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [tableAction, setTableAction] = useState("");

  useEffect(() => {
    axios.get("/inventory").then(({data}) => {
      setInventoryData(data.reverse());
      setTableAction("");
    })
  }, [tableAction])

  const columns = [
    { field: "name", filter: "name", header: "ITEM NAME" },
    { field: "description", filter: "description", header: "DESCRIPTION" },
    { field: "category", filter: "category", header: "CATEGORY" },
    { field: "quantity", filter: "quantity", header: "# QTY" },
    { body: "itemStatus", header: "" },
    { body: "actionButtons", header: "" },
  ];

  return (
    <div className='side-margin'>
      <CustomTable columns={columns} dataValue={inventoryData} name="inventory" setTableAction={setTableAction}/>
    </div>
  )
}

export default Inventory