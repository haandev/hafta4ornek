import React, { FC, PropsWithChildren } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  hideAddCategoryModal,
  hideShowStatusModal,
} from "./../store/modalSlice"
import { useAppContext } from "../context/sample-context"
import AddCategoryModal from "./Content/AddCategoryModal"
import EditCategoryStatusModal from "./Content/EditCategoryStatusModal"
import { AppDispatch, RootState } from "../store"
const ModalProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const app = useAppContext()

  const addCategoryModal = useSelector<RootState, boolean>(
    (state) => state.modal.addCategoryModal
  )
  const showStatusModal = useSelector<RootState, boolean>(
    (state) => state.modal.showStatusModal
  )
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div>
      <AddCategoryModal
        open={addCategoryModal}
        //   open={app.state.modals.addCategoryModal}
        onClose={() => dispatch(hideAddCategoryModal())}
        //   onClose={() => app.dispatches.modals.addCategoryModal.hide()}
      />
      <EditCategoryStatusModal
        open={showStatusModal}
        onClose={() => {
          app.dispatches.category.setCurrent(0)
          dispatch(hideShowStatusModal())
        }}
        categoryId={app.state.currentCategory}
      />
      {children}
    </div>
  )
}

export default ModalProvider
