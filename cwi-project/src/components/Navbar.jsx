import {useState} from "react";
import logo from "./california_water_institute_logo.png"


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header class="bg-white">
                <nav class="flex justify-between items-center w-[92%] mx-auto bg-white p-3">
                    <div class=" flex items-center gap-3">
                        <img class="w-16" src={logo}/>
                    </div>
                    <div class="md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5 content-center">
                        <ul class="flex md:flex-row sm:flex-col md:items-center md:gap-[4vw] gap-8">
                            <li class=""><a class="hover:text-gray-500"href="">Problem Statement</a></li>
                            <li class=""><a class="hover:text-gray-500"href="">Solution</a></li>
                            <li class=""><a class="hover:text-gray-500"href="">ROI Calculator</a></li>
                            <li class=""><a class="hover:text-gray-500"href="">About</a></li>
                        </ul>

                        <button onClick={() => setIsOpen(!isOpen)} class="md:hidden focus:outline-none gap-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
                        </button>
                        {isOpen && (
                            <ul className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 md:hidden">
                                <li class=""><a class="hover:text-gray-500"href="">Problem Statement</a></li>
                                <li class=""><a class="hover:text-gray-500"href="">Solution</a></li>
                                <li class=""><a class="hover:text-gray-500"href="">ROI Calculator</a></li>
                                <li class=""><a class="hover:text-gray-500"href="">About</a></li>
                            </ul>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;