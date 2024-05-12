import { Container, Menu, Segment, Header } from "semantic-ui-react";
import { useState } from "react";
import { DisplayType } from "../home/displayTypes";
import { useQuery } from "@tanstack/react-query";
import { fetchRatedMovies, fetchRatedTvShows } from "./query";
import { ColumnDisplay } from "../home/coloumn-display";
import { Navigate } from "react-router-dom";

export const Rated = () => {
  const [activeTabs, setActiveTabs] = useState<DisplayType>(DisplayType.Movies);

  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ["ratedMovies"],
    queryFn: fetchRatedMovies,
  });

  const { data: ratedTvShows, isLoading: isLoadingRatedTvShows } = useQuery({
    queryKey: ["ratedTvShows"],
    queryFn: fetchRatedTvShows,
  });

  if (localStorage.getItem("guest_sesion_id") === null) {
    return <Navigate to="/auth" />
  }

  return (
    <Container style={{ marginTop: "50px" }}>
      <Menu pointing secondary>
        <Menu.Item
          name="Movies"
          active={activeTabs === DisplayType.Movies}
          onClick={() => setActiveTabs(DisplayType.Movies)}
        />
        <Menu.Item
          name="TvShows"
          active={activeTabs === DisplayType.TvShows}
          onClick={() => setActiveTabs(DisplayType.TvShows)}
        />
      </Menu>

      <Segment>
        {activeTabs === DisplayType.Movies && (
          <div>
            <Header as="h2">Rated Movies</Header>
            {isLoadingRatedMovies ? (
              <p>Loading...</p>
            ) : (
              <ColumnDisplay
                data={ratedMovies?.results || []}
                displayType={DisplayType.Movies}
                isRated
              />
            )}
          </div>
        )}
        {activeTabs === DisplayType.TvShows && (
          <div>
            <Header as="h2">Rated TvShows</Header>
            {isLoadingRatedTvShows ? (
              <p>Loading...</p>
            ) : (
              <ColumnDisplay
                data={ratedTvShows?.results || []}
                displayType={DisplayType.TvShows}
                isRated
              />
            )}
          </div>
        )}
      </Segment>
    </Container>
  );
};
