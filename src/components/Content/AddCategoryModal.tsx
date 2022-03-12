import React, { FC } from "react"
import { add } from "./../../store/categorySlice"
import { Modal, ModalProps, Box, TextField, Button } from "@mui/material"
import useForm from "../../hooks/useForm"
import category from "../../services/odevserver/controllers/category"
import { useAppContext } from "../../context/sample-context"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}
interface AddCategoryModalProps extends Omit<ModalProps, "children"> {}
const AddCategoryModal: FC<AddCategoryModalProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm()
  const handleAddCategoryClick = () => {
    category.create(form.values).then(({ data }) => dispatch(add(data)))
  }
  return (
    <Modal {...props} title="Kategori Ekle">
      <Box sx={style}>
        <TextField
          variant="outlined"
          name="title"
          fullWidth
          sx={{ marginY: 1 }}
          onChange={form.handleChange}
        />
        <Button variant="contained" fullWidth onClick={handleAddCategoryClick}>
          Kategoriyi Ekle
        </Button>
      </Box>
    </Modal>
  )
}

export default AddCategoryModal
