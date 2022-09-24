import React,{useState,useEffect} from 'react'
import NewsItem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
   
   
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const capitalizeFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    };
    
   
    //document.title = `${this.capitalizeFirstLetter(this.props.category)}- News monkey`;
    

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=121263f1f5d749aea9bf82be9e881d58&pageSize=${props.pageSize}&page=${page}`;
        
        setloading(true);
        let data = await fetch(url); //await wait for promices
        props.setProgress(30);

        let parsedData = await data.json()
        props.setProgress(60);

        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setloading(false)

        
        
        props.setProgress(100);

    };
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsLight`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    

    
 
    const fetchMoreData = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
        
        setpage(page+1)
        let data = await fetch(url); //await wait for promices
        let parsedData = await data.json()

        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        setloading(false)

    };
        

        
        
       
   


    
        return (
            <>
            
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsLight - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
                
               
                    
            
            </>     
            
                    
                
                
        )
     }

 News.defaultProps = {
    country:'in',
    pageSize:6,
    category:'general'

}
News.propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

}




export default News