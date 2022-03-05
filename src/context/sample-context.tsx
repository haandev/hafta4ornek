import React, { FC, createContext, useContext, useMemo, useState } from "react"

const initialState: any = {
  categoryList: [],
  currentCategory: 0,
  todoList: [],
  modals: {
    addCategoryModal: false,
    showStatusModal: false,
  },
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
      modals: {
        addCategoryModal: {
          show: () => {
            setState((prev: any) => ({
              ...prev,
              modals: { ...prev.modals, addCategoryModal: true },
            }))
          },
          hide: () => {
            setState((prev: any) => ({
              ...prev,
              modals: { ...prev.modals, addCategoryModal: false },
            }))
          },
        },
        showStatusModal: {
          show: () => {
            setState((prev: any) => ({
              ...prev,
              modals: { ...prev.modals, showStatusModal: true },
            }))
          },
          hide: () => {
            setState((prev: any) => ({
              ...prev,
              modals: { ...prev.modals, showStatusModal: false },
            }))
          },
        },
      },
      category: {
        setCurrent: (id: number) =>
          setState((prev: any) => ({ ...prev, currentCategory: id })),
        set: (data: any) => {
          setState((prev: any) => ({ ...prev, categoryList: data }))
        },
        add: (category: any) => {
          setState((prev: any) => ({
            ...prev,
            categoryList: [...prev.categoryList, category],
          }))
        },
        remove: (category: any) => {
          setState((prev: any) => ({
            ...prev,
            categoryList: prev.categoryList.filter(
              (item: any) => item.id !== category.id
            ),
          }))
        },
        update: (category: any) => {
          setState((prev: any) => ({
            ...prev,
            categoryList: prev.categoryList.map((item: any) =>
              item.id === category.id ? category : item
            ),
          }))
        },
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
