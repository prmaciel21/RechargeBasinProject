import './App.css'
import "leaflet/dist/leaflet.css";
import Navbar from './components/Navbar'
import About from './components/About'
import backgroundImg from "./components/cwi_project_background.jpg"
import FindYourROI from './components/ROI.jsx'

function App() {

  return (
      <div className="min-h-body font-[Poppins]">

        {/* Navigation bar */}
        <Navbar />

        <section
          className='relative h-screen bg-cover bg-center flex flex-col justify-center items-center'
          style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className='relative z-10 text-center px-4'>
              <h1 className="text-5xl font-bold mb-10">
                WATER RECHARGE BASIN PROJECT
              </h1>
              <p className='text-2xl max-w-2xl mx-auto opacity-90 mb-50'>
                Advancing water through innovation and research.
              </p>
            </div>
        </section>
        <main>
          <section className='relative h-screen bg-cover bg-center flex flex-col justify-center items-center'>
            <About.ProblemStatement />
            <About.Solution />
          </section>
          <FindYourROI />
          <About.About />
        </main>
        <footer>
          <div className="bg-white text-center p-4"></div>
        </footer>
      </div>
  )
}

export default App;
