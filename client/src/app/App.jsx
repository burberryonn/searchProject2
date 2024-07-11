import { useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";
import Registration from "../registration/Registration";

function App() {
  const [news, setNews] = useState([]);
  const [positiveInput, setPositiveInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    if (!positiveInput.trim()) {
      errors.positiveInput = 'Любимые темы не могут быть пустыми';
    }
    if (negativeInput.trim() && !positiveInput.trim()) {
      errors.negativeInput = 'Нелюбимые темы могут быть заполнены только после заполнения любимых тем';
    }
    if (negativeInput.trim() && negativeInput.trim().length < 3) {
      errors.negativeInput = 'Нелюбимые темы должны содержать минимум 3 символа';
    }
    return errors;
  };

  const allNews = async () => {
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    setLoading(true);
    setError(null);
    setInputErrors({});

    try {
      let query = positiveInput;
      if (positiveInput.trim() !== "") {
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
      }
    } catch (error) {
      setError("Ошибка сервера, новостей по данному запросу не найдено");
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
          {inputErrors.positiveInput && <p className="error">{inputErrors.positiveInput}</p>}
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
          {inputErrors.negativeInput && <p className="error">{inputErrors.negativeInput}</p>}
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
      <Registration></Registration>
    </div>
  );
}

export default App;
