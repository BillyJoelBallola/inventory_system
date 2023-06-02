import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import CustomTable from '../component/CustomTable';
import { UserContext } from "../context/UserContext";

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [tableAction, setTableAction] = useState("");
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    axios.get("/accounts").then(({data}) => {
      const accData = data.filter((item) => item.id !== currentUser?.id);
      setAccounts(accData.reverse());  
      setTableAction("");
    })
  }, [tableAction])

  const columns = [
    { body: "imageFormat", header: "" },
    { field: "name", filter: "name", header: "NAME" },
    { field: "username", filter: "username", header: "USERNAME" },
    { body: "actionButtons", header: "" }
  ];

  return (
    <div className='side-margin'>
      <CustomTable columns={columns} dataValue={accounts} name="accounts" setTableAction={setTableAction}/>
    </div>
  )
}

export default Account