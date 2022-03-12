import React from "react"
import CategoryList from "./CategoryList"
import {
  showAddCategoryModal,
  showShowStatusModal,
} from "./../../store/modalSlice"
import { Button, Box } from "@mui/material"
import { useAppContext } from "../../context/sample-context"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"

const Categories = () => {
  const app = useAppContext()
  const dispatch = useDispatch<AppDispatch>()
  return (
    <Box
      sx={{
        width: "800px",
        marginX: "auto",
        marginTop: 10,
        padding: 2,
        backgroundColor: "white",
      }}
    >
        <Link to="/todo-list">Todoları Gör</Link>
      <CategoryList />
      <Button
        fullWidth
        variant="outlined"
        onClick={() =>
          dispatch(showAddCategoryModal())
        //   app.dispatches.modals.addCategoryModal.show()
          
          }
      >
        Yeni kategori ekle
      </Button>
    </Box>
  )
}

export default Categories
