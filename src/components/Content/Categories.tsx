import React from "react"
import CategoryList from "./CategoryList"
import { Button, Box } from "@mui/material"
import { useAppContext } from "../../context/sample-context"
import { Link } from "react-router-dom"

const Categories = () => {
  const app = useAppContext()
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
        onClick={() => app.dispatches.modals.addCategoryModal.show()}
      >
        Yeni kategori ekle
      </Button>
    </Box>
  )
}

export default Categories
