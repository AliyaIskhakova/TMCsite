import React, { useState, useEffect, createContext } from 'react';
import { Container, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../styles/HeroSection.css';
import '../styles/ServicesSection.css';
import '../styles/ContactSection.css';
import { AddRequest } from '../api/requests';
import { getType3, searchRefillServices, createRefillOrder } from '../api/services';
import '../styles/TableStyle.css';
import '../styles/Refilling.css'; // Добавляем стили для калькулятора
import WorkSteps from '../component/WorkSteps';

const AppContext = createContext();

const CartridgeCalculator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [fio, setCustomerName] = useState('');
  const [telephone, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        searchServices();
      } else {
        setFilteredServices([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchServices = async () => {
    setIsLoading(true);
    try {
      const data = await searchRefillServices(searchQuery);
      setFilteredServices(data);
    } catch (error) {
      console.error('Ошибка поиска:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!selectedService || !fio || !telephone) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      setIsLoading(true);
      await createRefillOrder({
        fio: fio,
        telephone: telephone,
        reason: selectedService.name
      });
      alert('Заказ на заправку успешно оформлен!');
      resetForm();
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
      alert('Произошла ошибка при оформлении заказа');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedService(null);
    setCustomerName('');
    setPhoneNumber('');
    setSearchQuery('');
  };

  return (
    <div className="refill-calculator">
      <h2 className="refill-title">Калькулятор заправки картриджей</h2>
      <p className="refill-subtitle">Узнайте стоимость заправки вашего картриджа</p>

      <div className="search-section">
        <input
          type="text"
          value={selectedService ? selectedService.name : searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (selectedService) setSelectedService(null);
          }}
          placeholder="Введите модель принтера или картриджа"
          className="search-input"
          disabled={isLoading}
        />
        
        {isLoading && <div className="loading-indicator">Поиск...</div>}
        
        {!isLoading && searchQuery && !selectedService && filteredServices.length > 0 && (
          <ul className="suggestions-list">
            {filteredServices.map(service => (
              <li 
                key={service.idService}
                onClick={() => {
                  setSelectedService(service);
                  setSearchQuery('');
                }}
                className="suggestion-item"
              >
                {service.name} - {service.cost} ₽
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedService && (
        <form onSubmit={handleSubmitOrder} className="order-form">
          <div className="service-info">
            <h3>Выбранная услуга:</h3>
            <p><strong>{selectedService.name}</strong></p>
            <p>Стоимость: <strong>{selectedService.cost} ₽</strong></p>
          </div>

          <div className="form-group">
            <label>Ваше ФИО:</label>
            <input
              type="text"
              value={fio}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Телефон:</label>
            <InputMask
              mask="+7(999)999-99-99"
              value={telephone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                  type="tel"
                  className="form-input"
                  placeholder="+7 (___) ___-__-__"
                />
              )}
            </InputMask>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Оформление...' : 'ОФОРМИТЬ ЗАКАЗ'}
            </button>
            <button 
              type="button"
              onClick={resetForm}
              className="reset-btn"
              disabled={isLoading}
            >
              ОЧИСТИТЬ
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const InfoSection = () => {
  return (
    <div className='mt-5'>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6} className="my-3">
          <p className="text-justify" style={{ fontSize: '17px' }}>
            Для продуктивной работы в офисе или на предприятии необходимо чтобы всё, чем пользуются сотрудники было в исправном состоянии. Если в кабинете не работает принтер, распечатка обычного бланка будет занимать много времени. Придется идти копировать документ на цифровой носитель, нести флешку в соседний кабинет и там распечатывать.
            <br /><br />
            Помимо принтеров существует большое количество другой оргтехники. Для такого оборудования необходимо проводить обслуживание, а случае возникновения неисправностей проводить ремонтные работы.
            <br /><br />
            Наш сервисный центр предоставляет услуги по ремонту оргтехники в Арске и Атне.
            <br /><br />
            Сотрудничать с профессиональным центром намного удобнее. У нас современный, хорошо оснащенный сервис ремонта оргтехники, наши сертифицированные мастера способны восстановить сломанную технику любых брендов.
          </p>
        </Col>
        <Col xs={12} md={4} lg={6} className="my-3 d-flex justify-content-center">
          <img src="src/images/refillingfoto.png" alt="Printer" className="img-fluid" style={{ maxHeight: '400px' }} />
        </Col>
      </Row>
    </div>
  );
};

const Refilling = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fio: '',
    telephone: '',
    reason: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ fio: '', telephone: '', reason: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddRequest(formData);
      console.log('Форма отправлена:', formData);
      handleCloseModal();
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  useEffect(() => {
    getType3().then((data) => {
      setServices(data); 
    });
  }, []);

  const appContextValue = {
    theme: 'light',
    user: null,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div>
        <div className="hero-sectionRepair">
          <Container className="hero-contentRepair">
            <h1>Ремонт и обслуживание оргтехники</h1>
            <p>
              Сервисный центр «Техномедиасоюз» осуществляет ремонт, обслуживание оргтехники в Арске и Атне.
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handleShowModal}
              style={{ backgroundColor: '#0E2280', borderColor: '#0E2280' }}
            >
              Оставить заявку
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Оставить заявку</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formSurname">
                    <Form.Label>Ваше ФИО</Form.Label>
                    <Form.Control
                      type="text"
                      name="fio"
                      value={formData.fio}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formTelephone">
                    <Form.Label>Телефон</Form.Label>
                    <InputMask
                      mask="+7(999)999-99-99"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                      required
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

                  <Form.Group controlId="formReason">
                    <Form.Label>Ваш вопрос</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="mt-3"
                    style={{ backgroundColor: '#0E2280', borderColor: '#0E2280' }}
                  >
                    Отправить заявку
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
        
        <Container>
          <InfoSection />
          <CartridgeCalculator />
          </Container>
          <WorkSteps/>
          <Container>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}>Услуга</th>
                <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}>Цена</th>
                <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}></th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>от {item.cost} руб.</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={handleShowModal}
                      style={{ color: '#0E2280', borderColor: '#0E2280' }}
                    >
                      Оставить заявку
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </AppContext.Provider>
  );
};

export default Refilling;