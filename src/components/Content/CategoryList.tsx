import React, { FC } from "react"
import { List } from "@mui/material"

import CategoryListItem from "./CategoryListItem"
import { useAppContext } from "../../context/sample-context"
interface CategoryListProps {}
const CategoryList: FC<CategoryListProps> = (props) => {
  const app = useAppContext()
  return (
    <List>
      {app.state.categoryList.map((category:any) => (
        <CategoryListItem
          category={category}
        />
      ))}
    </List>
  )
}

export default CategoryList
