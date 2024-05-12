import { useState } from "react";
import { Button } from "semantic-ui-react";
import { ColumnDisplay } from "./coloumn-display";

import { fetchMovies, fetchTvShows } from "./query";
import { useQuery } from "@tanstack/react-query";
import { DisplayType } from "./displayTypes";
import { Navigate } from "react-router-dom";

// export enum DisplayType {
//     Movies = "Movies",
//     TvShows = "TvShows",
//   }

export const Home = () => {
  const [displayType, setDisplayType] = useState<DisplayType>(
    DisplayType.Movies
  );

  const { data: movieData , isLoading: isLoadingMovies} = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: tvShowData , isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvShows"],
    queryFn: fetchTvShows,
  });

  if (localStorage.getItem("guest_sesion_id") === null) {
    return <Navigate to="/auth" />
  }


  return (
    <div style={{ marginTop: "50px", height: "auto" }}>
      {""}
      <Button.Group>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.Movies)}
        >
          Movies
        </Button>

        <Button
          color={displayType === DisplayType.TvShows ? "blue" : undefined}
          onClick={() => setDisplayType(DisplayType.TvShows)}
        >
          Tv Shows
        </Button>
      </Button.Group>

      {isLoadingMovies || isLoadingTvShows ? (
        <div>Loading...</div>
      ) : (

      <div style={{ marginTop: 20 }}>
        {displayType === DisplayType.Movies ? (
          <ColumnDisplay data={movieData.results} displayType={DisplayType.Movies} />
        ) : (
          <ColumnDisplay data={tvShowData.results} displayType={DisplayType.TvShows} />
        )}
      </div>
      )}
    </div>
  );
};
