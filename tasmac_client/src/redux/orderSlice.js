import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../services/orderService';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const validateAddress = createAsyncThunk(
  'orders/validateAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await orderService.validateAddress(addressData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  currentOrder: null,
  orderHistory: [],
  loading: false,
  error: null,
  addressValidation: null,
  validatingAddress: false
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAddressValidation: (state) => {
      state.addressValidation = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
        state.orderHistory.push(action.payload.data);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create order';
      })
      .addCase(validateAddress.pending, (state) => {
        state.validatingAddress = true;
        state.addressValidation = null;
      })
      .addCase(validateAddress.fulfilled, (state, action) => {
        state.validatingAddress = false;
        state.addressValidation = action.payload.data;
      })
      .addCase(validateAddress.rejected, (state, action) => {
        state.validatingAddress = false;
        state.error = action.payload?.message || 'Address validation failed';
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.data;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch order';
      });
  }
});

export const { clearOrder, clearError, clearAddressValidation } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectOrderLoading = (state) => state.orders.loading;
export const selectOrderError = (state) => state.orders.error;
export const selectAddressValidation = (state) => state.orders.addressValidation;
export const selectValidatingAddress = (state) => state.orders.validatingAddress;

export default orderSlice.reducer;