import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie.css";

const Movie = forwardRef(({ id, medium_cover_image, title, summary, genres }, ref) => {
  return (
    <div className="movie" ref={ref}>
      <img className="movie_coverimg" src={medium_cover_image} alt={title} title={title} />
      <div className="movie_data">
        <h3 className="movie_title">
          <Link to={`/movie/${id}`}>{title}</Link>
        </h3>
        <p className="movie_summary">{summary.length > 300 ? `${summary.slice(0, 300)}` + "..." : summary}</p>
        <ul>
          <li className="movie_genres">
            {genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
});

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Movie;
