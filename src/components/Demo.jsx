import { linkIcon } from "../assets"


const Demo = () => {
  return (
    <section className="max-w-xl w-full mt-16">
      <div className="flex flex-col w-full gap-2 " >
      <form className=" flex items-center relative justify-center" type="submit" onSubmit={()=>{
      }} >
      <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 w-5" />
      <input  type="url" placeholder="Enter the url" required value='' onChange={()=>{}} className="url_input peer"/>
      <button className="submit_btn ">s</button>
    </form>
      </div>
    </section>
    
  )
}

export default Demo