import React from 'react';
import './page.css'
import axios from 'axios'
import { Redirect,BrowserRouter as Router } from 'react-router-dom';
import Rating from 'react-rating'
import {Helmet} from "react-helmet";

class AddPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      director: '',
      rating: 0,
      isClicked: false,
    }
  }
  onChange=(e)=>{
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onClick=(e)=>{
    e.preventDefault();
    const{title,description,director,rating} = this.state
    const data = {
      title:title,
      description:description,
      director:director,
      rating: rating,
    }

    axios.post('http://3.120.96.16:3001/movies',data)
    .then(() =>{
      this.setState({isClicked: true})

    })
    .catch(response=>{
      alert(response)
    })
  }


  render(){
    if(this.state.isClicked){
      return <Redirect to="/" />
    }
    console.log(this.state.rating)


    return(

      <form className="formular">
      <label>filmens title</label>
      <input type="text" name="title" onChange={this.onChange} placeholder="title"/>
      <label>filmens innehåll</label>
      <input type="textarea" name="description" onChange={this.onChange} placeholder="description"/>
      <label>filmens direktör</label>
      <input type="text" name="director" onChange={this.onChange} placeholder="director"/>
      <label>filmens rankning</label>
      <div>
      <Rating fractions={10}
      initialRating={this.state.rating}
      onClick={(value)=>{this.setState({rating:value})}}
      />
      </div>
      <input type="submit" onClick={this.onClick} />
      <Helmet>
      <title>
      AddPage
      </title>
      </Helmet>
      </form>
    )
  }



}

export default AddPage
