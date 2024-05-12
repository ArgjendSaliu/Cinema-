export const fetchTvShowDetails = async (tvShowId: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
        
        {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMWFjYWRjN2ZlYjA2ZDUyNjJjZjg3YTc0MGMzMDM2MiIsInN1YiI6IjY2MzYyZmViYzM5MjY2MDEyNjZlZDhhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ei16cFUCwPHSBxgOEOQvk3qHvrPBatQ2dSB0XjFOb5Y",
            },
        }
    );

    return res.json();
};