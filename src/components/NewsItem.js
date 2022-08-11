import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
   let {title, description, imageUrl, newsUrl} = this.props
    return (
      <div className="my-3">
         <div className="card">
            <img src={!imageUrl?"https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2019/09/Screen-Shot-2019-09-10-at-13.03.17-PM.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
