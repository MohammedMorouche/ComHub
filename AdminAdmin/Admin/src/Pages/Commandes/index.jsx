import { Typography, Button } from "antd";
import React, { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config"
import { collection, getDocs,addDoc , doc, updateDoc} from "firebase/firestore"


function Commandes() {
  const [data, setData] = useState([]);
  const commandesCollectionRef = collection(db, "Commande"); // Replace "Commandes" with your actual collection name

  useEffect(() => {
    const fetchCommandes = async () => {
      const data = await getDocs(commandesCollectionRef);
      const commandesData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        laivr: doc.data().laivr || false, // Initialize the laivr field with false
      }));
      setData(commandesData);
    };
    fetchCommandes();
  }, []);

  const columns = [
    { name: 'Client', selector: row => row.User },
    { name: 'Produit', selector: row => row.Produit },
    { name: 'Date', selector: row => new Date(row.Date?.toDate()).toLocaleDateString() },
    { name: 'Prix Total', selector: row => row['Prix total'] },
    { 
      name: 'Etat de laivraison', 
      cell: row => {
        return row.laivr ? 'laivrai' : 'en cours';
      }
    },
    { 
      name: 'Valider la livraison', 
      cell: row => (
        <Button 
          type={row.laivr ? 'primary' : 'default'} 
          onClick={() => handleDeliveryValidation(row)}
        >
          {row.laivr ? 'Livrée' : 'Valider'}
        </Button>
      ),
    },
  ];
  

  const handleDeliveryValidation = async (row) => {
    // If the current value is already true ("laivrai"), do nothing
    if (row.laivr === true) {
        return;
    }

    // Toggle the value
    const updatedValue = !row.laivr;

    // Update the document only if the current value is false
    if (!row.laivr) {
        const docRef = doc(db, 'Commande', row.id);
        try {
            // Update the laivr field of the document to updatedValue
            await updateDoc(docRef, { laivr: updatedValue });
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
            return;
        }
    }

    // Update the local state to reflect the change
    const updatedData = data.map((item) => {
        if (item.id === row.id) {
            return { ...item, laivr: updatedValue };
        }
        return item;
    });

    // Update the state
    setData(updatedData);
};


  


  const customStyles = {
    headRow: {
      style: {
        background: "lightcyan",
        color: "Black",
      },
    },
    headCells: {
      style: {
        color: "black",
        fontsize: "16px",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        background: "skyblue",
        fontsize: "16px",
        minHeight: "56px",
      },
    },
    Cells: {
      style: {
        fontsize: "16px",
      },
    },
  };

  return (
    <>
      <div className="dash1-container">
        <div className="dash1">Commandes</div>
      </div>
      <div>
        <div className="tablestyle">
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            selectableRows
            fixedHeader
            /*pagination*/
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}

export default Commandes;