import Weather from "./weather";
import { useState } from "react";
import ApiContext from "./context.jsx";

function App() {
  const [theme, setTheme] = useState('dark')
  const ThemeChange = () => {
    setTheme((curr) => curr === "dark" ? "light" : "dark")
  }
  return (
    <ApiContext.Provider
      value={{
        theme: theme,
        ThemeChange: ThemeChange
      }}
    >
      <div className="main-container" id={theme}>
        <div id="moon">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <Weather />
      </div>
    </ApiContext.Provider>

  )
}

export default App;
