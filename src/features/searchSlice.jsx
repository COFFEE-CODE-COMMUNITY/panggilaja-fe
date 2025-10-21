import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchText : '',
    status : ''
}

const searchSlice = createSlice({
    name : 'search',
    initialState,
    reducers : {
        setSearchText : (state, action) => {
            state.searchText = action.payload
        },
        setStatus : (state, action) => {
            state.status = action.payload
        },
    }
})

export const {setSearchText, setStatus} = searchSlice.actions
export const selectSearchText = (state) => state.search.searchText
export const selectStatus = (state) => state.search.status
export default searchSlice.reducer