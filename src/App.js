import { useEffect, useState } from "react";
import Navbar from "./components/commons/Navbar";
import Logo from "./components/commons/Logo";
import Search from "./components/commons/Search";
import NumResults from "./components/commons/NumResults";
import Main from "./components/Main";
import Box from "./components/commons/Box";
import Loader from "./components/commons/Loader";
import MovieList from "./components/movies/MovieList";
import ErrorMessage from "./components/commons/ErrorMessage";
import MovieDetails from "./components/movies/MovieDetails";
import WatchedSummary from "./components/movies/WatchedSummary";
import WatchedMoviesList from "./components/movies/WatchedMoviesList";


export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');

  useEffect(function () {
    const controller = new AbortController();
    async function fetchMovies() {
      setIsLoading(true)
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
          { signal: controller.signal });
        if (!res.ok) {
          throw new Error("Something went wrong!")
        }
        const data = await res.json();
        setMovies(data.Search)
        setError("");
      } catch (e) {
        console.log(e.message);
        if (e.name !== 'AbortError') {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
    return function () {
      controller.abort()
    };

  }, [query]);

  function handleChangeQuery(q) {
    setQuery(q)
  }

  function handleSelectedMovie(id) {
    console.log(id);
    setSelectedId(id)
  }

  function handleOnCloseMovie() {
    setSelectedId('')
  }

  function handleAddWatched(newWatchedMovie) {

    setWatched(watched => {
      // Check if the movie with the same imdbid already exists
      const existingIndex = watched.findIndex(movie => movie.imdbID === newWatchedMovie.imdbID);

      if (existingIndex !== -1) {
        // If it exists, update the existing movie
        const updatedWatched = [...watched];
        updatedWatched[existingIndex] = newWatchedMovie;
        return updatedWatched;
      } else {
        // If it does not exist, add the new movie
        return [...watched, newWatchedMovie];
      }
    });
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter((m) => m.imdbID !== id))
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search onChangeQuery={handleChangeQuery} q={query} />
        <NumResults len={movies?.length || 0} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error &&
            <MovieList
              movies={movies}
              onSelectedId={handleSelectedMovie}
            />}
          {error && <ErrorMessage message={error} />}

        </Box>
        <Box>
          {selectedId ?
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleOnCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            /> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onSelectedId={handleSelectedMovie}
                onDeleteWatched={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}
