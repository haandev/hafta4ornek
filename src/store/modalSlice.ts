import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    addCategoryModal: false,
    showStatusModal: false,
  },
  reducers: {
    showAddCategoryModal : (state)=>{
        state.addCategoryModal = true
    },
    hideAddCategoryModal : (state)=>{
        state.addCategoryModal = false
    },
    showShowStatusModal : (state)=>{
        state.showStatusModal = true
    },
    hideShowStatusModal : (state)=>{
        state.showStatusModal = false
    }
  } })

  export const {showAddCategoryModal,hideAddCategoryModal,showShowStatusModal,hideShowStatusModal} = modalSlice.actions
  export default modalSlice.reducer