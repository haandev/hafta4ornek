import React, { FC, useState } from "react"
import { IconButton, ListItem, TextField } from "@mui/material"
import {remove, update} from "../../store/categorySlice"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import SegmentIcon from "@mui/icons-material/Segment"
import category from "../../services/odevserver/controllers/category"
import ConfirmationDialog from "./ConfirmationDialog"
import { useAppContext } from "../../context/sample-context"
import { useDispatch } from "react-redux"
import {showShowStatusModal} from "../../store/modalSlice"
interface CategoryListItemProps {
  category: any
}
const CategoryListItem: FC<CategoryListItemProps> = (props) => {
  const app = useAppContext()
  const dispatch = useDispatch()
  const [mode, setMode] = useState<"read" | "edit">("read")
  const [field, setField] = useState<string>(props.category.title)
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
  const handleChange = (event: any) => {
    const value = event.currentTarget.value
    setField(value)
  }
  const handleSave = () => {
    category.update(props.category.id, { title: field }).then(({ data }) => {
      dispatch(update(data))
      setMode("read")
    })
  }
  const handleDelete = () => {
    category.destroy(props.category.id).then(() => {
      dispatch(remove({ id: props.category.id }))
    })
  }
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" onClick={() => setMode("edit")}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsConfirmOpen(true)}
            edge="end"
            title="Sil"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          {mode === "edit" && (
            <IconButton
              edge="end"
              title="Kaydet"
              aria-label="delete"
              onClick={handleSave}
            >
              <SaveIcon />
            </IconButton>
          )}
          <IconButton
            edge="end"
            title="Stat??leri d??zenle"
            aria-label="delete"
            onClick={() => {
              showShowStatusModal()
              app.dispatches.category.setCurrent(props.category.id)
            }}
          >
            <SegmentIcon />
          </IconButton>
        </>
      }
    >
      {mode === "read" ? (
        props.category.title
      ) : (
        <TextField
          variant="outlined"
          sx={{ width: "80%" }}
          value={field}
          size="small"
          onChange={handleChange}
        />
      )}
      <ConfirmationDialog
        yesTitle="Sil"
        noTitle="Vazge??"
        isOpen={isConfirmOpen}
        onYes={handleDelete}
        onClose={() => setIsConfirmOpen(false)}
        dialogMessage="Kategori, alt??ndaki t??m stat??ler ve alt??ndaki t??m todolar ile birlikte silinecektir."
        dialogTitle="Silme onay??"
      />
    </ListItem>
  )
}

export default CategoryListItem
