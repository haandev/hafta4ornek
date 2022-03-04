import React, { FC, useEffect, useState } from "react"
import { Modal, ModalProps, Box, TextField, Button } from "@mui/material"
import status from "../../services/odevserver/controllers/status"
import StatusList from "./StatusList"
import AddStatusModal from "./AddStatusModal"
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
interface EditStatusStatusModalProps extends Omit<ModalProps, "children"> {
  categoryId: number
}
const EditStatusStatusModal: FC<EditStatusStatusModalProps> = ({
  categoryId,
  ...rest
}) => {
  const [statusList, setStatusList] = useState<any[]>([])
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] =
    useState<boolean>(false)
  useEffect(() => {
    categoryId &&
      status.list({ categoryId }).then(({ data }) => setStatusList(data))
  }, [categoryId])

  const handleAddStatus = (status: any) => {
    setStatusList((prev) => [...prev, status])
    setIsAddStatusModalVisible(false)
  }
  const handleUpdateStatus = (status: any) => {
    const newList = statusList.map((item) =>
      item.id === status.id ? status : item
    )
    setStatusList(newList)
  }
  const handleDeleteStatus = (id: any) => {
    const newList = statusList.filter((item) => item.id !== id)
    setStatusList(newList)
  }
  return (
    <Modal {...rest}>
      <Box sx={style}>
        <AddStatusModal
        categoryId={categoryId}
          open={isAddStatusModalVisible}
          onStatusSubmit={handleAddStatus}
          onClose={() => setIsAddStatusModalVisible(false)}
        />
        <StatusList
          statusList={statusList}
          onDelete={handleDeleteStatus}
          onUpdate={handleUpdateStatus}
        />
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setIsAddStatusModalVisible(true)}
        >
          Yeni statü ekle
        </Button>
      </Box>
    </Modal>
  )
}

export default EditStatusStatusModal
