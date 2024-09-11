import { useEffect, useState } from "react";
import Loader from "../commons/Loader";
import StarRating from "../StarRating";

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
   const [movie, setMovie] = useState({});
   const [isLoading, setIsLoading] = useState(true);
   const [userRating, setUserRating] = useState(0);

   const isWatched = watched.map(m => m.imdbID).includes(selectedId);
   let uR = 0;
   if (isWatched) {
      uR = watched.find(m => m.imdbID === selectedId)?.userRating;
   }
   console.log(isWatched);

   useEffect(function () {
      async function getMovieDetails(selectedId) {
         const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`);
         const data = await res.json();
         setMovie(data);
         setIsLoading(false);

         // console.log(data);
      }
      getMovieDetails(selectedId);
   }, [selectedId]);

   useEffect(() => {
      if (!movie.Title) return;
      document.title = `Movie | ${movie.Title}`;

      return function () {
         document.title = 'MoviesBAE'
      }
   }, [movie])

   useEffect(function () {
      function callback(e) {
         if (e.code === 'Escape') {
            onCloseMovie();
         }
      }
      document.addEventListener('keydown', callback);
      return function () {
         document.removeEventListener('keydown', callback);
      }
   }, [onCloseMovie]);

   function handleAdd(movie) {
      const newMovie = {
         imdbID: movie.imdbID,
         title: movie.Title,
         year: movie.Year,
         poster: movie.Poster,
         runtime: Number(movie.Runtime.split(' ')[0]),
         imdbRating: Number(movie.imdbRating),
         userRating: Number(userRating)
      };
      onAddWatched(newMovie)
      onCloseMovie();
   }

   function handleSetRating(r) {
      setUserRating(r);
   }

   return (
      isLoading ? <Loader /> :
         <div className="details">
            <header>
               <button className="btn-back" onClick={onCloseMovie}></button>
               <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
               <div className="details-overview">
                  <h2>{movie.Title}</h2>
                  <p>{movie.Released} &bull; {movie.Runtime}</p>
                  <p>{movie.Genre}</p>
                  <p><span>⭐</span> {movie.imdbRating} IMDB Rating</p>
               </div>
            </header>
            <section>
               <div className="rating">
                  <StarRating maxRating={10} size={22} onSetRating={handleSetRating} preSetRating={uR}></StarRating>
                  <button className="btn-add" onClick={() => { handleAdd(movie) }}>+ Add to list</button>
               </div>
               <p>
                  <em>{movie.Plot}</em>
               </p>
               <p>Starring {movie.Actors}</p>
               <p>Directed By {movie.Director}</p>
            </section>
         </div>)
}