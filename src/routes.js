import mainPage from "./pages/mainpage"
import Repair from "./pages/Repair"
import Refilling from "./pages/Refilling"
import RepairComputer from "./pages/RepairComputer"


export const publicRoutes=[
    {
        path: '/mainpage',
        Component: mainPage
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