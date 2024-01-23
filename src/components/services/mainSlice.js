import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getToken = createAsyncThunk('main/getAPIToken', async (_, { getState }) => {
  const { main } = getState();
  const response = await fetch(`${main.URL}/search`);
  return response.json();
});

const getTickets = createAsyncThunk('main/getTickets', async (_, { getState }) => {
  const { main } = getState();
  const response = await fetch(`${main.URL}/tickets?searchId=${main.token}`);
  return response.json();
});

const initialState = {
  options: [
    { text: 'Без пересадки', name: 'without-transfer' },
    { text: '1 пересадка', name: 'one-transfer' },
    { text: '2 пересадки', name: 'two-transfers' },
    { text: '3 пересадки', name: 'three-transfers' },
  ],
  navigation: ['Самый дешевый', 'Самый быстрый', 'Оптимальный'],
  transfers: [
    { name: 'no-transfer', status: 'true' },
    { name: '1-transfer', status: 'true' },
    { name: '2-transfers', status: 'true' },
    { name: '3-transfers', status: 'true' },
  ],
  ticketsFromServer: [],
  isSelectedAllTransfers: true,
  tabActive: 0,
  token: null,
  URL: 'https://aviasales-test-api.kata.academy',
  stop: false,
  pending: false,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTab(state, action) {
      state.tabActive = action.payload;
    },
    setTransferStatus(state, action) {
      state.transfers[action.payload]['status'] = !state.transfers[action.payload].status;
      state.transfers = [...state.transfers];
      if (state.transfers.every((el) => el.status)) state.isSelectedAllTransfers = true;
    },
    setTransferStatusAll(state) {
      if (state.transfers.some((el) => !el.status)) {
        state.transfers = state.transfers.map((transfer) => {
          return { ...transfer, status: true };
        });
        state.isSelectedAllTransfers = true;
      } else {
        state.transfers = state.transfers.map((transfer) => {
          return { ...transfer, status: false };
        });
        state.isSelectedAllTransfers = false;
      }
    },
    getAppToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.error = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload.searchId;
      })
      .addCase(getTickets.pending, (state) => {
        state.error = null;
        state.pending = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.ticketsFromServer = [
          ...JSON.parse(JSON.stringify(state.ticketsFromServer)),
          ...JSON.parse(JSON.stringify(action.payload.tickets)),
        ];
        state.stop = action.payload.stop;
        state.pending = false;
      })
      .addCase(getTickets.rejected, (state) => {
        state.pending = false;
      });
  },
});

export const { setTab, setTransferStatus, setTransferStatusAll } = mainSlice.actions;
export { getToken, getTickets };

export default mainSlice.reducer;
