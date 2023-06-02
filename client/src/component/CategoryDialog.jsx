import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog';
import axios from 'axios';

const CategoryDialog = ({ visible, setVisible, toastMsgBox, setTableAction, editInfo, setEditInfo }) => {
    const [category, setCategory] = useState({
        name: ""
    });
    
    useEffect(() => {
        if(editInfo){
            setCategory(editInfo);
        }
    }, [editInfo])

    const handleAddCategory = (e) => {
        e.preventDefault();

        if(category.name === ""){
            return toastMsgBox("warning", "Fill up all fields.");
        }

        axios.post("/add_category", category).then((res) => {
            setVisible(false);
            setTableAction('add');
            toastMsgBox("success", "Successfully saved.");
        }).catch((err) => {
            setVisible(false);
            setTableAction('add');
            toastMsgBox("error", "Failed to save.");
        })
    }

    const handleEditCategory = (e) => {
        e.preventDefault();

        if(category === ""){
            return toastMsgBox("warning", "Fill up all fields.");
        }

        axios.put("/update_category", category).then((res) => {
            setVisible(false);
            setTableAction('edit');
            setEditInfo(null)
            toastMsgBox("success", "Eited Successfully.");
        }).catch((err) => {
            setVisible(false);
            setTableAction('edit');
            setEditInfo(null)
            toastMsgBox("error", "Failed to edit.");
        })
    }

    const inputForm = (e) => {
        setCategory((prev) => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Dialog 
            className='w-[50%]'
            header="Category" 
            visible={visible}
            draggable={false}
            onHide={() => {
                setVisible(false)
                setEditInfo(null)
                setCategory({name: ""})   
            }}>
            <form className='grid gap-4' onSubmit={editInfo ? handleEditCategory : handleAddCategory}>
                <div className='grid gap-2'>
                    <label>CATEGORY NAME</label>
                    <input type="text" placeholder='Name' name='name' onChange={inputForm} value={category.name}/>
                </div>
                <button className='btn-primary mt-6 py-2'>{editInfo ? "SAVE EDIT" : "SAVE"}</button>
            </form>
        </Dialog>
    )
}

export default CategoryDialog