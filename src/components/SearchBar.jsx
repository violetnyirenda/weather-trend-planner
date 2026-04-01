import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const submitSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search">
      <input
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitSearch();
          }
        }}
      />
      <button onClick={submitSearch}>Search</button>
    </div>
  );
}