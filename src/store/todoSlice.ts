import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import todo from "../services/odevserver/controllers/todo"

export const fetchData = createAsyncThunk(
  "todo/fetchData",
  async (thunkApi) => {
    const response = await todo.list({})
    return response.data
  }
)
type State = {
  value: any[]
  isLoading: boolean
}
const initialState: State = {
  value: [],
  isLoading:false
}
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    add: (state, action: PayloadAction<any>) => {
      state.value.push(action.payload)
    },
    remove: (state, action: PayloadAction<any>) => {
      const index = state.value.findIndex(
        (item: any) => item.id === action.payload.id
      )
      state.value.splice(index, 1)
    },
    update: (state, action: PayloadAction<any>) => {
      const index = state.value.findIndex(
        (item: any) => item.id === action.payload.id
      )
      state.value.splice(index, 1)
      state.value.push(action.payload)
    },
  },
  extraReducers: {
    [fetchData.fulfilled.toString()]: (state, action) => {
      state.value = action.payload
      state.isLoading=false
    },
    [fetchData.pending.toString()] : (state)=>{
      state.isLoading=true
    },
    [fetchData.rejected.toString()] : (state)=>{
      state.isLoading=false
    }
  },
})

export const { add, remove, update, set } = todoSlice.actions
export default todoSlice.reducer
