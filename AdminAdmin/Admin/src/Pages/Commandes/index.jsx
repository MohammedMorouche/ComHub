import { Typography } from "antd";
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
function Commandes(){
    
    const columns=[
        {name: 'Client',selector : row=>row.Client},
        {name:'Produit',selector : row=>row.Produit},
        {name:'Date',selector : row=>row.Date},
        {name:'Prix Total',selector : row=>row.Prix},
        {name: 'Etat de laivraison',selector:row=>row.laiv}
    ];




    const data=[
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'},
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'},
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'},
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'},
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'},
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'},
        {Client:'Abdessamad',Produit : 'PC',Date:'15/03/2024',Prix:'80000 DA',laiv:'en cours'}

    ]

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




    return (
        <div>
            <Typography.Title >commandes</Typography.Title>
            <div className='ClientStyle'>

   
<DataTable

columns={columns}
data={data}
customStyles={customStyles}
selectableRows
fixedHeader
pagination
selectableRowsHighlight
highlightOnHover

   />

  </div>







        </div>
    );
}
export default Commandes