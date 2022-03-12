import React, { FC, createContext, useContext, useMemo, useState } from "react"

const initialState: any = {
  currentCategory: 0,
  todoList: [],
  filterValues: {},
}

const initialValue: any = {
  dispatches: {},
  provided: false,
  state: initialState,
}

export const AppContext = createContext(initialValue)

export const AppProvider: FC = ({ children }) => {
  const [state, setState] = useState(initialState)

  const dispatches = useMemo(
    () => ({
      setFilterValues: (values:any) =>
        setState((prev: any) => ({ ...prev, filterValues: values })),
      category: {
        setCurrent: (id: number) =>
          setState((prev: any) => ({ ...prev, currentCategory: id })),
      },
      todo: {
        set: (data: any) => {
          setState((prev: any) => ({ ...prev, todoList: data }))
        },
        add: (todo: any) => {
          setState((prev: any) => ({
            ...prev,
            todoList: [...prev.todoList, todo],
          }))
        },
        update: (todo: any) => {
          setState((prev: any) => ({
            ...prev,
            todoList: prev.todoList.map((item: any) =>
              item.id === todo.id ? todo : item
            ),
          }))
        },
      },
    }),
    []
  )

  return (
    <AppContext.Provider value={{ dispatches, provided: true, state }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const { dispatches, provided, state } = useContext(AppContext)
  if (!provided) {
    throw new Error("useAppContext must be used within a AppProvider.")
  }

  return { dispatches, provided, state }
}
