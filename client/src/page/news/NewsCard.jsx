import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({ news }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`news-item ${expanded ? "expanded" : ""}`}>
      <h2>{news.title}</h2>
      {news.image && <img src={news.image} alt={news.title} />}
      <p className="news-text">{news.text}</p>
      <p>
        <strong>Дата публикации:</strong>{" "}
        {new Date(news.publish_date).toLocaleDateString()}
      </p>
      <p>Оригинал статьи</p>
      <a href={news.url}>{news.url}</a>
      <button onClick={toggleExpand}>
        {expanded ? "Свернуть" : "Подробнее"}
      </button>
    </div>
  );
}

export default NewsCard;
