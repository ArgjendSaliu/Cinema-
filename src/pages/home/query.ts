
export const fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWFjYWRjN2ZlYjA2ZDUyNjJjZjg3YTc0MGMzMDM2MiIsInN1YiI6IjY2MzYyZmViYzM5MjY2MDEyNjZlZDhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ei16cFUCwPHSBxgOEOQvk3qHvrPBatQ2dSB0XjFOb5Y",
        },
      }
    );
    return res.json();
  };
  
  export const fetchTvShows = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWFjYWRjN2ZlYjA2ZDUyNjJjZjg3YTc0MGMzMDM2MiIsInN1YiI6IjY2MzYyZmViYzM5MjY2MDEyNjZlZDhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ei16cFUCwPHSBxgOEOQvk3qHvrPBatQ2dSB0XjFOb5Y",
        },
      }
    );
    return res.json();
  };
  