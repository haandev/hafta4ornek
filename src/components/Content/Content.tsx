import React, { useEffect, useState } from "react"
import AddCategoryModal from "./AddCategoryModal"
import { Button, Box, Tab } from "@mui/material"
import category from "../../services/odevserver/controllers/category"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import TabList from "@mui/lab/TabList"
import CategoryList from "./CategoryList"
import EditCategoryStatusModal from "./EditCategoryStatusModal"
function Content() {
  const [value, setValue] = useState("todo")
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] =
    useState<boolean>(false)
  const [
    isEditCategoryStatusModalVisible,
    setIsEditCategoryStatusModalVisible,
  ] = useState<boolean>(false)

  const [categoryList, setCategoryList] = useState<Array<any>>([])

  useEffect(() => {
    category.list().then(({ data }) => setCategoryList(data))
  }, [])

  const handleAddCategory = (category: any) => {
    setCategoryList((prev) => [...prev, category])
    setIsAddCategoryModalVisible(false)
  }
  const handleUpdateCategory = (category: any) => {
    const newList = categoryList.map((item) =>
      item.id === category.id ? category : item
    )
    setCategoryList(newList)
  }
  const handleDeleteCategory = (id: any) => {
    const newList = categoryList.filter((item) => item.id !== id)
    setCategoryList(newList)
  }

  return (
    <div>
      <AddCategoryModal
        onCategorySubmit={handleAddCategory}
        open={isAddCategoryModalVisible}
        onClose={() => setIsAddCategoryModalVisible(false)}
      />
      <EditCategoryStatusModal
        open={Boolean(selectedCategory)}
        onClose={() => setSelectedCategory(0)}
        categoryId={selectedCategory}
      />

      <Box
        sx={{
          typography: "body1",
          backgroundColor: "white",
          marginX: "auto",
          marginY: 10,
          width: "500px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="TODO" value="todo" />
              <Tab label="Categories" value="categories" />
            </TabList>
          </Box>
          <TabPanel value="todo">Todolar buraya</TabPanel>
          <TabPanel value="categories">
            <CategoryList
              onShowStatusModal={(id: any) => setSelectedCategory(id)}
              categoryList={categoryList}
              onUpdate={handleUpdateCategory}
              onDelete={handleDeleteCategory}
            />
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setIsAddCategoryModalVisible(true)}
            >
              Yeni kategori ekle
            </Button>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

export default Content
