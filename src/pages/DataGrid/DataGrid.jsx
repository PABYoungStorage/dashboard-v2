import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
// import { userData } from '../../data';
import "./DataGrid.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const DataGrid = () => {
  const [userData, setuserData] = useState([]);
  useEffect(() => {
    const userData = async () => {
      let users = await fetch("http://localhost:3000/api/users")
        .then((res) => res.json())
        .catch((a) => alert(a));
      setuserData(users.message);
    };
    userData();
  }, []);
  const columns = useMemo(() => [
    {
      accessorKey: "username",
      header: "First Name",
    },
    {
      accessorKey: "email", //normal accessorKey
      header: "Email",
    },
    {
      accessorKey: "number",
      header: "Number",
    },
    {
      accessorKey: "state",
      header: "State",
    },
  ]);
  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: "dark",
      },
    })
  );

  return (
    <div className="table-container">
      <ThemeProvider theme={theme}>
        <MaterialReactTable columns={columns} data={userData} />
      </ThemeProvider>
    </div>
  );
};

export default DataGrid;
