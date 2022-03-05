import React, { useEffect, useState } from "react"
import AddCategoryModal from "./AddCategoryModal"
import { Button, Box, Tab, TextField, List } from "@mui/material"
import category from "../../services/odevserver/controllers/category"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import TabList from "@mui/lab/TabList"
import CategoryList from "./CategoryList"
import FilterBar from "./FilterBar"
import InsertTodoForm from "./InsertTodoForm"
import TodoItem from "./TodoItem"
import EditCategoryStatusModal from "./EditCategoryStatusModal"
import todo from "../../services/odevserver/controllers/todo"
import { useAppContext } from "./../../context/sample-context"
function Content() {
  const app = useAppContext()
  const [value, setValue] = useState("todo")

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  useEffect(() => {
    category.list().then(({ data }) => app.dispatches.category.set(data))
  }, [])

  useEffect(() => {
    const filterParams = Object.fromEntries(
      Object.entries(app.state.filterValues).filter(([key, value]) => value)
    )
    todo.list(filterParams).then(({ data }) => {
      app.dispatches.todo.set(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.state.filterValues])
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

      <Box
        sx={{
          typography: "body1",
          backgroundColor: "white",
          marginX: "auto",
          marginY: 10,
          width: "800px",
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
          <TabPanel value="todo">
            <FilterBar />
            <InsertTodoForm />
            <Box>
              <List>
                {app.state.todoList.map((todo: any) => {
                  return <TodoItem data={todo} />
                })}
              </List>
            </Box>
          </TabPanel>
          <TabPanel value="categories">
            <CategoryList />
            <Button
              fullWidth
              variant="outlined"
              onClick={() => app.dispatches.modals.addCategoryModal.show()}
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
