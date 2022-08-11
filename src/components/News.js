import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
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
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9475999c2494ad0b698214a92065581&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
        articles: parsedData.articles, 
        totalResults: parsedData.totalResults,
        loading: false
    });
  }

  handlePreviousClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9475999c2494ad0b698214a92065581&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ 
        articles: parsedData.articles, 
        page: this.state.page - 1, 
        loading: false 
    });
  };

  handleNextClick = async () => {
    console.log("Next");
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e9475999c2494ad0b698214a92065581&page=${
            this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({loading: false});
        this.setState({ 
            articles: parsedData.articles, 
            page: this.state.page + 1, 
            loading: false 
        });
    }
};
    
  render() {
    console.log("render");
    return (
      <div className="container my-3">
          <h1 className="text-center" style={{margin: "35px 0px"}}><b>NewsMonkey - Top Headlines</b></h1>
          {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
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
            disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
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


// Categories:
// business
// entertainment
// general
// health
// science
// sports
// technology
