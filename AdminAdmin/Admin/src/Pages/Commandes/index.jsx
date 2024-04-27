import { Typography, Button } from "antd";
import React, { useState } from "react";
import DataTable from "react-data-table-component";

function Commandes() {
  const [data, setData] = useState([
    { Client: "Abdessamad", Produit: "PC", Date: "15/03/2024", Prix: "80000 DA", laiv: "en cours", laivr: false },
    { Client: "Abdessamad", Produit: "PC", Date: "15/03/2024", Prix: "80000 DA", laiv: "en cours", laivr: false },
    { Client: "Abdessamad", Produit: "PC", Date: "15/03/2024", Prix: "80000 DA", laiv: "en cours", laivr: false },
    { Client: "Abdessamad", Produit: "PC", Date: "15/03/2024", Prix: "80000 DA", laiv: "en cours", laivr: false },
    { Client: "Abdessamad", Produit: "PC", Date: "15/03/2024", Prix: "80000 DA", laiv: "en cours", laivr: false },
    { Client: "Abdessamad", Produit: "PC", Date: "15/03/2024", Prix: "80000 DA", laiv: "en cours", laivr: false },
  ]);

  const columns = [
    { name: "Client", selector: (row) => row.Client },
    { name: "Produit", selector: (row) => row.Produit },
    { name: "Date", selector: (row) => row.Date },
    { name: "Prix Total", selector: (row) => row.Prix },
    { name: "Etat de laivraison", selector: (row) => row.laiv },
    {
      name: "Valider la livraison",
      cell: (row) => (
        <Button type={row.laivr ? "primary" : "default"} onClick={() => handleDeliveryValidation(row)}>
          {row.laivr ? "Livrée" : "Valider"}
        </Button>
      ),
    },
  ];

  const handleDeliveryValidation = (row) => {
    const updatedData = data.map((item) => {
      if (item === row) {
        return { ...item, laivr: !item.laivr, laiv: item.laivr ? "en cours" : "livrée" };
      }
      return item;
    });
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
            pagination
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div>
    </>
  );
}

export default Commandes;