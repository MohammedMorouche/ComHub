import { Space, Typography } from "antd";
import DataTable from 'react-data-table-component';
import { useState, useEffect } from "react";
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"

function clients() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      
    }
    getUsers()
  }, [])

  const columns = [
    { name: 'Id', selector: row => row.id, sortable: true },
    { name: 'User Name', selector: row => row.FullName, sortable: true },
    { name: 'Email Address', selector: row => row.Email, sortable: true },
    { name: 'Address', selector: row => row.Adresse, sortable: true },
    { name: 'Phone Number', selector: row => row.Telephone, sortable: true }
  ];

  const customStyles = {
    headRow: {
      style: {
        background: 'lightcyan',
        color: 'Black'
      }
    },
    headCells: {
      style: {
        color: 'black',
        fontsize: '16px',
        fontWeight: '600'
      }
    },
    rows: {
      style: {
        background: 'skyblue',
        fontsize: '16px',
        minHeight: '56px',
      }
    },
    Cells: {
      style: {
        fontsize: '16px'
      }
    }
  };

  function handleFilter(event) {
    const newData = users.filter(row => {
      const rowValues = `${row.FullName} ${row.Email}`.toLowerCase();
      return rowValues.includes(event.target.value.toLowerCase());
    });
    setUsers(newData);
  }

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
          data={users}
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