import { Typography, Button } from "antd";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { db } from "../../firebase-config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";


const PaginationComponent = ({ rowsPerPageText, rangeSeparatorText, noRowsPerPage, currentPage, totalPages, onChangeRowsPerPage, onChangePage }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Button onClick={() => onChangePage(currentPage - 1)} disabled={currentPage === 1}>
      Précédent
    </Button>
    <span style={{ margin: '0 10px' }}>
      Page {currentPage} sur {totalPages}
    </span>
    <Button onClick={() => onChangePage(currentPage + 1)} disabled={currentPage === totalPages}>
      Suivant
    </Button>
  </div>
);

function Commandes() {
  const [data, setData] = useState([]);
  const commandesCollectionRef = collection(db, "Commandes");

  useEffect(() => {
    const fetchCommandes = async () => {
      const data = await getDocs(commandesCollectionRef);
      const commandesData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        laivr: doc.data().delivery || false,
      }));
      setData(commandesData);
    };
    fetchCommandes();
  }, []);

  const columns = [
    { name: 'Client', selector: row => row['name_user'] ,grow : 2},
    { 
      name: 'Produit', 
      selector: row => row.products.map((product, index) => (
        <div key={index}>
          {product.name} (Quantité: {product.quantity}) ({product.price})
        </div>
      )) ,grow:6
    },{ name: 'Date', selector: row => new Date(row.date?.toDate()).toLocaleDateString() },
    {  name: 'Prix Total', selector: row => `${row.total_price} DA` , grow : 2},
    { name: 'Adresse', selector : row=> row.Adresse },
    { name: 'Telephone', selector : row => row.Telephone},
    {
      name: 'Etat de livraison',
      cell: row => {
        return row.delivery ? 'Livrée' : 'En cours';
      }
    },
    {
      name: 'Valider la livraison',
      cell: row => (
        <Button
          type={row.delivery ? 'primary' : 'default'}
          onClick={() => handleDeliveryValidation(row)}
        >
          {row.delivery ? 'Livrée' : 'Valider'}
        </Button>
      ),
    },
  ];

  const handleDeliveryValidation = async (row) => {
    // If the current value is already true ("Livrée"), do nothing
    if (row.delivery === true) {
      return;
    }

    // Toggle the value
    const updatedValue = !row.delivery;

    // Update the document only if the current value is false
    if (!row.delivery) {
      const docRef = doc(db, 'Commandes', row.id);
      try {
        // Update the laivr field of the document to updatedValue
        await updateDoc(docRef, { delivery: updatedValue });
        console.log('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
        return;
      }
    }

    // Update the local state to reflect the change
    const updatedData = data.map((item) => {
      if (item.id === row.id) {
        return { ...item, delivery: updatedValue };
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
            /*selectableRows*/
            fixedHeader
            pagination
            paginationPerPage={5} // Limite le nombre de lignes par page à 5
            paginationComponent={PaginationComponent}
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}

export default Commandes;