import React, { useState } from "react";
import Loader from "../../ui/Loader";
import NewsCard from "./NewsCard";
import axios from "axios";
function News() {
  const [news, setNews] = useState([]);
  const [positiveInput, setPositiveInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputErrors, setInputErrors] = useState({});

  const validateInputs = () => {
    const errors = {};
    if (!positiveInput.trim()) {
      errors.positiveInput = "Любимые темы не могут быть пустыми";
    }
    if (negativeInput.trim() && !positiveInput.trim()) {
      errors.negativeInput =
        "Нелюбимые темы могут быть заполнены только после заполнения любимых тем";
    }
    if (negativeInput.trim() && negativeInput.trim().length < 3) {
      errors.negativeInput =
        "Нелюбимые темы должны содержать минимум 3 символа";
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
              "api-key": "69ca0d740e78487b8fa7651621bb2907",
              "source-countries": language,
              language: language,
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
    <div className="News">
      <h1>News Search</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPositiveInput("");
          setNegativeInput("");
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
          {inputErrors.positiveInput && (
            <p className="error">{inputErrors.positiveInput}</p>
          )}
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
          {inputErrors.negativeInput && (
            <p className="error">{inputErrors.negativeInput}</p>
          )}
        </div>
        <select name="" id="">
          <option value="" onChange={() => setLanguage("ru")}>
            RU
          </option>
          <option value="" onChange={() => setLanguage("en")}>
            EN
          </option>
        </select>
        <button className="search-button" type="submit">
          Поиск новостей
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      <div className="news-container">
        {news.map((news) => (
          <NewsCard key={news.id} news={news}></NewsCard>
        ))}
      </div>
    </div>
  );
}

export default News;
