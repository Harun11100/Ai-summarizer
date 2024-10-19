import {logo} from '../assets'
const Hero = () => {
  return ( 
      <header className='w-full'>
            <nav className='flex w-full justify-between py-5'>
                  <div>
                      <img src={logo} alt="logo" />
                  </div>      
                  <div >
                      <button className='black_btn'>GitHub   
                      </button>
                  </div>
            </nav>
            <div>
            <h1 className="head_text">Summarize Articles with<br className='max-md:hidden'/> <span className="orange_gradient" >OpenAI GPT-4</span></h1>
            <div >
                  <p className='font-satoshi text-center py-5 leading-7'>Simplify your reading with Summraize an open-source article summarizer that transforms lengthy articles into clear and concise summaries</p>
            </div>
      </div>
       </header>  
  )
}
export default Hero