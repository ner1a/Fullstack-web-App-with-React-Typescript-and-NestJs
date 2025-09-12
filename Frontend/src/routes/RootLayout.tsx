import {Outlet} from "react-router-dom";
import NavBar from "../components/NavBar";

function RootLayout() {
    return (
        <>
            <NavBar />
            <main className="m-auto justify-items-center">
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;