import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getAllProducts,
  getProductById,
  delProduct,
  updProduct,
  changeStateTrue,
  changeStateFalse,
} from "../features/productSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, productList,product,error, updateState, response } = useSelector(
    (state) => state.productKey
  );
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      addProduct({
        name: name,
        price: price,
      })
    );
    handleClickSnackbar();
    setName("");
    setPrice("");
  };

  const updtProduct = (item) => {
    setId(item._id);
    setName(item.name);
    setPrice(item.price);
    dispatch(changeStateTrue());
  };

  const updateForm = () => {
    dispatch(updProduct({ id: id, name: name, price: price }));
    dispatch(changeStateFalse());
    handleClickSnackbar();
    setId("");
    setName("");
    setPrice("");
  };

  const deltProduct = (id) => {
    dispatch(delProduct(id));
    handleClickSnackbar();
  };
 
  const [open, setOpen] = useState(false);
  const handleClickSnackbar = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 5,
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "55%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "8px",
          }}
        >
          <TextField
            sx={{ color: "white" }}
            variant="outlined"
            size="small"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          {updateState ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                updateForm(e);
              }}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Add
            </Button>
          )}
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "16px" }}>
          <Table sx={{ minWidth: 659 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    No
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    price
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography sx={{ fontWeight: 600, color: "white" }}>
                    Product
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? <TableCell> Loading... </TableCell> : null}
              {!loading && productList.length === 0 ? (
                <TableCell> No Records </TableCell>
              ) : null}
              {!loading && error ? <TableCell> {error} </TableCell> : null}
              {productList &&
                productList.map((item, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="left">
                      <Typography> {index + 1} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography> {item.name} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography> {item.price} </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Box sx={{ display: "flex", cursor: "pointer" }}>
                        <Box
                          sx={{ color: "black", mr: 1 }}
                          onClick={() => updtProduct(item)}
                        >
                          <EditIcon />
                        </Box>
                        <Box
                          sx={{ color: "red" }}
                          onClick={() => deltProduct(item._id)}
                        >
                          <DeleteIcon />
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {response === "add"
            ? "product added successfully"
            : response === "delete"
            ? "product delete successfully"
            : response === "update"
            ? "product update successfully"
            : null}
        </Alert>
      </Snackbar>
    </Box>
  );
}