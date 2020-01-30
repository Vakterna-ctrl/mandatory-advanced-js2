import React from 'react';
import './page.css'
import axios from 'axios'
import { Redirect,BrowserRouter as Router } from 'react-router-dom';
import Rating from 'react-rating'
import {Helmet} from "react-helmet";

class Edit extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      director: '',
      rating: null,

    }
  }
  componentDidMount(){
    this.token = axios.CancelToken.source()
    axios.get(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`,{canceltoken: this.token})
      .then(response =>{
        this.setState({
          title: response.data.title,
          description: response.data.description,
          director: response.data.director,
          rating: response.data.rating
        })
      })
  }
  componentWillUnmount(){
    this.token.cancel()
  }
  onChange=(e)=>{
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onClick=(e)=>{
    e.preventDefault();
    const data = {
      title: this.state.title,
      description: this.state.description,
      director: this.state.director,
      rating: this.state.rating,

    }
    axios.put(`http://3.120.96.16:3001/movies/${this.props.match.params.id}`,data)
      .then(()=>{
      alert('it has been updated')
    }).catch((response)=>{
      alert(response.details)
    })


  }

  render(){

    const{title,description,director,rating} = this.state
    if(rating === null){
      return <p>loading....</p>
    }
    return(
      <form className="formular">
      <label>filmens title</label>
      <input type="text" name="title" onChange={this.onChange} value={title}/>
      <label>filmens innehåll</label>
      <input type="textarea" name="description" onChange={this.onChange} value={description}/>
      <label>filmens direktör</label>
      <input type="text" name="director" onChange={this.onChange} value={director}/>
      <label>filmens rankning</label>
      <div>
      <Rating fractions={10}
      initialRating={rating}
      onClick={(value)=>{this.setState({rating:value})}}
      />
      </div>
      <input type="submit" onClick={this.onClick} />
      <Helmet>
      <title>
      Edit
      </title>
      </Helmet>
      </form>
    )
  }



}

export default Edit
