import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"

function App() {
    return (
        <div className="font-dm flex flex-col min-h-screen ">
            <div className="flex flex-col flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default App
