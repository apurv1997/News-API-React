import './App.css';

import React, {Component} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  
  render(){
    return (
      <div>
    <Navbar/>
    <News pageSize={5} country="in" category="sports"/>
      </div>
    )
  }
}

//API Key: e9475999c2494ad0b698214a92065581
// url: https://newsapi.org/v2/top-headlines?country=in&apiKey=e9475999c2494ad0b698214a92065581
