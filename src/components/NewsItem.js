import React from 'react'
import defaultImage from './images/defaultImage.png'

const NewsItem = (props)=>{
  let {title,description, imageUrl, newsUrl, author, date, source} = props;

    return (
      <div className='my-3'>
          <div className="card">
            <div style={{display:"flex", 
                         justifyContent:"flex-end", 
                         position:"absolute", 
                         right:0}}>
              <span className="badge rounded-pill bg-danger">{source}
              </span>
            </div>
            
            <img src={imageUrl?imageUrl:defaultImage}
            className="card-img-top" style={{height: "15rem"}} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...
                    <span className="badge rounded-pill bg-success">New</span>
                </h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">
                  By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small>
                </p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            
          </div>
      </div>
    )
}

export default NewsItem

//<div className="card" style="width: 18rem;"> here there is an inline style element, therefore we have to convert it to an object
//to do this we put two brackets:  {{width: "18rem"}}
//1st bracket converts it into js and next bracket converts it into object


//whenever we use constructor we must use the super(); class inside it.


//here in img src: if the image is present-we display the image, and if its null/not-present, we display a default image.
//this is done by using a ternary operator


//display author and date of the news item, like who published it and the date of the news.
//to do that we pass props in the news.js

//if author isnt present or is null, then we write Unknown, else name of the author
//{author===null?"Unknown":author}
//this can also be written as
//{!author?"Unknown":author}

//also we have converted our date to GMTString by the .toGMTString() method
//previous: {date}
//now: {new Date(date).toGMTString()}


//used 2badges in the title section 
//<span class="badge rounded-pill bg-success">New</span>
//in 1 badge, we have passed the source of the news