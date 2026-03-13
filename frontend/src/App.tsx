import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import Roster from "./pages/Roster"
import AddActor from "./pages/AddActor"

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN PAGE (NO SIDEBAR) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>

        {/* DASHBOARD LAYOUT */}
        <Route
          path="/*"
          element={
            <div className="layout">
              <Sidebar />

              <div className="main">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/roster" element={<Roster />} />
                  <Route path="/actors/new" element={<AddActor />} />
                </Routes>
              </div>
            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}