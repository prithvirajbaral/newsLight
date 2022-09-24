import React from 'react'

const NewsItem = (props) => {




  
    let { title, description, imageUrl, newsUrl, author, date, source } = props
    return (
      <div className='container my-3'>
        <div className="card">
        <div style={{display:'flex',justifyContent:'flex-end', position:'absolute', right:'0' }}><span className="badge rounded-pill bg-danger">{source}</span></div>
          

          <img src={!imageUrl ? "https://images.livemint.com/img/2022/08/31/600x338/bonus_shares_1661928306010_1661928306235_1661928306235.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted"><strong>By</strong> {author ? author : "Unknown"}</small></p>
            <p className="card-text"><small className="text-muted"><strong>Date</strong> {date ? new Date(date).toUTCString() : "Unknown"}</small></p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem