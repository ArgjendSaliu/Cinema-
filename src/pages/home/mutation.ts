
export const rateMovie = async (movieID: number, rating: number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/rating?guest_session_id=${localStorage.getItem(
        "guest_sesion_id"
      )}&api_key=${import.meta.env.VITE_API_KEY}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: rating }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to rate movie: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error rating movie:', error);
    return null;
  }
};

export const rateTvShow = async (tvShowID: number, rating: number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${tvShowID}/rating?guest_session_id=${localStorage.getItem(
        "guest_sesion_id"
      )}&api_key=${import.meta.env.VITE_API_KEY}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ value: rating }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to rate TV show: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error rating TV show:', error);
    return null;
  }
};

