import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import InputMask from 'react-input-mask'; // Импорт библиотеки для маски ввода
import '../styles/HeroSection.css'; // Импорт стилей из папки styles
import '../styles/ServicesSection.css';
import '../styles/ContactSection.css'; // Импорт стилей
import { AddRequest } from '../api/requests';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [showModal, setShowModal] = useState(false); // Состояние для управления модальным окном
    const [formData, setFormData] = useState({
        fio: '',
        telephone: '',
        reason: '',
    });

    // Функция для открытия модального окна
    const handleShowModal = () => setShowModal(true);

    // Функция для закрытия модального окна и очистки формы
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ fio: '', telephone: '', reason: '' }); // Очистка формы
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            AddRequest(formData);
            console.log('Форма отправлена:', formData);
            handleCloseModal();
        } catch (error) {
            console.error('Ошибка при отправке формы:', error);
        }
    }

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
                            <Form.Group controlId="formsurname">
                                <Form.Label>ФИО</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fio"
                                    value={formData.fio}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>


                            <Form.Group controlId="formtelephone">
                                <Form.Label>Телефон</Form.Label>
                                <InputMask
                                    mask="+7(999)999-99-99" // Маска для телефона
                                    name="telephone"

                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                >
                                    {(inputProps) => (
                                        <Form.Control
                                            {...inputProps}
                                            type="tel"
                                            required
                                        />
                                    )}
                                </InputMask>
                            </Form.Group>
                            <Form.Group controlId="formsurname">
                                <Form.Label>Ваш вопрос</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    required
                                />
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
                    <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>
      <p style={{ fontSize: '17px', width: "70%"}}>
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
      <Container className="mt-3 mb-5 text-center"> {/* Добавлены отступы по краям */}
 
            <h2 style={{fontSize:"2.5rem"}}>Наши услуги</h2>
       
            <Row className="mt-3 justify-content-center">
                <Col md={4} className="my-3"> {/* Отступы между карточками */}
                    <Card className="service-card">
                        <Card.Img variant="top" src="src\images\f1.png" alt="Ремонт принтеров" />
                        <Card.Body>
                            <Card.Title>Ремонт оргтехники</Card.Title>
                            <Card.Text>
                                Мы предлагаем профессиональный ремонт оргтехники любой сложности.
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
        <Container className='mt-5 justify-content-center'>

                        <h2 className='text-center' style={{fontSize:"2.5rem", marginBottom: "1rem"}}>Что говорят клиенты</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column"}}>

                    <p style={{ fontSize: '18px', marginBottom: "1rem", width: '80%'}}>
                    Мы всегда рады услышать ваше мнение о нашей работе. Ваши отзывы помогают нам становиться лучше.                     А если вы уже пользовались нашими услугами, оставьте свой отзыв — нам важно знать, что мы движемся в правильном направлении!
                                            </p>
</div>
                  <div id="smart-widget-container" className='text-center' style={{marginLeft: "5rem auto", marginRight: "5rem auto", marginBottom:"2rem"}}></div>

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