/*
* Movies Component of the Movie Application 
* This Component will present to the user a UI with the most 
* Popular Movies from the MOVIE DB API
* UI does not display every detail of the Movies in Question
*/
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import "./Movies.css";
import { getPopularFilms } from "../Actions/actionCreators";

class Movies extends React.Component {
  componentWillMount() {
    this.props.getPopularFilms();
  }

  renderMovie(movie, i) {
    
    return (
      <div className=" main-container ">
        <Link key={i} to={`/details/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
          />
        </Link>
      </div>
    );
  }

  render() {
    var movies = this.props.movies.list.map(this.renderMovie);
    return (
      <div className="movies-list">
        <Search />
        {movies}
      </div>
    );
  }
}

function mapStateToProps({ movies }) {
  return {
    movies
  };
}

export default connect(mapStateToProps, { getPopularFilms })(Movies);
