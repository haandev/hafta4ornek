import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type State = {
  value: any[]
}
const initialState: State = {
  value: [],
}
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<any>) => {
      console.log("action payload", action.payload)
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
})

export const { add, remove, update, set } = categorySlice.actions
export default categorySlice.reducer
