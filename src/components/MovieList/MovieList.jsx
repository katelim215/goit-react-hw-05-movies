import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import css from './MovieList.module.css';
import { MovieListItem } from 'components/MovieListItem/MovieListItem';

export const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  const handleClick = movieId => {
    navigate(`movie/${movieId}`);
  };

  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title }) => (
        <MovieListItem key={id} id={id} title={title} onClick={() => handleClick(id)} />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
};
