import React from 'react';
import './page.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Helmet} from "react-helmet";

class Information extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      director: '',
      rating: '',
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


  render(){
    const{title,description,director,rating} = this.state
  return(
  <table className="info">
  <tbody>
  <tr>
  <th>{title}</th>
  <th>{description}</th>
  <th>{director}</th>
  <th>{rating}</th>
  <th><Link to={`/edit/${this.props.match.params.id}`}>To the edit page!</Link></th>
  </tr>
  </tbody>
  <Helmet>
  <title>
  Information
  </title>
  </Helmet>
  </table>
)

}

}

export default Information
