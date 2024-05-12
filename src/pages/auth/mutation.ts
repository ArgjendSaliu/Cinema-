
export const mutationLogin = async () => {
  try {
      const res = await fetch(
          "https://api.themoviedb.org/3/authentication/guest_session/new",
          {
              headers: {
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWFjYWRjN2ZlYjA2ZDUyNjJjZjg3YTc0MGMzMDM2MiIsInN1YiI6IjY2MzYyZmViYzM5MjY2MDEyNjZlZDhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ei16cFUCwPHSBxgOEOQvk3qHvrPBatQ2dSB0XjFOb5Y',
              }
          }
      );

      if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log(data);

      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
};
