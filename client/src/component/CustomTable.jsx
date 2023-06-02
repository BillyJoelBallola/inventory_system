import React, { useEffect, useState } from 'react'
import axios from 'axios'; 

import { FilterMatchMode } from 'primereact/api';
import { ConfirmPopup } from 'primereact/confirmpopup'; 
import { confirmPopup } from 'primereact/confirmpopup';
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";

import InventoryDialog from './InventoryDialog';
import CategoryDialog from './CategoryDialog';
import AcccountDialog from './AcccountDialog';
import userImage from "../assets/user.webp";
import Table from './Table';

const CustomTable = ({ columns, dataValue, name, setTableAction, customerHeader, tableRef}) => {
    const [visible, setVisible] = useState(false);
    const [editInfo, setEditInfo] = useState(null);
    const [category, setCategory] = useState(null);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const toastMsgBox = (severity, detail ) => {
        switch(severity){
            case "info":
                toast.info(detail, { position: toast.POSITION.TOP_RIGHT });
                break;
            case "success":
                toast.success(detail, { position: toast.POSITION.TOP_RIGHT });
                break;
            case "warning":
                toast.warning(detail, { position: toast.POSITION.TOP_RIGHT });
                break;
            case "error":
                toast.error(detail, { position: toast.POSITION.TOP_RIGHT });
                break;
            default:
                break;
        }
    }  

    useEffect(() => {
        if(!category){
            axios.get("/category").then(({data}) => {
                setCategory(data);
            })
        }
    }, [])

    const handleDelete = (e, id) => {
        confirmPopup({
            target: e.currentTarget,
            message: `Do you want to delete this ${name === "inventory" ? "item" : "category"}?`,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    await axios.delete(`/${name}/${id}`)
                    setTableAction("delete");
                    toastMsgBox("success", "Successfully Deleted.");
                } catch (error) {
                    toastMsgBox("error", "Failed to delete.");
                }
          
            },
        });
    }

    const actionButtons = (rowData) => {
        const { id } = rowData;

        const handleEdit = () => {
            setEditInfo(rowData);
            setVisible(true);
        }

        return (
            <>
                <ConfirmPopup />
                <div className="flex gap-4 justify-center items-center">
                    <button className="hover:text-blue-400" onClick={handleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button className="hover:text-red-400" onClick={(e) => handleDelete(e, id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </>
        )
    }

    const statusStyle = (rowData) => {
        const { quantity } = rowData;

        if(quantity <= 20){
            return <div className='w-4 aspect-square rounded-full bg-red-400' />
        }
        if(quantity <= 40){
            return <div className='w-4 aspect-square rounded-full bg-yellow-400' />
        }
        if(quantity >= 50){
            return <div className='w-4 aspect-square rounded-full bg-green-400' />
        }
    }

    const dateFormat = (rowData) => {
        const { date } = rowData;
        return <span>{moment(date).format("lll")}</span> 
    }

    const imageFormat = (rowData) => {
        const { image } = rowData;

        return (
            <div className='w-10 aspect-square overflow-hidden rounded-full border-2 border-gray-300'>
                <img src={image ? `http://localhost:4000/uploads/${image}` : userImage} alt="user-image" className='object-contain'/>
            </div>
        )
    }

    return (
        <>
           { 
                name === "inventory" &&
                <InventoryDialog 
                    visible={visible}
                    setVisible={setVisible}
                    category={category}
                    toastMsgBox={toastMsgBox}
                    setTableAction={setTableAction}
                    editInfo={editInfo}
                    setEditInfo={setEditInfo}
                />
            }
            { 
                name === "category" &&
                <CategoryDialog 
                    visible={visible}
                    setVisible={setVisible}
                    toastMsgBox={toastMsgBox}
                    setTableAction={setTableAction}
                    editInfo={editInfo}
                    setEditInfo={setEditInfo}
                />
            }
            { 
                name === "accounts" &&
                <AcccountDialog 
                    visible={visible}
                    setVisible={setVisible}
                    toastMsgBox={toastMsgBox}
                    setTableAction={setTableAction}
                    editInfo={editInfo}
                    setEditInfo={setEditInfo}
                />
            }
            <ToastContainer 
                hideProgressBar={true}
                draggable={true}
            />
            <div className='grid gap-6'>
                {
                    name === "inventory report" ?
                    customerHeader()
                    :
                    <div className='mt-4 flex gap-2 flex-col justify-between items-left md:flex-row'>
                        <span className='uppercase font-semibold text-2xl'>{name}</span>
                        <div className='flex gap-2'>
                            {
                                name !== "activity logs" && name !== "inventory report" &&
                                <>
                                    <button className='btn-primary' onClick={() => setVisible(true)}>ADD</button>
                                    <div className="h-8 w-[1px] bg-gray-300 block max-md:hidden"/>
                                </>
                            }
                            {
                                name !== "inventory report" &&
                                <input
                                    type="search"
                                    placeholder="Type to search"
                                    className="text-sm py-1 px-2 rounded-md border border-gray-300 w-full"
                                    onChange={(e) => setFilters({global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS }})}
                                />
                            }
                        </div>
                    </div>
                }
                <Table 
                    columns={columns} 
                    dataValue={dataValue} 
                    filters={filters} 
                    actionButtons={actionButtons} 
                    statusStyle={statusStyle} 
                    dateFormat={dateFormat} 
                    imageFormat={imageFormat}
                    tableRef={tableRef}/>
            </div>
        </>
    )
}

export default CustomTable