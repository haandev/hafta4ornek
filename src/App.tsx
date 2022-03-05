import React, { useState } from "react"
import "./App.css"
import Auth from "./components/Auth/Auth"
import Content from "./components/Content/Content"
import { AppProvider } from "./context/sample-context"
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className="App">
      {isLoggedIn ? (
        <AppProvider>
          <Content />
        </AppProvider>
      ) : (
        <Auth
          onLogin={() => setIsLoggedIn(true)}
          onRegister={() => setIsLoggedIn(true)}
        />
      )}
    </div>
  )
}

export default App
