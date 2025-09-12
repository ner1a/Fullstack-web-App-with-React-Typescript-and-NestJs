import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="p-6 flex justify-center">
            <ul className="flex space-x-4">
                <li><NavLink to="/" className="flex justify-center items-center 
                w-full h-full px-4 py-2 border rounded-full border-solid">Users</NavLink></li>
                <li><NavLink to="/posts" className="flex justify-center items-center 
                w-full h-full px-4 py-2 border rounded-full border-solid">Posts</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;