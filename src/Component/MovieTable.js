import React from 'react'
import {Link,Route, BrowserRouter as Router} from 'react-router-dom'
import Edit from './Edit'


const MovieTable=({movieList,value,onDelete,onMovieEdit})=>{

     if(value === ''){
     return(
     movieList.map((movie,index) =>(
     <tr style={{backgroundColor:(index % 2 !== 0 ? 'lightgrey': 'white')}} key={movie.id}>
     <td>{movie.title}</td>
     <td>{movie.director}</td>
     <td>{movie.rating}</td>
     <td><button onClick={()=>onDelete(movie.id)}>delete</button></td>
     <td><Link onClick={()=>onMovieEdit(movie)} to= {`/edit/${movie.id}`}>Edit movie</Link></td>
     <td><Link onClick={()=>onMovieEdit(movie)} to={`/information/${movie.id}`}>Information about movie</Link></td>
     </tr>

   )
 )


)
}else{
return(
 movieList
 .filter(movie => movie.title.toLowerCase().includes(value.toLowerCase()) || movie.director.toLowerCase().includes(value.toLowerCase()))
 .map((movie,index) =>(
   <tr style={{backgroundColor:(index % 2 !== 0 ? 'lightgrey': 'white')}} key={movie.id}>
   <td>{movie.title}</td>
   <td>{movie.director}</td>
   <td>{movie.rating}</td>
   <td><button onClick={()=>onDelete(movie.id)}>delete</button></td>
   <Router>
   <td><Link to="/edit">Edit movie</Link></td>
   <td><Link to="/information">Information about movie</Link></td>
   </Router>
   </tr>

 ))
)
}

}
export default MovieTable
