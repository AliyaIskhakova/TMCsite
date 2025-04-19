import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card, InputGroup, Alert } from 'react-bootstrap';
import InputMask from 'react-input-mask'; // Импорт библиотеки для маски ввода

import { AddRequest } from '../api/requests';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';
import { FiUser, FiPhone, FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
      fio: '',
      telephone: '',
      email: '',
      reason: '',
  });
  const [errors, setErrors] = useState({
      fio: '',
      telephone: '',
      email: '',
      reason: ''
  });
  const [notification, setNotification] = useState({
      show: false,
      variant: 'success',
      message: ''
  });

  // Валидация в реальном времени
  useEffect(() => {
      if (formData.fio) validateFio(formData.fio);
      if (formData.reason) validateReason(formData.reason);
  }, [formData.fio, formData.reason]);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
      setShowModal(false);
      setFormData({ fio: '', telephone: '', email: '', reason: '' });
      setErrors({ fio: '', telephone: '', email: '', reason: '' });
  };

  const showNotification = (variant, message) => {
      setNotification({
          show: true,
          variant,
          message
      });
      setTimeout(() => setNotification({ ...notification, show: false }), 5000);
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value,
      });

      if (name === 'email') validateEmail(value);
      if (name === 'telephone') validatePhone(value);
      if (name === 'fio') validateFio(value);
      if (name === 'reason') validateReason(value);
  };

  const validateFio = (fio) => {
      const isValid = fio.trim().split(' ').length >= 2 ;
      setErrors({...errors, fio: isValid ? '' : 'Введите полное ФИО (минимум 2 слова)'});
      return isValid;
  };

  const validateReason = (reason) => {
      const isValid = reason.trim().length >= 1;
      setErrors({...errors, reason: isValid ? '' : 'Сообщение не должно быть пустым'});
      return isValid;
  };

  const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(email)) {
          setErrors({...errors, email: 'Введите корректный email'});
          return false;
      }
      setErrors({...errors, email: ''});
      return true;
  };

  const validatePhone = (phone) => {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 11) {
          setErrors({...errors, telephone: 'Введите корректный номера'});
          return false;
      }
      setErrors({...errors, telephone: ''});
      return true;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Проверка всех полей перед отправкой
      const isFormValid = validateFio(formData.fio) && 
                        validatePhone(formData.telephone) && 
                        validateEmail(formData.email) && 
                        validateReason(formData.reason);
      
      if (!isFormValid) {
          return;
      }

      try {
          await AddRequest(formData);
          console.log('Форма отправлена:', formData);
          showNotification('success', 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
          handleCloseModal();
      } catch (error) {
          console.error('Ошибка при отправке формы:', error);
          showNotification('danger', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз.');
      }
  }

  return (
      <div className="hero-section">
          {/* Центрированное уведомление */}
          {notification.show && (
              <div className="notification-wrapper d-flex justify-content-center">
                  <Alert 
                      variant={notification.variant} 
                      className="text-center"
                      style={{ 
                          position: 'fixed',
                          top: '20px',
                          zIndex: 9999,
                          minWidth: '300px',
                          maxWidth: '80%'
                      }}
                      onClose={() => setNotification({ ...notification, show: false })}
                      dismissible
                  >
                      <div className="d-flex align-items-center justify-content-center">
                          {notification.variant === 'success' ? (
                              <FiCheckCircle className="me-2" size={20} />
                          ) : (
                              <FiAlertCircle className="me-2" size={20} />
                          )}
                          {notification.message}
                      </div>
                  </Alert>
              </div>
          )}

          <Container className="hero-content">
              <h1>Сервисный центр «ТехноМедиаСоюз»</h1>
              <p>
                  Сервисный центр «Техномедиасоюз» осуществляет ремонт, обслуживание компьютеров и оргтехники, заправку и восстановление картриджей.
              </p>
              <Button variant="primary" size="lg" onClick={handleShowModal}>
                  Оставить заявку
              </Button>

              <Modal show={showModal} onHide={handleCloseModal} centered >
                  <Modal.Header closeButton className="border-0 pb-0">
                      <Modal.Title className="fw-bold w-100">Оставить заявку</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <Form onSubmit={handleSubmit}>
                          {/* Поле ФИО */}
                          <Form.Group className="mb-3">
                              <Form.Label className="form-label-custom d-block mb-2">
                                  Ваше ФИО
                              </Form.Label>
                              <InputGroup>
                                  <InputGroup.Text className="bg-white">
                                      <FiUser className="text-muted" />
                                  </InputGroup.Text>
                                  <Form.Control
                                      type="text"
                                      name="fio"
                                      placeholder="Иванов Иван Иванович"
                                      value={formData.fio}
                                      onChange={handleInputChange}
                                      isInvalid={!!errors.fio}
                                  />
                                  <Form.Control.Feedback type="invalid" className="d-block">
                                      {errors.fio}
                                  </Form.Control.Feedback>
                              </InputGroup>
                          </Form.Group>

                          {/* Поле Телефон */}
                          <Form.Group className="mb-3">
                              <Form.Label className="form-label-custom d-block mb-2">
                                  Телефон
                              </Form.Label>
                              <InputGroup>
                                  <InputGroup.Text className="bg-white">
                                      <FiPhone className="text-muted" />
                                  </InputGroup.Text>
                                  <InputMask
                                      mask="+7(999)999-99-99"
                                      name="telephone"
                                      value={formData.telephone}
                                      onChange={handleInputChange}
                                  >
                                      {(inputProps) => (
                                          <Form.Control
                                              {...inputProps}
                                              type="tel"
                                              placeholder="+7(___)___-__-__"
                                              isInvalid={!!errors.telephone}
                                          />
                                      )}
                                  </InputMask>
                                  <Form.Control.Feedback type="invalid" className=" d-block">
                                      {errors.telephone}
                                  </Form.Control.Feedback>
                              </InputGroup>
                          </Form.Group>

                          {/* Поле Email */}
                          <Form.Group className="mb-3">
                              <Form.Label className="form-label-custom d-block mb-2">
                                  Email
                              </Form.Label>
                              <InputGroup>
                                  <InputGroup.Text className="bg-white">
                                      <FiMail className="text-muted" />
                                  </InputGroup.Text>
                                  <Form.Control
                                      type="email"
                                      name="email"
                                      placeholder="example@mail.com"
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      isInvalid={!!errors.email}
                                  />
                                  <Form.Control.Feedback type="invalid" className=" d-block">
                                      {errors.email}
                                  </Form.Control.Feedback>
                              </InputGroup>
                          </Form.Group>

                          {/* Поле Вопрос */}
                          <Form.Group className="mb-4">
                              <Form.Label className="form-label-custom d-block mb-2">
                                  Ваш вопрос
                              </Form.Label>
                              <InputGroup>
                                  <InputGroup.Text className="bg-white align-items-start">
                                      <FiMessageSquare className="text-muted mt-2" />
                                  </InputGroup.Text>
                                  <Form.Control
                                      as="textarea"
                                      rows={3}
                                      name="reason"
                                      placeholder="Опишите вашу проблему..."
                                      value={formData.reason}
                                      onChange={handleInputChange}
                                      isInvalid={!!errors.reason}
                                  />
                                  <Form.Control.Feedback type="invalid" className=" d-block">
                                      {errors.reason}
                                  </Form.Control.Feedback>
                              </InputGroup>
                          </Form.Group>

                          <div className="text-center">
                              <Button 
                                  variant="primary" 
                                  type="submit" 
                                  className="submit-btn-custom py-2 px-4"
                              >
                                  <FiSend className="me-2" /> Отправить заявку
                              </Button>
                          </div>
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
        <Container className="services-wrapper mt-3 mb-5">
            <h2 className="section-title text-dark">Наши услуги</h2>
            
            <div className="services-container">
                <Row className="justify-content-center">
                    <Col lg={4} md={6} className="my-2">
                        <Card className="service-card">
                            <div className="image-container p-0">
                                <Card.Img variant="top" src="src/images/repairtech.webp" alt="Ремонт принтеров" className="w-100 h-100 object-fit-cover" />
                            </div>
                            <Card.Body>
                                <Card.Title >Ремонт оргтехники</Card.Title>
                                <Card.Text className="service-description">
                                    Профессиональный ремонт оргтехники любой сложности.
                                </Card.Text>
                                <Link to="/repair" className="service-link">
                                    Подробнее <span className="arrow">→</span>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4} md={6} className="my-2">
                        <Card className="service-card">
                            <div className="image-container p-0">
                                <Card.Img variant="top" src="src/images/repaircomp.jpg" alt="Ремонт компьютеров" className="w-100 h-100 object-fit-cover" />
                            </div>
                            <Card.Body>
                                <Card.Title>Ремонт компьютеров</Card.Title>
                                <Card.Text className="service-description">
                                    Быстрый и качественный ремонт компьютеров и ноутбуков.
                                </Card.Text>
                                <Link to="/computers" className="service-link">
                                    Подробнее <span className="arrow">→</span>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4} md={6} className="my-2">
                        <Card className="service-card">
                            <div className="image-container p-0">
                                <Card.Img variant="top" src="src/images/optimize.webp" alt="Заправка картриджей" className="w-100 h-100 object-fit-cover" />
                            </div>
                            <Card.Body>
                                <Card.Title>Заправка картриджей</Card.Title>
                                <Card.Text className="service-description">
                                    Заправка и восстановление картриджей для принтеров.
                                </Card.Text>
                                <Link to="/refilling" className="service-link">
                                    Подробнее <span className="arrow">→</span>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
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

  import { RiHistoryLine, RiMedalLine, RiShieldCheckLine } from 'react-icons/ri';

  const ExperienceSection = () => {
      return (
          <div className="experience-section">
              <Container>
                  <h2 className="h22 text-center mb-5">Почему выбирают нас?</h2>
  
                  <Row className="text-center">
                      {/* Блок 1: Опыт работы */}
                      <Col md={4} className="mb-4">
                        <div className="icon-container">
                          <RiHistoryLine className="icon-image" size={48} />
                        </div>
                          <h3 className="h33 mt-3">Опыт работы</h3>
                          <p className='pp'>
                              Более 10 лет успешной работы на рынке ремонта и обслуживания оргтехники.
                          </p>
                      </Col>
  
                      {/* Блок 2: Качество */}
                      <Col md={4} className="mb-4">
                      <div className="icon-container">
  <RiMedalLine className="icon-image" size={48} />
</div>
                          <h3 className="h33 mt-3">Соблюдаем качество</h3>
                          <p className='pp'>
                              Мы гарантируем высокое качество выполнения всех работ, используя только проверенные технологии и материалы.
                          </p>
                      </Col>
  
                      {/* Блок 3: Гарантия */}
                      <Col md={4} className="mb-4">
                          <div className="icon-container">
  <RiShieldCheckLine className="icon-image" size={48} />
</div>
                          <h3 className="h33 mt-3">Даем гарантию</h3>
                          <p className='pp'>
                              На все услуги предоставляем гарантию, чтобы вы могли быть уверены в надежности нашего сервиса.
                          </p>
                      </Col>
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

                    <p style={{ fontSize: '18px', marginBottom: "1rem"}}>
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
            <Container className='feedback-container'>    
            <ReviewsComponent/>
            </Container>  
            <ContactsSection/>
        </div>
    );
};

export default MainPage;