import React, { FC } from "react"

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
} from "@mui/material"

interface CustomSelectProps extends SelectProps {
  dataList: Array<any>
  onChange: any
  valueField: string
  keyField: string
  titleField: string
}
const CustomSelect: FC<CustomSelectProps> = ({
  label,
  name,
  valueField,
  titleField,
  keyField,
  sx,
  dataList,
  onChange,
  ...rest
}) => {
  return (
    <FormControl sx={sx}>
      <InputLabel id={`label-${name}`}>{label}</InputLabel>
      <Select
        labelId={`label-${name}`}
        name={name}
        label={label}
        disabled={!dataList?.length}
        onChange={onChange}
        {...rest}
      >
        <MenuItem key={`${name}_0}`} value={0}>
          Seçilmedi
        </MenuItem>
        {dataList?.map((item: any) => (
          <MenuItem key={`${name}_${item[keyField]}`} value={item[valueField]}>
            {item[titleField]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default CustomSelect
