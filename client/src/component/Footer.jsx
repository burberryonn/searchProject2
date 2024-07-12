import React from "react";
import "../app/App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>О нас</h2>
          <p>
            Мы предоставляем свежие новости и актуальные события со всего мира.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Полезные ссылки / наши партнеры</h2>
          <ul>
            <li>
              <a href="https://ria.ru">RIA.RU</a>
            </li>
            <li>
              <a
                href="https://lenta.ru

"
              >
                LENTA.RU
              </a>
            </li>
            <li>
              <a href="https://yandex.ru/news">YANDEX.RU</a>
            </li>
            <li>
              <a href="https://www.rbc.ru/short_news">RBC.RU</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Контакты</h2>
          <p>Email: info@example.com</p>
          <p>Телефон: +123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Все права защищены(наверно).
      </div>
    </footer>
  );
}

export default Footer;
