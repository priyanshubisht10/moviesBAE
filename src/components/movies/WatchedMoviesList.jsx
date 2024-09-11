import WatchedMovie from "./WatchedMovie"


export default function WatchedMoviesList({ watched, onSelectedId, onDeleteWatched }) {
   return (<ul className="list">
      {watched.map((movie) => (
         <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            onSelectedId={onSelectedId}
            onDeleteWatched={onDeleteWatched} />
      ))}
   </ul>)
}