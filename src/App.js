import React from 'react';
import MainPage from './Component/MainPage'
import AddPage from './Component/AddPage'
import Edit from './Component/Edit'
import Information from './Component/Information'
import axios from 'axios';

import {Route,Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css'


class App extends React.Component {
  constructor(props){
    super(props)
      this.state ={
        movie: null,
        movieList:[],
      }

    }
    componentDidMount(){
      this.token = axios.CancelToken.source()
      axios.get('http://3.120.96.16:3001/movies', {cancel: this.token })
      .then(response =>{
        this.setState({movieList: response.data})
      }).catch(error =>{
        alert(error.message)
      })
    }
    componentWillUnmount(){
      this.token.cancel()
    }

  onMovieEdit=(movieObj)=>{
    this.setState({movie:movieObj})
  }
  render(){
    if(this.state.movieList.length === 0){
      return <p>still loading</p>
    }
    console.log(this.state.movie)
  return (

    <div className="App">
    <Router>
    <div className="router">
    <Link style={{margin:'20px'}} to="/">Main Page</Link>
    <Link to="/addPage">Add Page</Link>


    </div>
    <Route exact path="/" render={()=> <MainPage onMovieEdit={this.onMovieEdit} movieList={this.state.movieList}/>} />
    <Route path="/addpage" component={AddPage} />
    <Route path="/edit/:id" render={(props) => <Edit {...props} movie={this.state.movie}/>} />
    <Route path="/information/:id" render={(props) => <Information {...props} movie={this.state.movie}/>} />

    </Router>

    </div>
  )}
}

export default App;
