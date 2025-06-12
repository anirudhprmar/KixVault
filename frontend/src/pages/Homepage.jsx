import Sneakers from '../components/Sneakers'
import Popup from "../components/Popup"
import Footer from "../components/Footer";
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import {ArrowRightCircleIcon} from 'lucide-react'


function Homepage() {
  return (
    <div>
  <Navbar/>
    <main >
      <section>
      {/* Hero section */}
      <video
      src='../video/vid1.mp4'
       width='1540'
       muted
       autoPlay
      //  loop
      />
      </section> 
      
      <Popup/>
      

      <section className='min-h-screen'>
        <h2 className='text-3xl font-bold text-center pt-10'>TRENDING SNEAKERS</h2>
        <div className='flex flex-col items-end pb-10'>
          <Sneakers/>
          <Link to={'/products'}
          className='text-xl font-semibold hover:underline hover:transform-stroke flex items-center gap-2 px-10 cursor-pointer'
          >
          look at more
          <span className='hover:animate-spin'><ArrowRightCircleIcon/></span>
          </Link>
        </div>
      </section>

      </main>

      <Footer/> 

    </div>


  )
}

export default Homepage
