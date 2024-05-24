import { useEffect, useState, useRef, useCallback } from "react";
import Movie from "../components/Movie";
import "./home.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const getMovies = async (page) => {
    setLoading(true);
    const json = await (
      await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year&limit=20&page=${page}`)
    ).json();
    const newMovies = json.data.movies;
    if (newMovies.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  // 영화 요소를 감시
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <section className="container">
      <div className="movies">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <Movie
                id={movie.id}
                medium_cover_image={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
                ref={lastMovieElementRef}
              />
            );
          } else {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                medium_cover_image={movie.medium_cover_image}
                title={movie.title}
                summary={movie.summary}
                genres={movie.genres}
              />
            );
          }
        })}
      </div>
      {loading && (
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      )}
    </section>
  );
}

export default Home;
