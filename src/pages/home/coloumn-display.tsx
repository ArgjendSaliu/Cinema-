import { DisplayType } from "./displayTypes";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { rateMovie, rateTvShow } from "./mutation";
import { Card, Grid, Form, Label } from "semantic-ui-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
  rating?: number;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  isRated?: boolean;
}

export const ColumnDisplay = (props: Props) => {
  const { data, displayType, isRated } = props;
  const [rating, setRating] = useState<number>(0);

  const onSuccess = () => {
    toast.success("Rating successful");
  };
  const onError = () => {
    toast.error("Rating failed");
  };
  const { mutate: rateMovieMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateMovie(id, rating),
    onSuccess: onSuccess,
    onError: onError,
  });

  const { mutate: rateTvShowMutation } = useMutation({
    mutationKey: ["rateMovie"],
    mutationFn: (id: number) => rateTvShow(id, rating),
    onSuccess: onSuccess,
    onError: onError,
  });

  const rate =
    displayType === DisplayType.Movies ? rateMovieMutation : rateTvShowMutation;

  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: DisplayData) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
            <Link
              to={`/${
                displayType === DisplayType.Movies ? "movie" : "tvshow"
              }/${displayData.id}`}
            >
              <Card
                style={{ "max-height": "800px", }}
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                header={
                  displayType === DisplayType.Movies
                    ? displayData.title
                    : displayData.name
                }
                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                description={`${displayData.overview.slice(0, 150)}...`}
              />

              {isRated && (
                <Label color="green">Your Rating : {displayData.rating}</Label>
              )}
            </Link>
            <Form style={{ marginTop: "20px", marginLeft: "25%" }}>
              <Form.Group inline>
                <Form.Field>
                  <Form.Input
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    onChange={(e) => setRating(Number(e.target.value))}
                    action={{
                      color: "violet",
                      labelPosition: "left",
                      icon: "star",
                      content: "Rate",
                      onClick: () => rate(displayData.id),
                    }}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Group>
        </Grid.Column>
      ))}
    </Grid>
  );
};
