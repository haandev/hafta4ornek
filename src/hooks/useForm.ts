import React, { useState, useCallback, useMemo } from "react"

const useForm = <T = any>() => {
  const [values, setValues] = useState<T|any>()
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { name, value } = event.currentTarget
      setValues((prev: any) => ({ ...prev, [name]: value }))
    },
    []
  )
  const r = useMemo(()=>({ values, handleChange }),[values])
  return r
}

export default useForm
