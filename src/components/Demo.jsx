import { useEffect, useState } from "react"
import { copy, linkIcon, loader } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {

  const[article,setArticle]=useState({
    url:'',
    summary:''
  })

  const [allArticle,setAllarticle]=useState([]);

  const[getSummary,{error,isFetching}] =useLazyGetSummaryQuery();

   useEffect(()=>{

    const articlesFromLocalStorage=JSON.parse(localStorage.getItem(article));
    if(articlesFromLocalStorage){
      setAllarticle(articlesFromLocalStorage)
    }


   },[])


  const handleSubmit=async(e)=>{
     e.preventDefault()
    
     const {data}=await getSummary({articleUrl:article.url})
      if (data?.summary){
        const newArticle={...article, summary:data.url}
      
      const updateAllArticles=[newArticle,...allArticle]
       setAllarticle(updateAllArticles)
       setArticle(newArticle)

       localStorage.setItem('article',JSON.stringify(updateAllArticles))
      }
 
    }



  return (
    <section className="max-w-xl w-full mt-16">
          <div className="flex flex-col w-full gap-2 " >
              <form className=" flex items-center relative justify-center" type="submit" onSubmit={handleSubmit} >
              <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 w-5" />
                  <input  type="url" placeholder="Enter the url" required value={article.url} onChange={(e)=>{setArticle({...article,url:e.target.value})}} className="url_input peer"/>
              <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" onClick={handleSubmit}>s</button>
            </form>
           <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                  {allArticle.map((art,index)=>(
                   <div key={`link-${index}`}
                   onClick={()=>setArticle(art)}
                   className='link_card' >
                       <div className="copy_btn">
                              <img src={copy} alt="cpy_icon" className="w-[40%] h-[40%] object-contain"/>
                       </div>
                       <p className="flex-1 font-satoshi text-blue-400 font-medium text-sm truncate">{art.url}</p>
                   </div>
                  ))}
           </div>
          </div>
           <div className="my-10 max-w-full flex justify-center items-center ">
            {
              isFetching?(
                <img src={loader} alt="loading..." />
              ):error?(
                <p>
                  Sorry ! Please check the link and try again.
                </p>
              ):(
                article.summary && (
                  <div className="flex flex-col gap-3">
                    <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span>
                    </h2>

                    <div className="summary_box">
                            <p className="font-satoshi font-medium text-sm text-gray-700">{article.summary}</p>
                    </div>


                  </div>
                )
              )
            }
           </div>
    </section>
    
  )
}

export default Demo