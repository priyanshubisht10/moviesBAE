export default function Search({ onChangeQuery, q }) {
   return (<input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={q}
      onChange={(e) => onChangeQuery(e.target.value)}
   />)
}