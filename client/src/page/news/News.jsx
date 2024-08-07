import React, { useState } from "react";
import Loader from "../../ui/Loader";
import NewsCard from "./NewsCard";
import axios from "axios";
import { useUser } from "../../context/userContext";
import "./News.css"; // Импорт CSS файла

function News() {
  const [news, setNews] = useState([]);
  const [positiveInput, setPositiveInput] = useState("");
  const [negativeInput, setNegativeInput] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const { user } = useUser();

  const sendTitle = async () => {
    const request = await axios.post("/api/requestHistory", {
      userId: user.id,
      goodRequest: positiveInput,
      badRequest: negativeInput,
    });
  };

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
      errors.negativeInput = "Нелюбимые темы должны содержать минимум 3 символа";
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

        const { data } = await axios.get(`https://api.worldnewsapi.com/search-news`, {
          params: {
            "api-key": "69ca0d740e78487b8fa7651621bb2907",
            "source-countries": language,
            language: language,
            text: query,
          },
        });

        setNews(data.news);
      }
    } catch (error) {
      setError("Ошибка сервера, новостей по данному запросу не найдено");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="news">
      <h1>Поиск новостей</h1>
      <form
        className="news-form"
        onSubmit={(e) => {
          e.preventDefault();
          setPositiveInput("");
          setNegativeInput("");
          allNews();
          sendTitle();
        }}
      >
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="language">Выберите язык:</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
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
