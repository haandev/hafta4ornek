import { SelectChangeEvent } from "@mui/material"
import React, { useState, useCallback, useMemo } from "react"

const useForm = <T = any>(initialValues?: any) => {
  const [values, setValues] = useState<T | any>(initialValues)
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      setValues((prev: any) => ({ ...prev, [name]: value }))
    },
    []
  )
  const handleSelectChange = useCallback(
    (event: SelectChangeEvent<string | number>) => {
      const { value, name } = event.target
      setValues((prev: any) => ({ ...prev, [name]: value }))
    },
    []
  )
  const patchState = useCallback((patch:any)=>{
    setValues((prev:any)=>({...prev,...patch}))
  },[])

  const r = useMemo(
    () => ({ values, handleChange, handleSelectChange,patchState }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values]
  )
  return r
}

export default useForm
