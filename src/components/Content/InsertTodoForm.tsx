import React, { useEffect, FC, useState } from "react"
import { Button, Box, Tab, TextField, List } from "@mui/material"
import CustomSelect from "./CustomSelect"
import useForm from "../../hooks/useForm"
import status from "../../services/odevserver/controllers/status"
import {add} from "../../store/todoSlice"
import todo from "../../services/odevserver/controllers/todo"
import { useAppContext } from "../../context/sample-context"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"

interface InsertTodoFormProps {}
const InsertTodoForm: FC<InsertTodoFormProps> = (props) => {
  const categoryList = useSelector<RootState,any[]>(
    (state) => state.category.value
  )
  const dispatch = useDispatch<AppDispatch>()
  const app = useAppContext()
  const form = useForm()
  const [statusList, setStatusList] = useState<Array<any>>([])

  useEffect(() => {
    if (form.values?.categoryId) {
      status
        .list({ categoryId: form.values?.categoryId })
        .then(({ data }) => setStatusList(data))
    } else {
      setStatusList([])
    }
  }, [form.values?.categoryId])

  const handleAddTodoClick = () => {
    todo
      .create({
        title: form.values.newTodo,
        statusId: form.values.statusId,
        categoryId: form.values.categoryId,
      })
      .then(({ data }) => {
        dispatch(add(data))
      })
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <TextField
        fullWidth
        sx={{ width: "50%", marginX: 1 }}
        name="newTodo"
        label="Todo"
        variant="outlined"
        onChange={form.handleChange}
      />
      <CustomSelect
        sx={{ width: "20%", marginX: 1 }}
        dataList={categoryList}
        name="categoryId"
        label="Kategori"
        titleField="title"
        valueField="id"
        keyField="id"
        onChange={form.handleSelectChange}
      />
      <CustomSelect
        sx={{ width: "20%", marginX: 1 }}
        dataList={statusList}
        name="statusId"
        label="Status"
        titleField="title"
        valueField="id"
        keyField="id"
        onChange={form.handleSelectChange}
      />

      <Button
        sx={{ width: "10%", marginX: 1 }}
        variant="contained"
        size="medium"
        onClick={handleAddTodoClick}
      >
        Ekle
      </Button>
    </Box>
  )
}

export default InsertTodoForm
