import { useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";

function App() {
  const [news, setNews] = useState([]);
  const [positiveInput, setPositiveInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const allNews = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = positiveInput;

      if (negativeInput.trim() !== "") {
        query += `-${negativeInput}`;
      }

      const { data } = await axios.get(
        `https://api.worldnewsapi.com/search-news`,
        {
          params: {
            "api-key": "3e47991767c74356bfb0fa27354f8e94",
            "source-countries": "ru",
            language: "ru",
            text: query,
          },
        }
      );

      setNews(data.news);
    } catch (error) {
      setError("Failed to fetch news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>News Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          allNews();
        }}
      >
        <div>
          <label htmlFor="positive">Любимые темы новостей:</label>
          <input
            type="text"
            id="positive"
            value={positiveInput}
            onChange={(e) => setPositiveInput(e.target.value)}
            placeholder="Введите ключевые слова"
          />
        </div>
        <div>
          <label htmlFor="negative">Нелюбимые темы новостей:</label>
          <input
            type="text"
            id="negative"
            value={negativeInput}
            onChange={(e) => setNegativeInput(e.target.value)}
            placeholder="Введите ключевые слова"
          />
        </div>
        <button type="submit">Поиск новостей</button>
      </form>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      <div className="news-container">
        {news.map((el) => (
          <div key={el.id} className="news-item">
            <h2>{el.title}</h2>
            {el.image && <img src={el.image} alt={el.title} />}
            <p>{el.text}</p>
            <p>
              <strong>Дата публикации:</strong>{" "}
              {new Date(el.publish_date).toLocaleDateString()}
            </p>
            <p>Оригинал статьи</p>
            <a href={el.url}>{el.url}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
