import React, { useEffect } from "react"
import { useAppContext } from "../../context/sample-context"
import { Box, List } from "@mui/material"
import todo from "../../services/odevserver/controllers/todo"
import category from "../../services/odevserver/controllers/category"
import { set, fetchData } from "../../store/todoSlice"
import FilterBar from "./FilterBar"
import InsertTodoForm from "./InsertTodoForm"
import TodoItem from "./TodoItem"
import { Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { AppDispatch,RootState } from "../../store"

const TodoList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const todoList = useSelector<RootState, any[]>(
    (state) => state.todo.value
  )
  const app = useAppContext()
  useEffect(() => {
    category.list().then(({ data }) => dispatch(set(data)))
  }, [])

  useEffect(() => {
    const filterParams = Object.fromEntries(
      Object.entries(app.state.filterValues).filter(([key, value]) => value)
    )
    dispatch(fetchData())
   /*  todo.list(filterParams).then(({ data }) => {
      console.log(data)
      dispatch(set(data))
    }) */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.state.filterValues])
  return (
    <Box
      sx={{
        width: "800px",
        marginX: "auto",
        marginTop: 10,
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <Link to="/categories">Kategorileri Gör</Link>

      <FilterBar />
      <InsertTodoForm />
      <Box>
        <List>
          {todoList.map((todo: any) => {
            return <TodoItem data={todo} />
          })}
        </List>
      </Box>
    </Box>
  )
}

export default TodoList
