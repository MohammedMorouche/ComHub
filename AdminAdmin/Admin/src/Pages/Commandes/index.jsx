import { Typography, Button } from "antd";
import React, { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"


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
    { name: "Client", selector: (row) => row.User },
    { name: "Produit", selector: (row) => row.Produit },
    { name: "Date", selector: (row) => new Date(row.Date?.toDate()).toLocaleDateString() }, // Format the date
    { name: "Prix Total", selector: (row) => row["Prix total"] },
    { name: "Etat de laivraison", selector: (row) => (row.laivr ? "livrée" : "en cours") },
    {
      name: "Valider la livraison",
      cell: (row) => (
        <Button type={row.laivr ? "primary" : "default"} onClick={() => handleDeliveryValidation(row)}>
          {row.laivr ? "Livrée" : "Valider"}
        </Button>
      ),
    },
  ];

  const handleDeliveryValidation = async (row) => {
    const updatedData = data.map((item) => {
        if (item.id === row.id) {
            
            return { ...item, laivr: !item.laivr };
        }
        return item;
    });
    setData(updatedData);

    try {
        // Update database
        const docRef = doc(db, "Commande", row.id);
        await updateDoc(docRef, {
            laivr: !row.laivr,
        });
        
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
        // Handle error
    }
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