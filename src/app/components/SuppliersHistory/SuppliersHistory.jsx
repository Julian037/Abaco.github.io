import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import {rows} from './DataSuppliersHistory'
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import useStyles from "./SuppliersHistoryStyle";

import AddProductModal from '../AddProductModal/AddProductModal';
import AddSupplierModal from '../AddSupplierModal/AddSupplierModal';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import handleMessage from '../../../helpers/handleMessage';
import EditSupplierModal from '../EditSupplierModal/EditSupplierModal';

const SuppliersHistory = () => {

  const classes = useStyles();
  const theme = useTheme();
  const themeWithLocale = () => ( createTheme(theme, locales['esES']) )

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedID, setSelectID] = useState(null);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const obtenerEmpleados = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/proveedores');
      setProveedores(response.data);
    } catch (error) {
       handleMessage("Error al obtener información de proveedores desde la base de datos", "error", enqueueSnackbar);
    }
  };


  const columns = [
    { id: 'id', label: 'NIT', minWidth: 100 },
    { id: 'name', label: 'Nombre', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'address', label: 'Dirección', minWidth: 100 },
    { id: 'phone', label: 'Teléfono', minWidth: 100 },
    { id: 'edit', label: 'Editar', minWidth: 100 },
    { id: 'delete', label: 'Eliminar', minWidth: 100 },
  ];

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }


  const handleOpen = () => setOpen(true);
  const handleOpenModalEdit = (id) => {
    setSelectID(id)
    setOpenModalEdit(true)

  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/proveedores/${id}`)
      alert('Empleado eliminado exitosamente');
    } catch (error) {
      console.error('Ha ocurrido un error inesperado', error);
    }
  };

  return (
    <>
      <AddSupplierModal 
       open={open}
       setOpen={setOpen}
      
      />

      <EditSupplierModal 
       open={openModalEdit}
       setOpen={setOpenModalEdit}
       selectedID={selectedID}
      />        

      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        className={classes.button}
        onClick={handleOpen}
      >
        Registrar proveedor
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          <TableBody>
            {(proveedores).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.nit}
                </TableCell>
                <TableCell  align="left">
                  {row.name}
                </TableCell>
                <TableCell >
                  {row.email}
                </TableCell>
                <TableCell >
                  {row.address}
                </TableCell>
                <TableCell >
                  {row.phone}
                </TableCell>
                <TableCell  align="center">
                  <IconButton
                    onClick={() => handleOpenModalEdit(row._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell  align="center">
                  <IconButton
                    onClick={() => handleDelete(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
            <ThemeProvider theme={themeWithLocale}>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: `${rows.length}`, value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
              </ThemeProvider>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default SuppliersHistory;
