import React, { FC,PropsWithChildren } from "react"
import { useAppContext } from "../context/sample-context"
import AddCategoryModal from "./Content/AddCategoryModal"
import EditCategoryStatusModal from "./Content/EditCategoryStatusModal"
const ModalProvider : FC<PropsWithChildren<{}>>= ({children}) => {
  const app = useAppContext()
  return (
    <div>
      <AddCategoryModal
        open={app.state.modals.addCategoryModal}
        onClose={() => app.dispatches.modals.addCategoryModal.hide()}
      />
      <EditCategoryStatusModal
        open={app.state.modals.showStatusModal}
        onClose={() => {
          app.dispatches.category.setCurrent(0)
          app.dispatches.modals.showStatusModal.hide()
        }}
        categoryId={app.state.currentCategory}
      />
      {children}
    </div>
  )
}

export default ModalProvider
