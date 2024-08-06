import logo from '../../assets/logo.png'
import intro from '../../assets/intro.svg'

function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">
                <div className="text-center mt-12"><img src={intro} alt="SI Jurnal Intro" className="w-full inline-block"></img></div>
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro