import { ListItem } from "@mui/material"
import React, { FC, useState, useEffect } from "react"
import CustomSelect from "./CustomSelect"
import { TextField, Button } from "@mui/material"
import useForm from "../../hooks/useForm"
import status from "../../services/odevserver/controllers/status"
import todo from "../../services/odevserver/controllers/todo"
import { useAppContext } from "../../context/sample-context"
import { useSelector , useDispatch} from "react-redux"
import { RootState, AppDispatch } from "../../store"
import {update} from "../../store/todoSlice"
interface TodoItemProps {
  data: any
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const app = useAppContext()
  const dispatch = useDispatch<AppDispatch>()
  const form = useForm({
    categoryId: props.data.categoryId,
    statusId: props.data.statusId,
    title: props.data.title,
  })
  const categoryList = useSelector<RootState, any[]>(
    (state) => state.category.value
  )
  const [statusList, setStatusList] = useState<Array<any>>([])
  const [color, setColor] = useState<string>("white")
  useEffect(() => {
    if (form.values?.categoryId) {
      status
        .list({ categoryId: form.values?.categoryId })
        .then(({ data }) => setStatusList(data))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values?.categoryId])

  useEffect(() => {
    status.getById(props.data.statusId).then(({ data }) => setColor(data.color))
  }, [props.data.statusId])

  const handleUpdateClick = () => {
    todo.update(props.data.id, form.values).then(({ data }) => {
      dispatch(update(data))
    })
  }
  return (
    <ListItem
      sx={{
        borderColor: color,
        borderWidth: 2,
        borderStyle: "solid",
        marginY: 1,
      }}
    >
      {
        <TextField
          fullWidth
          sx={{ width: "50%", marginX: 1 }}
          name="newTodo"
          label="Todo"
          variant="outlined"
          value={props.data.title}
          InputProps={{
            readOnly: true,
          }}
          onChange={form.handleChange}
        />
      }
      <CustomSelect
        sx={{ width: "20%", marginX: 1 }}
        dataList={categoryList}
        name="categoryId"
        label="Kategori"
        titleField="title"
        valueField="id"
        value={form.values.categoryId}
        keyField="id"
        onChange={form.handleSelectChange}
      />
      <CustomSelect
        sx={{ width: "20%", marginX: 1 }}
        dataList={statusList}
        name="statusId"
        label="Status"
        titleField="title"
        value={form.values.statusId}
        valueField="id"
        keyField="id"
        onChange={form.handleSelectChange}
      />
      <Button
        disabled={!form.values.categoryId || !form.values.statusId}
        onClick={handleUpdateClick}
        sx={{ width: "10%", marginX: 1 }}
        variant="contained"
        size="medium"
      >
        Kaydet
      </Button>
    </ListItem>
  )
}

export default TodoItem
