import React, { useEffect, useState } from "react"
import CustomSelect from "./CustomSelect"
import { Button, Box, Tab, TextField, List } from "@mui/material"
import status from "../../services/odevserver/controllers/status"
import { useAppContext } from "./../../context/sample-context"
import useForm from "../../hooks/useForm"

const FilterBar = () => {
  const app = useAppContext()
  const filter = useForm({
    statusId: 0,
    categoryId: 0,
  })
  const [filterStatusList, setFilterStatusList] = useState<Array<any>>([])

  useEffect(() => {
    if (filter.values?.categoryId) {
      status
        .list({ categoryId: filter.values?.categoryId })
        .then(({ data }) => setFilterStatusList(data))
    }
  }, [filter.values?.categoryId])

  return (
    <Box sx={{ marginBottom: 3 }}>
      <CustomSelect
        sx={{ width: "30%", marginX: 1 }}
        dataList={app.state.categoryList}
        name="categoryId"
        label="Kategori"
        value={filter.values?.categoryId}
        titleField="title"
        valueField="id"
        keyField="id"
        onChange={(e: any) => {
          filter.handleSelectChange(e)
          app.dispatches.setFilterValues(filter.values)
        }}
      />
      <CustomSelect
        sx={{ width: "30%", marginX: 1 }}
        dataList={filterStatusList}
        name="statusId"
        label="Status"
        titleField="title"
        value={filter.values?.statusId}
        valueField="id"
        keyField="id"
        onChange={(e: any) => {
          filter.handleSelectChange(e)
          app.dispatches.setFilterValues(filter.values)
        }}
      />
      <Button
        sx={{ width: "20%", marginX: 1 }}
        variant="contained"
        size="medium"
        onClick={() => {
          filter.patchState({
            statusId: 0,
            categoryId: 0,
          })
          app.dispatches.setFilterValues({
            statusId: 0,
            categoryId: 0,
          })
        }}
      >
        Filtreyi Temizle
      </Button>
    </Box>
  )
}

export default FilterBar
