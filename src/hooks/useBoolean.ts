import React, { useState } from "react"

const useBoolean = (initialState: boolean) => {
  const [value, setValue] = useState<boolean>(initialState)
  const setTrue = () => setValue(true)

  const setFalse = () => setValue(false)

  const toggle = () => setValue((value) => !value)

  return { setTrue, setFalse, setValue, toggle, value }
}

export default useBoolean
