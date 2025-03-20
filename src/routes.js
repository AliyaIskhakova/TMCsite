import Admin from "./pages/Admin"
import mainPage from "./pages/mainpage"
import Auth from "./pages/Auth"
import Repair from "./pages/Repair"
import Refilling from "./pages/Refilling"
import Delivery from "./pages/Delivery"


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
        path: '/delivery',
        Component: Delivery
    }
]