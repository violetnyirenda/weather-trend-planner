import { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";

export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const submitSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search">
      <label htmlFor="city-input" className="search-label">Find City Forecast</label>
      <Input
        id="city-input"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitSearch();
          }
        }}
      />
      <Button onClick={submitSearch}>Get Trend</Button>
    </div>
  );
}