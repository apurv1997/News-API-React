import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  // constructor runs before the render() method:
  constructor() {
    super();
    console.log("hello I am a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  // componentDidMount start working after the completion of render() method:
  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=e9475999c2494ad0b698214a92065581&page=1pageSize=20"
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults});
  }

  handlePreviousClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e9475999c2494ad0b698214a92065581&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, page: this.state.page - 1 });
  };

  handleNextClick = async () => {
    console.log("Next");
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20 )){

    }
    else {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=e9475999c2494ad0b698214a92065581&page=${
            this.state.page + 1
        }&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, page: this.state.page + 1 });
    }
};
    
  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1>
          <b>NewsMonkey - Top Headlines</b>
        </h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 35) : ""}
                  description={
                    element.description ? element.description.slice(0, 70) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default News;
