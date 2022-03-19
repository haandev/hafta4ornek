import React, { useCallback, useState } from "react"

const useBoolean = (initialState: boolean) => {
  const [value, setValue] = useState<boolean>(initialState)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false),[])
  const toggle = useCallback(() => setValue((value) => !value),[])
  return { setTrue, setFalse, setValue, toggle, value }
}

export default useBoolean
