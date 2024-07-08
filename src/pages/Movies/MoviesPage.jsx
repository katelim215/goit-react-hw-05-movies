import { useEffect, useState } from 'react';
import { fetchMovieByQuery } from 'api/api';
import { MovieList } from 'components/MovieList/MovieList';
import { Outlet } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('query') ?? ''; // Default search query is empty

  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const navigate = useNavigate();

  const updateQueryString = query => {
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!movieName.trim()) return;
      setIsLoading(true);

      try {
        const movies = await fetchMovieByQuery(movieName);
        setMovies(movies);
        setSearchPerformed(true);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieName, navigate]);

  return (
    <div>
      <div className={css.inputWrapper}>
        <input
          type="text"
          className={css.input}
          onChange={e => updateQueryString(e.target.value)}
          placeholder="Search movies..."
        />
      </div>
      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <>
          {searchPerformed && movies.length === 0 && (
            <p style={{ textAlign: 'center' }}>No movies found for this search.</p>
          )}
          {movies.length > 0 && <MovieList movies={movies} />}
        </>
      )}
      <Outlet />
    </div>
  );
};

export default MoviesPage;
