export default function WatchedMovie({ movie, onSelectedId, onDeleteWatched }) {
   return (<li key={movie.imdbID} >
      <img src={movie.poster} alt={`${movie.Title} poster`} onClick={() => onSelectedId(movie.imdbID)} />
      <h3 onClick={() => onSelectedId(movie.imdbID)}>{movie.title}</h3>
      <div>
         <p onClick={() => onSelectedId(movie.imdbID)}>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
         </p>
         <p onClick={() => onSelectedId(movie.imdbID)}>
            <span>🌟</span>
            <span>{movie.userRating}</span>
         </p>
         <p onClick={() => onSelectedId(movie.imdbID)} >
            <span>⏳</span>
            <span>{movie.runtime} min</span>
         </p>
         <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
   </li>)
}