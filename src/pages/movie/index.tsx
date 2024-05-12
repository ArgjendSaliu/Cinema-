import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Grid,
  Header,
  Loader,
  Segment,
  Image,
  List,
} from "semantic-ui-react";
import { fetchMovieDetails } from "./query";

export const Movie = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Not Found</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  if (!data) {
    return <div>Data not found</div>;
  }

  const { title, poster_path } = data;

  return (
    <div style={{ marginTop: "50px", height: "auto" }}>
      <Segment>
        <Header>{title}</Header>
        <Grid
          columns={2}
          divided
          textAlign="left"
          style={{ marginTop: "20px" }}
        >
          <Grid.Row>
            <Grid.Column>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  size="medium"
                  centered
                />
              </div>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header>Is the Movie for adults:</List.Header>
                  {data.adult ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Budget:</List.Header>
                  {data.budget}
                </List.Item>
                <List.Item>
                  <List.Header>Genres:</List.Header>
                  {data.genres.map((genre: any) => (
                    <List.Item key={genre.id}> {genre.name}</List.Item>
                  ))}
                  <List.Item>
                  <List.Header>Imdb ID: </List.Header>
                  {data.imdb_id}
                </List.Item>
                <List.Item>
                  <List.Header>Popularity: </List.Header>
                  {data.popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Production Companies:</List.Header>
                  {data.production_companies
                    .map((company: any) => company.name)
                      .join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>Release date:</List.Header>
                  {data.release_date}
                </List.Item>
                <List.Item>
                  <List.Header>Revenue</List.Header>
                  {data.revenue}
                </List.Item>
                <List.Item>
                  <List.Header>Run time:</List.Header>
                  {data.runtime}
                </List.Item>
                <List.Item>
                  <List.Header>Vote Average:</List.Header>
                  {data.vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Language:</List.Header>
                  {data.original_language}
                </List.Item>
                <List.Item>
                  <List.Header>Movie description:</List.Header>
                  {data.overview}
                </List.Item>
                
                
                
                
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
