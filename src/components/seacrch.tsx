import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "semantic-ui-react";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error searching:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    nav(`/search/${encodeURIComponent(query)}`);
  };

  return (
    <Search
      style={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onSearchChange={(event, { value }) => setQuery(value)}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handleSearch();
        }
      }}
      value={query}
      showNoResults={false}
      placeholder="Search for movies"
      icon="search"
      fluid
    />
  );
}

export default MovieSearch;
