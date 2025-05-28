import Sneakers from '../components/Sneakers'
import Popup from "../components/Popup"
import Footer from "../components/Footer";


function Homepage() {

  return (
    <div>

    <main >
      <section>
      {/* Hero section */}
      <video
      src='../video/vid1.mp4'
       width='1540'
       muted
      //  autoPlay
      //  loop
      />
      </section> 
      
      <Popup/>
      

      <section className='min-h-screen'>
        <h2 className='text-3xl font-bold text-center pt-10'>TRENDING SNEAKERS</h2>
        <Sneakers/>
      </section>

      <section>
        {/* CTA */}
        {/* gotta do it */}
      </section>

      </main>

      <Footer/> 

    </div>


  )
}

export default Homepage
