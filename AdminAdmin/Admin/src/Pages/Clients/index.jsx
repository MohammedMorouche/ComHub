import { Space, Typography } from "antd";
import DataTable from 'react-data-table-component';
import { useState } from "react";
function clients(){
    const columns = [
        { name: 'Id', selector: row => row.Id, sortable: true },
        { name: 'User name', selector: row => row.name, sortable: true },
        { name: 'Email address', selector: row => row.Email, sortable: true },
        { name: 'Adresse', selector: row => row.adrs, sortable: true },
        { name: 'Numero' , selector : row => row.num}
    ];

    const data = [
        { Id: 1, name: 'abdessamad', Email: 'abdessama@gmail.com', adrs: 'Tlemcen',num:'9487462782'},
        { Id: 2, name: 'Mohamed', Email: 'abdessama@gmail.com', adrs: 'Tlemcen',num:'9487462782'},
        { Id: 3, name: 'mohamed', Email: 'abdessama@gmail.com', adrs: 'Tlemcen',num:'9487462782' },
        { Id: 4, name: 'mohamed', Email: 'abdessama@gmail.com', adrs: 'Tlemcen' ,num:'9487462782'},
        { Id: 5, name: 'mohamed', Email: 'abdessama@gmail.com', adrs: 'Tlemcen' ,num:'9487462782'},
        { Id: 6, name: 'mohamed', Email: 'abdessama@gmail.com', adrs: 'Tlemcen' ,num:'9487462782'},
        { Id: 7, name: 'mohamed', Email: 'abdessama@gmail.com', adrs: 'Tlemcen' ,num:'9487462782'}
    ];

    const customStyles = {
        headRow: {
            style: {
                
                background: 'lightcyan', 
                 color : 'Black'
            }
        },
        headCells: {
            style: {
                color: 'black',
                fontsize : '16px',
                fontWeight : '600'
            }
        },
        rows: {
            style: {
                background :'skyblue',
                fontsize : '16px',
                minHeight: '56px', 
                
                
                
            }
        },
        Cells :{

            style :{
                fontsize : '16px'
            }
        }
    };
    const [records, setRecords] = useState(data);
    function handleFilter (event) {
        const newData = records.filter(row => {
             return row.name.toLowerCase().includes(event.target.value.toLowerCase())})
        setRecords(newData);


    };

    return (
        <div>
             <div className="dash1-container">
        <div className="dash1">Clients</div>
      </div>
            
            <div className='search'>
                <input type="text" placeholder='Search...' onChange={handleFilter} />
            </div>
            
            
            <div className='tablestyle'>
            <DataTable
                columns={columns}
                data={records}
                customStyles={customStyles}
                selectableRows
                fixedHeader
                /*pagination*/
                selectableRowsHighlight
                highlightOnHover

            />
        </div>

        </div>
    );
}
export default clients