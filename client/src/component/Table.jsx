import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Table = (({ columns, dataValue, filters, actionButtons, statusStyle, dateFormat, imageFormat, tableRef}) => {
    return (
        <div ref={tableRef} className='overflow-auto'>
            <DataTable
                value={dataValue}
                filters={filters}
                globalFilterFields={columns.map((item) => (item.filter))}
                rows={10}
                selectionMode='checkbox'
                paginator
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
                {
                    columns.map((item, idx) => (
                        <Column
                        key={idx}
                        header={item.header}
                        field={item.field}
                            body={
                                item.body === "actionButtons" ?
                                actionButtons :
                                item.body === "itemStatus" ?
                                statusStyle :
                                item.body === "dateFormat" ? 
                                dateFormat :
                                item.body === "imageFormat" ? 
                                imageFormat : null
                            }
                            />
                            ))
                        }
            </DataTable>
        </div>
    );
});

export default Table