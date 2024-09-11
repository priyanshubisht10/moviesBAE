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

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// function Navbar({ children }) {
//   return (
//     <nav className="nav-bar">
//       {children}
//     </nav>)
// }

// function Logo() {
//   return (<div className="logo">
//     <span role="img">🍿</span>
//     <h1>MoviesBae</h1>
//   </div>)
// }

// function Search({ onChangeQuery, q }) {
//   return (<input
//     className="search"
//     type="text"
//     placeholder="Search movies..."
//     value={q}
//     onChange={(e) => onChangeQuery(e.target.value)}
//   />)
// }

// function NumResults({ len }) {
//   return (<p className="num-results">
//     Found <strong>{len}</strong> results
//   </p>)
// }

// function Main({ children }) {
//   return (<main className="main">
//     {children}
//   </main>)
// }

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   return (<div className="summary">
//     <h2>Movies you watched</h2>
//     <div>
//       <p>
//         <span>#️⃣</span>
//         <span>{watched.length} movies</span>
//       </p>
//       <p>
//         <span>⭐️</span>
//         <span>{avgImdbRating}</span>
//       </p>
//       <p>
//         <span>🌟</span>
//         <span>{avgUserRating}</span>
//       </p>
//       <p>
//         <span>⏳</span>
//         <span>{avgRuntime} min</span>
//       </p>
//     </div>
//   </div>)
// }

// function WatchedMovie({ movie, onSelectedId, onDeleteWatched }) {
//   return (<li key={movie.imdbID} >
//     <img src={movie.poster} alt={`${movie.Title} poster`} onClick={() => onSelectedId(movie.imdbID)} />
//     <h3 onClick={() => onSelectedId(movie.imdbID)}>{movie.title}</h3>
//     <div>
//       <p onClick={() => onSelectedId(movie.imdbID)}>
//         <span>⭐️</span>
//         <span>{movie.imdbRating}</span>
//       </p>
//       <p onClick={() => onSelectedId(movie.imdbID)}>
//         <span>🌟</span>
//         <span>{movie.userRating}</span>
//       </p>
//       <p onClick={() => onSelectedId(movie.imdbID)} >
//         <span>⏳</span>
//         <span>{movie.runtime} min</span>
//       </p>
//       <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
//     </div>
//   </li>)
// }

// function WatchedMoviesList({ watched, onSelectedId, onDeleteWatched }) {
//   return (<ul className="list">
//     {watched.map((movie) => (
//       <WatchedMovie
//         movie={movie}
//         key={movie.imdbID}
//         onSelectedId={onSelectedId}
//         onDeleteWatched={onDeleteWatched} />
//     ))}
//   </ul>)
// }

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (<div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen((open) => !open)}
//     >
//       {isOpen ? "–" : "+"}
//     </button>
//     {isOpen && children}
//   </div>)
// }

// function MovieList({ movies, onSelectedId }) {
//   return ((
//     <ul className="list">
//       {movies?.map((movie) => (
//         <Movie movie={movie} key={movie.imdbID} onSelectedId={onSelectedId} />
//       ))}
//     </ul>
//   ))
// }

// function Movie({ movie, onSelectedId }) {
//   return (<li className="movies-list" key={movie.imdbID} onClick={() => onSelectedId(movie.imdbID)}>
//     <img src={movie.Poster} alt={`${movie.Title} poster`} />
//     <h3>{movie.Title}</h3>
//     <div>
//       <p>
//         <span>🗓</span>
//         <span>{movie.Year}</span>
//       </p>
//     </div>
//   </li>)
// }

// function Loader() {
//   return (<p className="loader">Loading ... </p>)
// }

// function ErrorMessage({ message }) {
//   <p className="error">
//     <span>⚠️</span>
//     {message}
//   </p>
// }

// function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [userRating, setUserRating] = useState(0);

//   const isWatched = watched.map(m => m.imdbID).includes(selectedId);
//   let uR = 0;
//   if (isWatched) {
//     uR = watched.find(m => m.imdbID === selectedId)?.userRating;
//   }
//   console.log(isWatched);

//   useEffect(function () {
//     async function getMovieDetails(selectedId) {
//       const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`);
//       const data = await res.json();
//       setMovie(data);
//       setIsLoading(false);

//       // console.log(data);
//     }
//     getMovieDetails(selectedId);
//   }, [selectedId]);

//   useEffect(() => {
//     if (!movie.Title) return;
//     document.title = `Movie | ${movie.Title}`;

//     return function () {
//       document.title = 'MoviesBAE'
//     }
//   }, [movie])

//   useEffect(function () {
//     function callback(e) {
//       if (e.code === 'Escape') {
//         onCloseMovie();
//       }
//     }
//     document.addEventListener('keydown', callback);
//     return function () {
//       document.removeEventListener('keydown');
//     }
//   }, [onCloseMovie]);

//   function handleAdd(movie) {
//     const newMovie = {
//       imdbID: movie.imdbID,
//       title: movie.Title,
//       year: movie.Year,
//       poster: movie.Poster,
//       runtime: Number(movie.Runtime.split(' ')[0]),
//       imdbRating: Number(movie.imdbRating),
//       userRating: Number(userRating)
//     };
//     onAddWatched(newMovie)
//     onCloseMovie();
//   }

//   function handleSetRating(r) {
//     setUserRating(r);
//   }

//   return (
//     isLoading ? <Loader /> :
//       <div className="details">
//         <header>
//           <button className="btn-back" onClick={onCloseMovie}></button>
//           <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
//           <div className="details-overview">
//             <h2>{movie.Title}</h2>
//             <p>{movie.Released} &bull; {movie.Runtime}</p>
//             <p>{movie.Genre}</p>
//             <p><span>⭐</span> {movie.imdbRating} IMDB Rating</p>
//           </div>
//         </header>
//         <section>
//           <div className="rating">
//             <StarRating maxRating={10} size={22} onSetRating={handleSetRating} preSetRating={uR}></StarRating>
//             <button className="btn-add" onClick={() => { handleAdd(movie) }}>+ Add to list</button>
//           </div>
//           <p>
//             <em>{movie.Plot}</em>
//           </p>
//           <p>Starring {movie.Actors}</p>
//           <p>Directed By {movie.Director}</p>
//         </section>
//       </div>)
// }

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
