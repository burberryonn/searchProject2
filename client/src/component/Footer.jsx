import React from 'react';
import '../app/App.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>О нас</h2>
          <p>Мы предоставляем свежие новости и актуальные события со всего мира.</p>
        </div>
        <div className="footer-section links">
          <h2>Полезные ссылки</h2>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="#about">О нас</a></li>
            <li><a href="#services">Сервисы</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Контакты</h2>
          <p>Email: info@example.com</p>
          <p>Телефон: +123 456 789</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Все права защищены.
      </div>
    </footer>
  );
}

export default Footer;
