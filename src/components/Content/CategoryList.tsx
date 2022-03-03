import React, { FC } from "react"
import { List } from "@mui/material"

import CategoryListItem from "./CategoryListItem"
interface CategoryListProps {
  categoryList: Array<any>
  onUpdate: any
  onDelete: any
  onShowStatusModal: any
}
const CategoryList: FC<CategoryListProps> = (props) => {
  return (
    <List>
      {props.categoryList.map((category) => (
        <CategoryListItem
          onShowStatusModal={props.onShowStatusModal}
          category={category}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />
      ))}
    </List>
  )
}

export default CategoryList
