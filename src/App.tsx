import React, { useState } from "react"
import "./App.css"
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import TodoList from "./components/Content/TodoList"
import { Routes, Route, Link } from "react-router-dom"
import { AppProvider } from "./context/sample-context"
import ModalProvider from "./components/ModalProvider"
import Categories from "./components/Content/Categories"
import { Provider } from "react-redux"
import store from "./store"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <AppProvider>
    <Provider store={store}>
      <ModalProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/register"
            element={<Register onRegister={() => setIsLoggedIn(true)} />}
          />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </ModalProvider>
    </Provider>
    </AppProvider>
  )
}

export default App
