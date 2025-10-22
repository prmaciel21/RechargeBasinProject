import {use, useEffect, useState} from "react";
import logo from "./california_water_institute_logo.png";
import { Menu, X } from "lucide-react";


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
            <header className="bg-white shadow-md">
                <nav className="p-5 shadow md:flex md:items-center md:justify-between sticky">
                    <div className="flex justify-between items-center">
                        <img className="w-16 inline" src={logo} alt="Fresno State Logo"/>

                        <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-3xl md:hidden text-gray-800"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                    <ul className={`md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-100 text-xl ${
                        isOpen 
                            ? 'top-[80px] opacity-100 shadow-lg z-10' 
                            : 'top-[-400px] opacity-0'
                    }`}>
                        <li className="mx-4 my-6 md:my-0">
                            <a 
                                className="hover:text-gray-100 text-xl"
                                href=""
                                onClick={() => setIsOpen(false)}
                            >
                                Problem Statement
                            </a>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <a 
                                className="hover:text-gray-100 text-xl"
                                href=""
                                onClick={() => setIsOpen(false)}
                            >
                                Solution
                            </a>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <a 
                                className="hover:text-gray-100 text-xl"
                                href=""
                                onClick={() => setIsOpen(false)}
                            >
                                ROI Calculator
                            </a>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <a 
                                className="hover:text-gray-100 text-xl"
                                href=""
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
    );
}

export default Navbar;