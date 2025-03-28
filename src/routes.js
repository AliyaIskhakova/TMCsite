import Admin from "./pages/Admin"
import mainPage from "./pages/mainpage"
import Auth from "./pages/Auth"
import Repair from "./pages/Repair"
import Refilling from "./pages/Refilling"
import RepairComputer from "./pages/RepairComputer"


export const authRoutes = [
    {
        path: '/admin',
        Component: Admin
    }
]

export const publicRoutes=[
    {
        path: '/mainpage',
        Component: mainPage
    }, 
    {
        path: '/auth',
        Component: Auth
    }, 
    {
        path: '/reg',
        Component: Auth
    }, 
    {
        path: '/repair',
        Component: Repair
    }, 
    {
        path: '/refilling',
        Component: Refilling
    }, 
    {
        path: '/repaircomputer',
        Component: RepairComputer
    }
]