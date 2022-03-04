import React, { FC } from "react"
import { Modal, ModalProps, Box, TextField, Button } from "@mui/material"
import useForm from "../../hooks/useForm"
import status from "../../services/odevserver/controllers/status"

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
interface AddStatusModalProps extends Omit<ModalProps, "children"> {
  onStatusSubmit?: (status: any) => void
  categoryId: number
}
const AddStatusModal: FC<AddStatusModalProps> = (props) => {
  const form = useForm()
  const handleAddStatusClick = () => {
    status
      .create({ ...form.values, categoryId: props.categoryId })
      .then(({ data }) => props.onStatusSubmit?.(data))
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
        <TextField
          variant="outlined"
          name="color"
          fullWidth
          sx={{ marginY: 1 }}
          onChange={form.handleChange}
        />
        <Button variant="contained" fullWidth onClick={handleAddStatusClick}>
          Statüyü Ekle
        </Button>
      </Box>
    </Modal>
  )
}

export default AddStatusModal
