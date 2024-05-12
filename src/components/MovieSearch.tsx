
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Card, Grid, Form, Label } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";


function MovieSearchResults() {
  const [query, setQuery] = useState("");
  const nav = useNavigate();

  const [data, setData] = useState([]);

  const params = useParams();
  console.log(params)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&query=${params.query}&page=1&include_adult=false`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setData(data.results);
      return data.results;
    } catch (error) {
      console.error("Error searching:", error);
      return [];
    }
  };

 useEffect(() => {
     fetchData()
 },[query])

console.log(data)
  return (
    <Grid
      columns={3}
      stackable
      centered
      verticalAlign="top"
      padded="vertically"
    >
      {data.map((displayData: any) => (
        <Grid.Column key={displayData.id}>
          <Card.Group>
           
              <Card
                style={{ transition: "ease-in 0.2s"  }}
                fluid
                image={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                
                meta={`Release Date: ${displayData.release_date} | Rating: ${displayData.vote_average}`}
                description={`${displayData.overview.slice(0, 150)}...`}
              />

              
            <Form style={{ marginTop: "20px" , marginLeft: "25%" }}>
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
}

export default MovieSearchResults;

