import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

const InventoryDialog = ({ visible, setVisible, category, toastMsgBox, setTableAction, editInfo, setEditInfo }) => {
  const [inventoryData, setInventoryData] = useState({
    name: "",
    description: "",
    category: "",
    quantity: ""
  })

  const resetForm = () => {
    setInventoryData({
      name: "",
      description: "",
      category: "",
      quantity: ""
    })
  }

  useEffect(() => {
    if(editInfo){
      setInventoryData(editInfo);
    }
  }, [editInfo])

  const handleInventoryForm = (e) => {
    e.preventDefault();

    if(inventoryData.name === "" || inventoryData.description === "" ||
    inventoryData.category === "" || inventoryData.quantity === ""){
      return toastMsgBox("warning", "Fill up all fields.");
    }

    axios.post("/add_item", inventoryData).then((res) => {
      setTableAction("add");
      setVisible(false);
      toastMsgBox("success", "Successfully Saved.");
    }).catch((err) => {
      setTableAction("add");
      setVisible(false);
      toastMsgBox("error", "Failed to save.");
    })
  }
  
  const handleEditInventoryForm = (e) => {
    e.preventDefault();

    if(inventoryData.name === "" || inventoryData.description === "" ||
    inventoryData.category === "" || inventoryData.quantity === ""){
      return toastMsgBox("warning", "Fill up all fields.");
    }

    axios.put("/update_item", inventoryData).then((res) => {
      toastMsgBox("success", "Edited Successfully.");
      setTableAction("edit");
      setEditInfo(null)
      setVisible(false);
    }).catch((err) => {
      toastMsgBox("error", "Failed to edit.");
      setTableAction("edit");
      setEditInfo(null)
      setVisible(false);
    })
  }

  const handleInput = (e) => {
    setInventoryData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Dialog 
      className='w-[90%] md:w-[50%]'
      header="Inventory" 
      visible={visible}
      draggable={false}
      onHide={() => {
        setVisible(false)
        setEditInfo(null)
        resetForm()
        }}>
        <form className='grid gap-4' onSubmit={editInfo ? handleEditInventoryForm : handleInventoryForm}>
          <div className='grid gap-2'>
            <label>ITEM NAME</label>
            <input type="text" placeholder='Name' name='name' onChange={handleInput} value={inventoryData.name}/>
          </div>
          <div className='grid gap-2'>
            <label>DESCRIPTION</label>
            <textarea placeholder='Item description' rows="3" className='resize-none' name='description' onChange={handleInput} value={inventoryData.description}></textarea>
          </div>
          <div className='grid gap-2'>
            <label>CATEGORY</label>
            <select name='category' onChange={handleInput} value={inventoryData.category}>
              <option value="">--select category--</option>
            {
              category &&
              category.map((cat) => (
                <option value={cat.name} key={cat.id}>{cat.name}</option>
              ))
            }
            </select>
          </div>
          <div className='grid gap-2'>
            <label>QUANTITY</label>
            <input type="number" placeholder='Qty' name='quantity' onChange={handleInput} value={inventoryData.quantity}/>
          </div>
          <button className='btn-primary mt-6 py-2'>{editInfo ? "SAVE EDIT" : "SAVE"}</button>
        </form>
    </Dialog>
  )
}

export default InventoryDialog