// components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Для навигации
import '../styles/Footer.css'; // Импорт стилей

const Footer = () => {
    return (
        <footer className="footer text-center">
            <Container>
                <Row>
                <Col md={4} className="mb-4">
                        <h3>ТехноМедиаСоюз</h3>
                        <p>
                            Сервисный центр «ТехноМедиаСоюз» — профессиональный ремонт и обслуживание оргтехники.
                        </p>
                        <p className="copyright">
                            &copy; {new Date().getFullYear()} ТехноМедиаСоюз. Все права защищены.
                        </p>
                    </Col>
                    
                    <Col md={4} className="mb-4">
                        <h3>Ссылки</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/">Главная</Link>
                            </li>
                            <li>
                                <Link to="/repair">Ремонт принтеров</Link>
                            </li>
                            <li>
                                <Link to="/repaircomputer">Ремонт компьютеров</Link>
                            </li>
                            <li>
                                <Link to="/refilling">Заправка картриджей</Link>
                            </li>
                        </ul>
                    </Col>

                    <Col md={4} className="mb-4">
                        <h3>Контакты</h3>
                        <p>
                            <strong>Телефон:</strong> +7 (937) 527-92-49
                        </p>
                        <p>
                            <strong>Почта:</strong> servicetmsouz@mail.ru
                        </p>
                        <p>
                            <strong>Адрес:</strong> г. Арск, Советская площадь 22.
                        </p>
                        <div className="social-links">
                            <a href="https://t.me/RemontTMS" target="_blank" rel="noopener noreferrer">
                                <img src="src\images\telegramm.png" alt="Telegram" className="social-icon" />
                            </a>
                            <a href="https://wa.me/79375279249" target="_blank" rel="noopener noreferrer">
                                <img src="src\images\whatsapp.png" alt="WhatsApp" className="social-icon" />
                            </a>
                            <a href="https://vk.com/tmsouz" target="_blank" rel="noopener noreferrer">
                                <img src="src\images\vk.png" alt="ВКонтакте" className="social-icon" />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;