import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
           <div className="mt-24"> <Outlet></Outlet></div>
            {/* ToDo : uncommnet this footer */}
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;