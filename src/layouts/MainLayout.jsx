import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* ToDo : uncommnet this footer */}
            {/* <Footer></Footer> */}
        </div>
    );
};

export default MainLayout;