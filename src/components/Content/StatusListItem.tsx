import React, { FC, useState } from "react"
import { IconButton, ListItem, TextField } from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import SegmentIcon from "@mui/icons-material/Segment"
import status from "../../services/odevserver/controllers/status"
import ConfirmationDialog from "./ConfirmationDialog"
import useForm from "../../hooks/useForm"

interface StatusListItemProps {
  status: any
  onUpdate: any
  onDelete: any
}
const StatusListItem: FC<StatusListItemProps> = (props) => {
  const form = useForm(props.status)
  const [mode, setMode] = useState<"read" | "edit">("read")
  const [field, setField] = useState<string>(props.status.title)
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
  const handleChange = (event: any) => {
    const value = event.currentTarget.value
    setField(value)
  }
  const handleSave = () => {
    status.update(props.status.id, { title: field }).then(() => {
      props.onUpdate?.(form.values)
      setMode("read")
    })
  }
  const handleDelete = () => {
    status.destroy(props.status.id).then(() => {
      props.onDelete(props.status.id)
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
        </>
      }
    >
      {mode === "read" ? (
        props.status.title + " - " + props.status.color
      ) : (
        <>
          <TextField
            variant="outlined"
            sx={{ width: "40%", marginRight:1 }}
            value={form.values.title}
            size="small"
            name="title"
            onChange={form.handleChange}
          />
          <TextField
            variant="outlined"
            sx={{ width: "40%" }}
            value={form.values.color}
            size="small"
            name="color"
            onChange={form.handleChange}
          />
        </>
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

export default StatusListItem
