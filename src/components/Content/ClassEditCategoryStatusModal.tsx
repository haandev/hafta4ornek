import React, { Component,FC, useEffect, useState } from "react"
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
export class ClassEditCategoryStatusModal extends Component<any,any> {
  private restProps: any
  private categoryId: number
  constructor(props: any) {
    super(props)
    const { categoryId, ...rest } = props // {open:false}
    this.restProps = rest 
    this.categoryId = categoryId
    this.state = { statusList: [], isAddStatusModalVisible: false }
  }
  /* componentDidUpdate() {
    status
      .list({ categoryId: this.categoryId })
      .then(({ data }) => this.setState({ ...this.state, statusList: data }))
  } */
  handleAddStatus = (status: any) => {
    this.setState({ ...this.state, statusList: [...this.state.statusList, status] , isAddStatusModalVisible:false})
  }
  handleUpdateStatus = (status: any) => {
    const newList = this.state.statusList.map((item:any) =>
      item.id === status.id ? status : item
    )
    this.setState({ ...this.state, statusList: newList})
  }

  handleDeleteStatus = (id: any) => {
    const newList = this.state.statusList.filter((item:any) => item.id !== id)
    this.setState({ ...this.state, statusList: newList})
  }
  render() {
    console.log("fired")
    return (
      <Modal {...this.restProps} open={this.props.open} >
        <Box sx={style}>
          <AddStatusModal
            categoryId={this.props.categoryId}
            open={this.state.isAddStatusModalVisible}
            onStatusSubmit={this.handleAddStatus}
            onClose={() => this.setState({...this.state,isAddStatusModalVisible:false})}
          />
          <StatusList
            statusList={this.state.statusList}
            onDelete={this.handleDeleteStatus}
            onUpdate={this.handleUpdateStatus}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={() => this.setState({...this.state,isAddStatusModalVisible:true})}
          >
            Yeni statü ekle
          </Button>
        </Box>
      </Modal>
    )
  }
}

export default ClassEditCategoryStatusModal
