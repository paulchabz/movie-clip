/*
* Movie Detail Component to be rendered when 
* the user clicks on a specific movie displaying more details about film
*/
import React from "react";
import { connect } from "react-redux";
import "./MovieDetail.css";
import { Link } from "react-router-dom";
import { fetchMovieActionCreator } from "../Actions/actionCreators";
import { fetchMovieTrailerActionCreator } from "../Actions/actionCreators";

class MovieDetail extends React.Component {
  componentWillMount() {
    this.props.fetchMovie(this.props.match.params.id);
    this.props.fetchTrailer(this.props.match.params.id);
  }
  renderTrailer() {
    const { trailers } = this.props.trailer;
    const video = trailers.map((trailer, i) => {
      const { key } = trailer;
      const url = `https://www.youtube.com/embed/${key}`;
      return (
        <div className="trailer" key={i}>
          <iframe
            title="movie"
            width="500"
            height="350"
            src={url}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    });
    return <div className="videos">{video}</div>;
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="movie-detail col-lg-10 text-center">
            <h2>{movie.title}</h2>
            <h5>Status: {movie.status}</h5>
            <img
              className="img-thumbnail"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`poster for ${movie.title}`}
            />
            <div className="col-lg-2">
              <Link to="/movies">
                <button
                  type="button"
                  className="btn  btn-outline-dark btn-lg d-block"
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
          <div className="col overview">{movie.overview}</div>
          {this.renderTrailer()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ movieDetail, trailer }) {
  return {
    movie: movieDetail.movie,
    trailer
  };
}

export default connect(mapStateToProps, {
  fetchMovie: fetchMovieActionCreator,
  fetchTrailer: fetchMovieTrailerActionCreator
})(MovieDetail);
