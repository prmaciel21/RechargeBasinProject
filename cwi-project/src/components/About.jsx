import drought from "./drought_img.jpg";
import cwiBuilding from "./cwi_building.jpeg";
import rechargeBasin from "./recharge_basin.png";
import logo from "./california_water_institute_logo.png";

function ProblemStatement() {
    return (
        <section id="problem_solution" className="flex flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto gap-8">

            {/*This is part of the grid where the title and description sit on the left*/}
            <div className="md:w-1/2 w-full text-left space-y-4">
                <h2 className="text-l md:text-2xl font-bold">The Problem</h2>
                <p className="leading-relaxed text-sm md:text-lg">
                    The Central Valley of California is facing significant challenges related to water scarcity and management. With increasing population growth and agricultural demands, the existing water infrastructure is under immense pressure. Traditional water sources are becoming less reliable due to prolonged droughts and climate change, leading to a critical need for sustainable water solutions. The lack of efficient recharge basins exacerbates the situation, resulting in decreased groundwater levels and increased vulnerability to water shortages. Assembly Bill 685 highlights the importance of ensuring safe and affordable water for all residents, making it imperative to address these challenges through innovative and effective water management strategies.
                </p>
            </div>

            {/*The image sits on the right side*/} 
            <div className="md:w-1/2 w-full flex justify-center mr-5">
                <img src={drought} alt="Drought Affected Area" className="rounded-lg w-full h-auto max-w-md object-contain">
                </img>
            </div>       

        </section>
    );
}

function Solution() {
    return (
        <section id="problem_solution" className="flex flex-col md:flex-row-reverse items-center justify-between px-8 py-16 max-w-7xl mx-auto gap-8">
            <div className="md:w-1/2 w-full text-left space-y-4">
                <h2 className="text-l md:text-2xl font-bold">Our Solution</h2>
                <p className="leading-relaxed text-sm md:text-lg">
                    Groundwater recharge is one of the most effective and feasible solutions to achieving the desirable quality and quantity of the communities groundwater. Our mission is to increase the use of water recharge basins which would work to replenish our underground aquifers and as a result increase groundwater levels. The California Water Institute (CWI) wants to encourage farmers to use their unused land for water recharge basins. These projects can be costly for these farmers. To facilitate the calculation of costs for these farmers and whether it is the correct decision, we are implementing this online calculator that will ask the farmers for their input and give them an estimated cost and return on investment overtime.
                </p>
            </div>
            <div className="md:w-1/2 w-full flex justify-center">
                <img src={rechargeBasin} alt="Drought Affected Area" className="rounded-lg w-full h-auto max-w-md object-contain">
                </img>
            </div>
        </section>
    );
}

function About() {
    return (
        <section
            className='relative h-screen bg-cover bg-center flex flex-col justify-center items-center'
            style={{ backgroundImage: `url(${cwiBuilding})` }}>
            <div id="about" className='relative z-10 text-center px-4 bg-white bg-opacity-100 p-6 rounded-lg'>
                <h2 className="text-5xl font-bold mb-10">About Us</h2>
                <p className='text-2xl max-w-2xl mx-auto opacity-90 mb-30'>
                    The California Water Institute (CWI) is dedicated to finding smart, sustainable solutions for California's water challenges. Based in the San Joaquin Valley, the CWI brings together students, researchers, and community partners to tackle issues like climate change, population growth, and water scarcity. Through hands-on learning, research and collaboration, CWI helps prepare the next generation of water leaders while supporting efforts to build a more resilient and sustainable future for all.
                </p>
                <img className="inline" src={logo} alt="Fresno State Logo"/>
            </div>
        </section>
    );
}

export default {
    ProblemStatement,
    Solution,
    About
};