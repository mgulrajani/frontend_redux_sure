import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const productState = {
  updateState: false,
  loading: false,
  productList: [],
  error: "",
  response: "",
  product:{}
};


export const getAllProducts = createAsyncThunk(
"product/getAllProducts",
    async () => {
      console.log('fetching all products list')
      const response = await axios.get("http://localhost:5000/api/v1/products");
      console.log(response.data)
      return response.data;
    }
  );

  export const getProductById = createAsyncThunk(
    "product/getProductById",
        async (data) => {
          const response = await axios.get(`http://localhost:5000/api/v1/products/${data.id}`);
          return response.data;
        }
      );

  export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data) => {
      const response = await axios.post("http://localhost:5000/api/v1/products/add", {
        name: data.name,
        price: data.price,
      });
      return response.data;
    }
  );


  export const delProduct = createAsyncThunk(
    "product/deleteProduct",
    async (data) => {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/products/${data}`
      );
      return response.data;
    }
  );


  export const updProduct = createAsyncThunk(
    "product/updateProduct",
    async (data) => {
      const response = await axios.put(
        `http://localhost:5000/api/v1/products/${data.id}`,
        {
          name: data.name,
          price: data.price,
        }
      );
      return response.data;
    }
  );


  const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {
      changeStateTrue: (state) => {
        state.updateState = true;
      },
      changeStateFalse: (state) => {
        state.updateState = false;
      },
      clearResponse: (state) => {
        state.response = "";
      },
    }, 
    extraReducers: (builder) => {
        builder
          .addCase(addProduct.pending, (state) => {
            state.loading = true;
          })
          .addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.productList.push(action.payload);
            state.response = "add";
          })
          .addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });

          builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.error = action.error.message;
      });


      builder
      .addCase(getProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder.addCase(delProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (item) => item._id !== action.payload
        );
        state.response = "delete";
      });
      builder.addCase(updProduct.fulfilled, (state, action) => {
        const updateItem = action.payload;
        console.log(updateItem);
        const index = state.productList.findIndex(
          (item) => item._id === updateItem._id
        );
        if (index!==-1) {
          state.employeeList[index] = updateItem;
        }
        state.response = "update";
      });
    },
  });

  export default productSlice.reducer;
  export const { changeStateTrue, changeStateFalse, clearResponse } =
    productSlice.actions;