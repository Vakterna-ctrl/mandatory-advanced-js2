import React from 'react';
import axios from 'axios';
import './page.css'
import {Helmet} from "react-helmet";
import MovieTable from './MovieTable'
import Edit from './Edit'
import {Link,Route, BrowserRouter as Router} from 'react-router-dom'



class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      movieList: [],
      value: '',
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

  onChange=(e)=>{
    this.setState({value:e.target.value})
  }
  onDelete=(movie)=>{
    axios.delete('http://3.120.96.16:3001/movies/' + movie)
      .then(()=>{
        axios.get('http://3.120.96.16:3001/movies/')
        .then(response=>{
          this.setState({movieList:response.data})
        }).catch(error=>{
          console.log(error)
        })
      }).catch(()=>{
        alert('error')
      })

  }
  render(){
    console.log(this.props.onMovieEdit)
    const{movieList,value}=this.state
    if(movieList.length === 0){
      return <p>still loading</p>
    }
    return(
      <div className="MainPage">
      <table>
      <thead>
      <tr>
      <th>title</th>
      <th>director</th>
      <th>rating</th>
      <th>Delete</th>
      <th>Redigering</th>
      <th>Information</th>
      </tr>
      </thead>
      <tbody>
      <MovieTable
      movieList={movieList}
      value={value}
      onDelete={this.onDelete}
      onMovieEdit={this.props.onMovieEdit}
      />


      </tbody>
      </table>
      <form>
      <input type="text" placeholder="search text" onChange={this.onChange} value={value} />
      </form>

      <Helmet>
      <title>
      Main Page
      </title>
      </Helmet>

      </div>
    )
  }
}



export default MainPage
