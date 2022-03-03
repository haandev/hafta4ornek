import React, { useState } from "react"
import "./App.css"
import Auth from "./components/Auth/Auth"
import Content from "./components/Content/Content"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <div className="App">
      {isLoggedIn ? (
        <Content />
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
