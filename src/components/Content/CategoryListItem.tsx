import React, { FC, useState } from "react"
import { IconButton, ListItem, TextField } from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import SegmentIcon from "@mui/icons-material/Segment"
import category from "../../services/odevserver/controllers/category"
import ConfirmationDialog from "./ConfirmationDialog"

interface CategoryListItemProps {
  category: any
  onUpdate: any
  onDelete: any
  onShowStatusModal: any
}
const CategoryListItem: FC<CategoryListItemProps> = (props) => {
  const [mode, setMode] = useState<"read" | "edit">("read")
  const [field, setField] = useState<string>(props.category.title)
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
  const handleChange = (event: any) => {
    const value = event.currentTarget.value
    setField(value)
  }
  const handleSave = () => {
    category.update(props.category.id, { title: field }).then(() => {
      props.onUpdate?.({ ...props.category, title: field })
      setMode("read")
    })
  }
  const handleDelete = () => {
    category.destroy(props.category.id).then(() => {
      props.onDelete(props.category.id)
    })
  }
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => setMode("edit")}
          >
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
            title="Statüleri düzenle"
            aria-label="delete"
            onClick={() => props.onShowStatusModal?.(props.category.id)}
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
        noTitle="Vazgeç"
        isOpen={isConfirmOpen}
        onYes={handleDelete}
        onClose={() => setIsConfirmOpen(false)}
        dialogMessage="Kategori, altındaki tüm statüler ve altındaki tüm todolar ile birlikte silinecektir."
        dialogTitle="Silme onayı"
      />
    </ListItem>
  )
}

export default CategoryListItem
