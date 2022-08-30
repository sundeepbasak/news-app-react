import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const [date, setDate] = useState(new Date());
//let date: new Date().toLocaleDateString()


  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const UpdateNews = async()=>{
          props.setProgress(10);  //for loading bar
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0b58f34c4e543309b92caecfef27c95&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
          props.setProgress(40);  //for loading bar
    let parsedData = await data.json()
          props.setProgress(70);  //for loading bar

    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)

    props.setProgress(100);  //for loading bar
  }

  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
    UpdateNews();
  }, [])
  

  //click to view previous page
  const prevClickHandler = async ()=> {
    setPage(page - 1)
    UpdateNews();
  } 
  //click to view next page
  const nextClickHandler = async ()=>{
    setPage(page + 1)
    UpdateNews();
  }

  const fetchMoreData = async() => {
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e0b58f34c4e543309b92caecfef27c95&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)

    let data = await fetch(url);
    let parsedData = await data.json()

    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults) 
  };

  return (
      <>
        <h2 style={{marginTop: "5rem"}} className='text-center'>Top Headlines on {capitalizeFirstLetter(props.category)} : date</h2>
        
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
            <div className="container">
            <div className="row">

                {articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                      <NewsItem title={(element.title)?element.title.substring(0,50):""} 
                      description={(element.description)?element.description.substring(0,75):""} 
                      imageUrl={element.urlToImage} 
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt} 
                      source={element.source.name} />
                      </div>
                })}
              </div>
              </div>
        </InfiniteScroll>


        {/* in infinite scroll, we dont need prev and next button */}
        {/* <div className="container d-flex justify-content-between">
          <button disabled={page<=1} type="button" className="btn btn-dark" onClick={prevClickHandler}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={nextClickHandler}>Next &rarr;</button>
        </div> */}
      </>
    );
};

  News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

export default News;

//in function based components, we write props and proptypes at the end

//import useEffect and useState
//constructor is replaced by useState

//all props will be changed to props

//changes be like this :before with class based component
//this.setState({articles: parsedData.articles, 
//totalResults: parsedData.totalResults,
//loading: false   
//});    

//after:with function based component
//setArticles(parsedData.articles)
//setTotalResults(parsedData.totalResults)
//etLoading(false)


//componentDidMount is replaced by useEffect




//accessing key-value pairs from the articles array in the constructor
//every news item should have a unique key. In the articles array, here we take the unique key as the url as it is unique for evry news.
//eg: accessing title of the news by {element.title} and setting it to title.


//we dont want our title and description to be very long,we want to limit them only upto a certain length/characters followed by...
//we do that by .substring() method
//title={element.title.substring(0,30)}
//idk why in my description - the substring function is not working bcoz some newsitem description is null
//so we use a ternary function for this, if description is present then slice/substring it, else provide an empty string.

//here, constructor runs first, then return and then the componentDidMount


//we cant use {prevClickHandler}, as we are using class components here, so we have to use this. eg: {this.prevClickHandler}


//Math.ceil() function always rounds a number up to the next largest integer.
//eg: 4.2 will give us 5


//setting the loading

//when our loading is true(i.e this.state.loading === truethen dont show anything, and if this.state.loading === false then show news item), we want that the newsitem becomes invisible and when our loading becomes false, news item shows


//document.title = props.category;
//changing the title on going to different category