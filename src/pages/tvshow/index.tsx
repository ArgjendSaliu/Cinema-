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
import { fetchTvShowDetails } from "./query"; 

export const TvShow = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Not Found</div>;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["tvShow"],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <Loader active />;
  }

  if (!data) {
    return <div>Data not found</div>;
  }

  const { name, poster_path, adult, budget, genres, imdb_id, popularity, production_companies, release_date, revenue, runtime, vote_average, original_language, overview } = data;

  return (
    <div style={{ marginTop: "50px", height: "auto" }}>
      <Segment>
        <Header>{name}</Header>
        <Grid columns={2} divided textAlign="left" style={{ marginTop: "20px" }}>
          <Grid.Row>
            <Grid.Column>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Image src={`https://image.tmdb.org/t/p/original/${poster_path}`} size="medium" centered />
              </div>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header>Is the Show for adults:</List.Header>
                  {adult ? "Yes" : "No"}
                </List.Item>
                <List.Item>
                  <List.Header>Budget:</List.Header>
                  {budget}
                </List.Item>
                <List.Item>
                  <List.Header>Genres:</List.Header>
                  {genres.map((genre: any) => (
                    <List.Item key={genre.id}>{genre.name}</List.Item>
                  ))}
                </List.Item>
                <List.Item>
                  <List.Header>IMDB ID:</List.Header>
                  {imdb_id}
                </List.Item>
                <List.Item>
                  <List.Header>Popularity:</List.Header>
                  {popularity}
                </List.Item>
                <List.Item>
                  <List.Header>Production Companies:</List.Header>
                  {production_companies.map((company: any) => company.name).join(", ")}
                </List.Item>
                <List.Item>
                  <List.Header>Release Date:</List.Header>
                  {release_date}
                </List.Item>
                <List.Item>
                  <List.Header>Revenue:</List.Header>
                  {revenue}
                </List.Item>
                <List.Item>
                  <List.Header>Runtime:</List.Header>
                  {runtime}
                </List.Item>
                <List.Item>
                  <List.Header>Vote Average:</List.Header>
                  {vote_average}
                </List.Item>
                <List.Item>
                  <List.Header>Original Language:</List.Header>
                  {original_language}
                </List.Item>
                <List.Item>
                  <List.Header>Show Overview:</List.Header>
                  {overview}
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
};
