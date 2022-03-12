import React, { FC } from "react"
import { List } from "@mui/material"

import CategoryListItem from "./CategoryListItem"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
interface CategoryListProps {}
const CategoryList: FC<CategoryListProps> = (props) => {
  const categoryList = useSelector<RootState,any[]>(
    (state) => state.category.value
  )
  return (
    <List>
      {categoryList.map((category: any) => (
        <CategoryListItem category={category} />
      ))}
    </List>
  )
}

export default CategoryList
