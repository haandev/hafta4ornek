import React, { FC } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { Button } from "@mui/material"

interface ConfirmationDialogProps {
  onYes?: any
  onNo?: any
  onClose?: any
  yesTitle?: string
  noTitle?: string
  dialogTitle?: string
  dialogMessage?: string
  isOpen: boolean
}
const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {props.dialogTitle || "Onaylayın"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {props.dialogMessage || "İşlemi onaylıyor musunuz="}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            props.onNo?.()
            props.onClose?.()
          }}
        >
          {props.noTitle || "No"}
        </Button>
        <Button
          onClick={() => {
            props.onYes?.()
            props.onClose?.()
          }}
        >
          {props.yesTitle || "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
