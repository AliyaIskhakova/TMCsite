import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import InputMask from 'react-input-mask'; // Импорт библиотеки для маски ввода
import '../styles/HeroSection.css'; // Импорт стилей из папки styles
import '../styles/ServicesSection.css';
import '../styles/ContactSection.css'; // Импорт стилей

import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [showModal, setShowModal] = useState(false); // Состояние для управления модальным окном
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });

    // Функция для открытия модального окна
    const handleShowModal = () => setShowModal(true);

    // Функция для закрытия модального окна и очистки формы
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ firstName: '', lastName: '', phone: '' }); // Очистка формы
    };

    // Функция для обработки изменений в форме
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Функция для отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Форма отправлена:', formData); // Вывод данных в консоль (можно заменить на отправку на сервер)
        handleCloseModal(); // Закрываем модальное окно и очищаем форму
    };

    return (
        <div className="hero-section">
            <Container className="hero-content">
                <h1>Сервисный центр «ТехноМедиаСоюз»</h1>
                <p>
                    Сервисный центр «Техномедиасоюз» осуществляет ремонт, обслуживание компьютеров и оргтехники, заправку и восстановление картриджей.
                </p>
                <Button variant="primary" size="lg" onClick={handleShowModal}>
                    Оставить заявку
                </Button>

                {/* Модальное окно с центрированием */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставить заявку</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formFirstName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formPhone">
                                <Form.Label>Телефон</Form.Label>
                                <InputMask
                                    mask="+7 (999) 999-99-99" // Маска для телефона
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                >
                                    {(inputProps) => (
                                        <Form.Control
                                            {...inputProps}
                                            type="tel"
                                            name="phone"
                                            required
                                        />
                                    )}
                                </InputMask>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3">
                                Отправить заявку
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};
const InfoSection=()=>{
    return(
        /*<Container className="my-5 content-center"> {/* Добавлены отступы по краям }
     
        <p align="center" style={{ fontSize: "17px", fontPalette: "dark", maxWidth: "900px"}}>
                        В настоящее время оргтехнику можно встретить на любом предприятии, в офисе и квартире: будь то персональные компьютеры или же сложные МФУ. Такими устройствами может пользоваться практически любой человек. Однако даже самая качественная техника способна принести своему владельцу массу неудобств, если в случае поломки оборудования придется тратить свое драгоценное время из-за неоперативной работы сервисного центра по ремонту оргтехники, отсутствия необходимых запчастей или расходных материалов.
                                            Клиент получает удовольствие при пользовании оргтехникой только в случае ее бесперебойной работы. Именно “ТехноМедиаСоюз” предлагает своим клиентам сервис оргтехники (принтеры, МФУ, копиры, факсы и т.п.), позволяющий пользователям не думать о проблемах с ремонтом оборудования.
                    </p>
                    </Container>
                    */
                    <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
      <p style={{ textAlign: 'center', fontSize: '17px', width: "75%"}}>
        Сервисный центр «ТехноМедиаСоюз» — это команда профессионалов, которая уже много лет успешно решает задачи по ремонту и обслуживанию компьютеров, ноутбуков, принтеров и другой оргтехники в Арске и Атне. Мы гордимся тем, что предлагаем своим клиентам не только качественные услуги, но и индивидуальный подход к каждому запросу.
        <br></br>
        Наши специалисты имеют большой опыт работы с техникой различных брендов и моделей. Мы используем современное оборудование и оригинальные комплектующие, чтобы обеспечить долгую и бесперебойную работу ваших устройств.
        <br></br>
        Обращаясь в «ТехноМедиаСоюз», вы можете быть уверены в качестве наших услуг — мы предоставляем гарантию на все виды работ!
        <br></br><br></br>
    Мы предлагаем широкий спектр услуг для частных и корпоративных клиентов. Наши специалисты готовы помочь вам с решением любых задач, связанных с техникой и программным обеспечением</p>



    </div>
                                    
                   
    );
}
const ServicesSection = () => {
    return (
      <Container className="my-5 text-center"> {/* Добавлены отступы по краям */}
 
            <h2 style={{fontSize:"2.5rem"}}>Наши услуги</h2>
       
            <Row className="mt-3 justify-content-center">
                <Col md={4} className="my-3"> {/* Отступы между карточками */}
                    <Card className="service-card">
                        <Card.Img variant="top" src="src\images\f1.png" alt="Ремонт принтеров" />
                        <Card.Body>
                            <Card.Title>Ремонт принтеров</Card.Title>
                            <Card.Text>
                                Мы предлагаем профессиональный ремонт принтеров любой сложности.
                            </Card.Text>
                            <Link to="/repair" >
                                Подробнее
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="my-3"> {/* Отступы между карточками */}
                    <Card className="service-card">
                        <Card.Img variant="top" src="src\images\f1.png" alt="Ремонт компьютеров" />
                        <Card.Body>
                            <Card.Title>Ремонт компьютеров</Card.Title>
                            <Card.Text>
                                Быстрый и качественный ремонт компьютеров и ноутбуков.
                            </Card.Text>
                            <Link to="/computers" >
                                Подробнее
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="my-3"> {/* Отступы между карточками */}
                    <Card className="service-card">
                        <Card.Img variant="top" src="src\images\f2.png" alt="Заправка картриджей" />
                        <Card.Body>
                            <Card.Title>Заправка картриджей</Card.Title>
                            <Card.Text>
                                Заправка и восстановление картриджей для принтеров и МФУ.
                            </Card.Text>
                            <Link to="/refilling" >
                                Подробнее
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
const MapComponent = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center', // Выравнивание по горизонтали
        alignItems: 'center', // Выравнивание по вертикали
        width: '100%', // Ширина на весь экран
      }}>
        <div style={{
          position: 'relative', 
          justifyContent: 'center', // Выравнивание по горизонтали
        alignItems: 'center',
          overflow: 'hidden', 
          width: '90%', // Ширина 90% от родительского контейнера
          maxWidth: '1000px', // Максимальная ширина
          aspectRatio: '16 / 7', // Соотношение сторон (16:9)
        }}>
          <a
            href="https://yandex.ru/maps/100514/arsk/?utm_medium=mapframe&utm_source=maps"
            style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}
          >
            Арск
          </a>
          <a
            href="https://yandex.ru/maps/100514/arsk/house/sovetskaya_ploshchad_22/YEAYfgBoTUQAQFtsfXx4cHxjZA==/inside/?ll=49.878532%2C56.091005&tab=inside&utm_medium=mapframe&utm_source=maps&z=20.29"
            style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}
          >
            Советская площадь, 22 — Яндекс Карты
          </a>
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=49.878532%2C56.091005&mode=whatshere&tab=inside&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=49.878353%2C56.091003&whatshere%5Bzoom%5D=17&z=20.29"
            width="100%" // Ширина 100% от родительского контейнера
            height="100%" // Высота 100% от родительского контейнера
            frameBorder="1"
            allowFullScreen={true}
            style={{ position: 'relative' }}
            title="Yandex Map"
          ></iframe>
        </div>
      </div>
    );
  };

  import '../styles/ExperienceSection.css';
const ExperienceSection = () => {
    return (
        
        <div className="experience-section">
            <Container>
                
            <h2 className="h22 text-center mb-5">Почему выбирают нас?</h2>

            <Row className="text-center">
                {/* Блок 1: Соблюдаем качество */}
                <Col md={4} className="mb-4">
                    <div className="icon-container">
                        <img src="src\images\k1.png" alt="Опыт работы" className="icon-image" />
                    </div>
                    <h3 className="h33 mt-3">Опыт работы</h3>
                    <p className='pp'>
                        Более 10 лет успешной работы на рынке ремонта и обслуживания оргтехники.
                    </p>
                </Col>

                <Col md={4} className="mb-4">
                    <div className="icon-container">
                        <img src="src\images\k1.png" alt="Качество" className="icon-image" />
                    </div>
                    <h3 className="h33 mt-3">Соблюдаем качество</h3>
                    <p className='pp'>
                        Мы гарантируем высокое качество выполнения всех работ, используя только проверенные технологии и материалы.
                    </p>
                </Col>

                {/* Блок 2: Даем гарантию */}
                <Col md={4} className="mb-4">
                    <div className="icon-container">
                        <img src="src\images\k1.png" alt="Гарантия" className="icon-image" />
                    </div>
                    <h3 className="h33 mt-3">Даем гарантию</h3>
                    <p className='pp'>
                        На все услуги предоставляем гарантию, чтобы вы могли быть уверены в надежности нашего сервиса.
                    </p>
                </Col>

                {/* Блок 3: Опыт работы */}
                
            </Row>
            </Container>
        </div>
    );
};
const ReviewsComponent = () => {
    
        /*<div style={{
            position: 'relative', 
            overflow: 'hidden', 
            width: '100%'
          }}>
                   <Container><h2>Отзывы</h2></Container>   


            <iframe
              src="https://swdgts.ru/818fb198d62be30b0c919621579a47f8"
              width="100%" // Ширина 100% от родительского контейнера
              
              frameborder="1"
              allowFullScreen={true}
              style={{ position: 'relative' }}
            ></iframe>
        
      </div>*/
      useEffect(() => {
        // Проверяем, был ли скрипт уже добавлен
        if (!document.querySelector('script[src="https://res.smartwidgets.ru/app.js"]')) {
          // Создаем элемент <script>
          const script = document.createElement('script');
          script.src = 'https://res.smartwidgets.ru/app.js';
          script.defer = true;
    
          // Добавляем скрипт в <head>
          document.head.appendChild(script);
        }
    
        // Создаем контейнер для виджета
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'sw-app';
        widgetContainer.setAttribute('data-app', '818fb198d62be30b0c919621579a47f8');
    
        // Добавляем контейнер в DOM
        const container = document.getElementById('smart-widget-container');
        if (container) {
          container.appendChild(widgetContainer);
        }
    
        // Очистка при размонтировании компонента
        return () => {
          if (container && widgetContainer.parentNode === container) {
            container.removeChild(widgetContainer);
          }
        };
      }, []);
    
      return (
        <Container className='mt-5 text-center justify-content-center'>

                        <h2 style={{fontSize:"2.5rem", marginBottom: "1rem"}}>Что говорят клиенты</h2>

                    <p  style={{ textAlign: 'center', fontSize: '18px', marginBottom: "1rem"}}>
                    Мы всегда рады услышать ваше мнение о нашей работе. Ваши отзывы помогают нам становиться лучше. Вот что говорят наши клиенты:
                    А если вы уже пользовались нашими услугами, оставьте свой отзыв — нам важно знать, что мы движемся в правильном направлении!
                                            </p>

                  <div id="smart-widget-container" style={{marginLeft: "5rem auto", marginRight: "5rem auto", marginBottom:"2rem"}}></div>

        </Container>
    );
  };

  const ContactsSection = () => {
    return (
        <div className="contacts-section text-center py-3">
           
        <Container className='my-3'>
            <h2 className='mb-2' style={{fontSize:"2.5rem"}}>Наши контакты</h2> 

            <Row className='justify-content-center'>
                {/* Колонка 1: Телефон и почта */}
                <Col md={3} className="mb-4">
                    <h3>Телефон и почта</h3>
                    <p>
                        <strong>Телефон:</strong> +7 (123) 456-78-90
                    </p>
                    <p>
                        <strong>Почта:</strong> info@technomediasouz.ru
                    </p>
                </Col>

                {/* Колонка 2: Режим работы */}
                <Col md={3} className="mb-4">
                    <h3 >Режим работы</h3>
                    <p>
                        <strong>Пн-Пт:</strong> 9:00 - 17:00
                    </p>
                    <p>
                        <strong>Сб-Вс:</strong> Выходной
                    </p>
                </Col>
                {/* Колонка 3: Адрес */}
                <Col md={3} className="mb-4">
                    <h3>Адрес</h3>
                    <p>
                        г. Арск, Советская пл., 22.
                    </p>
                    <p>
                        Здание Типографии, 2 этаж, 4 офис
                    </p>
                </Col>
                
            </Row>
            <MapComponent/>
        </Container>
         
        </div>
    );
};
const MainPage = () => {
    return (
        <div>
            <HeroSection />
            <InfoSection/>
            <ServicesSection />
            <ExperienceSection/>
            
            <ReviewsComponent/>
            <ContactsSection/>
        </div>
    );
};

export default MainPage;