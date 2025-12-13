import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- BASE URL API EMSIFA ---
// Menggunakan API Wilayah Indonesia dari Emsifa
const BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api/'; 

// --- Async Thunks untuk Fetching Data ---

/**
 * Catatan: Format respons dari emsifa sedikit berbeda, 
 * kadang menggunakan 'id' dan 'name', kadang 'kode' dan 'nama'.
 * Kita akan menormalkan hasilnya di fulfilled case.
 */

// 1. Fetch Provinsi
export const fetchProvinces = createAsyncThunk(
  'alamat/fetchProvinces',
  async () => {
    const response = await axios.get(`${BASE_URL}provinces.json`);
    // Format respons: [{ id: '11', name: 'ACEH' }, ...]
    return response.data; 
  }
);

// 2. Fetch Kabupaten/Kota (membutuhkan ID Provinsi)
export const fetchRegencies = createAsyncThunk(
  'alamat/fetchRegencies',
  async (provinceId) => {
    // Endpoint: /regencies/[provinceId].json
    const response = await axios.get(`${BASE_URL}regencies/${provinceId}.json`);
    // Format respons: [{ id: '1101', province_id: '11', name: 'KAB. SIMEULUE' }, ...]
    return response.data; 
  }
);

// 3. Fetch Kecamatan (membutuhkan ID Kab/Kota)
export const fetchDistricts = createAsyncThunk(
  'alamat/fetchDistricts',
  async (regencyId) => {
    // Endpoint: /districts/[regencyId].json
    const response = await axios.get(`${BASE_URL}districts/${regencyId}.json`);
    // Format respons: [{ id: '110101', regency_id: '1101', name: 'TEUPAH SELATAN' }, ...]
    return response.data; 
  }
);

// --- Initial State ---
const initialState = {
  // Data Master
  provinces: [], // Menyimpan data provinsi
  regencies: [], // Menyimpan data kabupaten/kota berdasarkan provinsi yang dipilih
  districts: [], // Menyimpan data kecamatan berdasarkan kab/kota yang dipilih

  // Status Loading
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// --- Alamat Slice ---
const alamatSlice = createSlice({
  name: 'alamat',
  initialState,
  reducers: {
    // Actions untuk mereset data saat pilihan diubah
    resetRegencies: (state) => {
        state.regencies = [];
        state.districts = [];
        state.status = 'idle'; // Reset status loading lokal
    },
    resetDistricts: (state) => {
        state.districts = [];
        state.status = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      // ----------------- PROVINCES -----------------
      .addCase(fetchProvinces.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Normalisasi data dari emsifa: { id, name } -> { code, name }
        state.provinces = action.payload.map(item => ({
             code: item.id, // ID Provinsi (misal: '11')
             name: item.name // Nama Provinsi (misal: 'ACEH')
        }));
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ----------------- REGENCIES -----------------
      .addCase(fetchRegencies.pending, (state, action) => {
        state.status = 'loading';
        state.regencies = []; 
        state.districts = [];
      })
      .addCase(fetchRegencies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Normalisasi data: { id, name } -> { code, name }
        state.regencies = action.payload.map(item => ({
             code: item.id, // ID Kab/Kota (misal: '1101')
             name: item.name // Nama Kab/Kota
        }));
      })
      .addCase(fetchRegencies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // ----------------- DISTRICTS -----------------
      .addCase(fetchDistricts.pending, (state, action) => {
        state.status = 'loading';
        state.districts = []; 
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Normalisasi data: { id, name } -> { code, name }
        state.districts = action.payload.map(item => ({
             code: item.id, // ID Kecamatan (misal: '110101')
             name: item.name // Nama Kecamatan
        }));
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export reducers dan actions
export const { resetRegencies, resetDistricts } = alamatSlice.actions;
export default alamatSlice.reducer;

// Export selectors
export const selectAllProvinces = (state) => state.alamat.provinces;
export const selectAllRegencies = (state) => state.alamat.regencies;
export const selectAllDistricts = (state) => state.alamat.districts;
export const selectAlamatStatus = (state) => state.alamat.status;
export const selectAlamatError = (state) => state.alamat.error;