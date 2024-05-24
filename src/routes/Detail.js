import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [details, setDetail] = useState({});
  const [genre, setGenre] = useState([]);

  const getDetail = async () => {
    const json = await (await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
    setDetail(json.data.movie);
    setGenre(json.data.movie.genres || []);
    setLoading(false); // 데이터 로딩
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail_container">
      <h3 className="detail_title">
        {details.title}({details.year})
      </h3>
      <div className="detail_middle">
        <img src={details.medium_cover_image} alt={details.title} title={details.title} />
        <div className="detail_middle_rr">
          <h2 className="detail_rating">평점: {details.rating}</h2>
          <h2 className="detail_runtime">런타임: {details.runtime}분</h2>
          <ul className="details_genres">
            {genre.map((g, index) => (
              <li key={index}>{g}</li>
            ))}
          </ul>
          <p>{details.description_full}</p>
        </div>
      </div>
      {details.yt_trailer_code && (
        <iframe
          className="detail_yt"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${details.yt_trailer_code}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default Detail;
