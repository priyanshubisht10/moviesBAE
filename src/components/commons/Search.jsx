import { useRef } from "react"
import { useKey } from "../../hooks/useKey";

export default function Search({ onChangeQuery, q }) {

   const inputElement = useRef(null);

   useKey('Enter', function () {
      if (document.activeElement === inputElement.current) {
         return;
      }
      inputElement.current.focus();
      onChangeQuery("");
   })

   return (<input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={q}
      onChange={(e) => onChangeQuery(e.target.value)}
      ref={inputElement}
   />)
}