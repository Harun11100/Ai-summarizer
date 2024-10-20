import { useEffect, useState } from "react";
import { copy, linkIcon, loader } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { BiTrash,BiLoaderCircle } from "react-icons/bi";

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))||[];

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  // const [placeholder, setPlaceholder] = useState('Enter the link');

  // const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];
      setAllArticles(updatedAllArticles);
      setArticle(newArticle);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));  // Store articles array
    } else if (error) {
      console.error('Error fetching summary:', error);  // Log error for debugging
    }
  };





  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true); // Start submitting
  
  //   try {
  //     const { data } = await getSummary({ articleUrl: article.url });
  
  //     if (data?.summary) {
  //       const newArticle = { ...article, summary: data.summary };
  //       const updatedAllArticles = [newArticle, ...allArticles];
  //       setAllArticles(updatedAllArticles);
  //       // setArticle({ url: '', summary: '' }); // Reset the input field
  
  //       // Clear the placeholder after successful submission
  //       setPlaceholder(''); 
  
  //       localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
  //     } else {
  //       alert("Summary not available for this URL. Please try a different one.");
  //     }
  //   } catch (err) {
  //     console.error('Error fetching summary:', err);
  //     alert('Unable to fetch summary. Please check the URL and try again.');
  //   } finally {
  //     setIsSubmitting(false); // Reset submitting state
  //   }
  // };
  const handleDelete=(urlDelete)=>{

    const updatedArticles=articlesFromLocalStorage.filter(article=>article.url!==urlDelete)
    
    localStorage.setItem('articles',JSON.stringify(updatedArticles))

    setAllArticles(updatedArticles)
    
  }
  
  return (
    <section className="max-w-xl w-full mt-16">
      <div className="flex flex-col w-full gap-2">
        <form className="flex items-center relative justify-center" onSubmit={handleSubmit} >
          <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder='Enter the link'
            // Set the placeholder dynamically
            required
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            className="url_input peer"
          />
          <button className="submit_btn  peer-focus:border-gray-700 peer-focus:text-gray-700">
            {isFetching ?<BiLoaderCircle/> : '<'}
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60">
          {allArticles.map((art, index) => (
            <div
              key={art.url || `link-${index}`}  // Use URL if available for a unique key
              onClick={() => setArticle(art)}
              className="link_card"
            >
              <div className="copy_btn">
                <img src={copy} alt="cpy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 font-satoshi text-blue-400 font-medium text-sm truncate">{art.url}</p>
              <button className="px-2 rounded-full hover:bg-slate-300 py-1 " onClick={()=>handleDelete(art.url)}><BiTrash/></button>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loading..." />
        ) : error ? (
          <p>Sorry! Please check the link and try again.</p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-satoshi font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
