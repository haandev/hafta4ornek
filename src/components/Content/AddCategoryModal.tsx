import React, { FC } from "react"
import { Modal, ModalProps, Box, TextField, Button } from "@mui/material"
import useForm from "../../hooks/useForm"
import category from "../../services/odevserver/controllers/category"

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
interface AddCategoryModalProps extends Omit<ModalProps, "children"> {
  onCategorySubmit?: (category: any) => void
}
const AddCategoryModal: FC<AddCategoryModalProps> = (props) => {
  const form = useForm()
  const handleAddCategoryClick = () => {
    category
      .create(form.values)
      .then(({ data }) => props.onCategorySubmit?.(data))
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
