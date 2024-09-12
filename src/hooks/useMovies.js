import { useEffect, useState } from "react";

export function useMovies(query, callback) {
   const [movies, setMovies] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
         try {
            setIsLoading(true)
            const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
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

   }, [query, callback]);

   return { movies, isLoading, error };
}