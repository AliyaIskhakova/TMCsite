import { BrowserRouter } from "react-router-dom";
import AppRouter from "./component/AppRouter.jsx";
import NavBar from "./component/NavBar.jsx"; 
import Footer from "./component/Footer.jsx"

const App = () => {
    return(
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>
        <Footer/>
      </BrowserRouter>
    );
};

export default App
