import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
    return (
        <div className="font-dm flex flex-col min-h-screen bg-[#FAF4F2]">
            <Navbar />
            <div className="flex flex-col flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default App
