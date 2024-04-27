import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import DataTable from 'react-data-table-component';

function Clients() {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(userData);
      setRecords(userData);
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
    const inputValue = event.target.value.toLowerCase();
    const newData = users.filter(row => {
        return row.FullName.toLowerCase().includes(inputValue);
    });
    setRecords(newData);
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

export default Clients;
