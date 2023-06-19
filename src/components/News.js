import React, { useEffect , useState } from "react";

import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";





const News=(props)=> {

  const [articles,setArticles]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalResults,setTotalResults]=useState(0)
  //document.title=`${capitalize(props.category)}-AllNews`
  
  
  const  updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`;
    
    setLoading(true)
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(data);
    console.log(parsedata);
    setArticles(parsedata.articles);
    setTotalResults(parsedata.totalResults)
    setLoading(false)
   
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews();
  },[])
  

  const fetchMoreData = async () => {
  
let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7bd7528e050941efa343422a58854346&page=${page+1}&pageSize=${props.pagesize}`;
setPage(page+1)
    
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(data);
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults)
    setLoading(false);
    
  };


  
 const capitalize=(s)=>{
      return s.charAt(0).toUpperCase()+s.slice(1)
  }
  
    return (
      <>
     
        <h2 className="text-center" style={{marginTop:"90px"}}>AllNews - Top headlines on {capitalize(props.category)} category</h2>
        {loading && <Loading />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Loading></Loading>}
        >
        <div className="container">
        <div className="row">
          {
            articles.map((ele) => {
              return (
                <div key={ele.url} className="col-md-4">
                  <NewsItem
                    title={ele.title ? ele.title : ""}
                    description={ele.description ? ele.description : ""}
                    author={ele.author ? ele.author : "Unknown"}
                    date={ele.publishedAt}
                    imageUrl={
                      ele.urlToImage
                        ? ele.urlToImage
                        : "https://media.istockphoto.com/id/1390033645/photo/world-news-background-which-can-be-used-for-broadcast-news.jpg?b=1&s=170667a&w=0&k=20&c=glqFWZtWU4Zqyxd8CRu5_Or81zqwe7cyhturXaIFEOA="
                    }
                    newsUrl={ele.url}
                    source={ele.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
       
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pagesize: 8,
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
};
export default News;
