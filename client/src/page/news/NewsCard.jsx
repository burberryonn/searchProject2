import React from "react";
function NewsCard({ news }) {
  return (
    <div className="news-item">
      <h2>{news.title}</h2>
      {news.image && <img src={news.image} alt={news.title} />}
      <p>{news.text}</p>
      <p>
        <strong>Дата публикации:</strong>{" "}
        {new Date(news.publish_date).toLocaleDateString()}
      </p>
      <p>Оригинал статьи</p>
      <a href={news.url}>{news.url}</a>
    </div>
  );
}

export default NewsCard;
