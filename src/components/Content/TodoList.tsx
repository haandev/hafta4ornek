import React,{useEffect} from "react"
import { useAppContext } from "../../context/sample-context"
import { Box, List } from "@mui/material"
import todo from "../../services/odevserver/controllers/todo"
import category from "../../services/odevserver/controllers/category"

import FilterBar from "./FilterBar"
import InsertTodoForm from "./InsertTodoForm"
import TodoItem from "./TodoItem"
import { Link } from "react-router-dom"

const TodoList = () => {
  const app = useAppContext()
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
    <Box sx={{width:"800px",marginX:"auto", marginTop:10,backgroundColor:"white", padding:2}}>
        <Link to="/categories">Kategorileri Gör</Link>
      
      <FilterBar />
      <InsertTodoForm />
      <Box>
        <List>
          {app.state.todoList.map((todo: any) => {
            return <TodoItem data={todo} />
          })}
        </List>
      </Box>
    </Box>
  )
}

export default TodoList
