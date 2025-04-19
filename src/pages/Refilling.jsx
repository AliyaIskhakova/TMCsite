import React, { useState, useEffect, createContext } from 'react';
import { Container, Button, Modal, Form, Row, Col, Table } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { AddRequest } from '../api/requests';
import { getType3, searchRefillServices, createRefillOrder } from '../api/services';

import '../styles/Refilling.css'; // Добавляем стили для калькулятора
import WorkSteps from '../component/WorkSteps';
import CartridgeCalculator from '../component/CartridgeCalculator.jsx'

const AppContext = createContext();

const InfoSection = () => {
  return (
    <div className='mt-5 mb-3'>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6} className="my-3">
          <p className="text-justify" style={{ fontSize: '17px' }}>
          Мы заправляем картриджи для всех популярных моделей принтеров и МФУ в нашем сервисном центре. Работая с нами, вы будете уверены в качестве выполняемых работ и почувствуете, что печатать стало проще и экономнее.
          <br/> <br/>
Специалисты нашего сервисного центра по ремонту оргтехники и заправке картриджей в Арске способны справиться со всеми видами неисправностей — устранят причину зажевывания бумаги и других проблем печатного оборудования, восстановят работоспособность техники после попадания жидкости. Если ремонт устройства невозможен, мы подберем оптимальные варианты по приобретению нового аппарата.
<br/> <br/>
Оригинальные и совместимые картриджи, черно-белые и цветные — профессиональная заправка с гарантией качества!
          </p>
        </Col>
        <Col xs={12} md={4} lg={6} className="my-3 d-flex justify-content-center">
          <img src="src/images/refillingfoto.png" alt="Printer" className="img-fluid" style={{ maxHeight: '400px' }} />
        </Col>
      </Row>
    </div>
  );
};

const InfoSection2 = () => {
    return (
        <Container className='main-container'>
      <div className='mt-4'>
        <h2 className='text-center'>Наши преимущества</h2>
        <Row className="my-4 justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6} className="">
          <ul style={{ fontSize: '17px' }}>
            <li><b>Оперативно.</b> Заправка картриджа составляет 20 минут, в нашем сервисном центре.</li>
            <br/>
            <li><b>Надежно.</b> Используем только качесвенный тонер.</li>
            <br/>
            <li><b>Качественный тонер.</b> Используем профессиональное оборудование для заправки картриджей</li>
            <br/>
            <li><b>Контроль качества.</b> Гарантированно высокое качество печати после заправки картриджа.
            </li>
            <br/>
            <li><b>Опыт работы более 10 лет.</b>Высокая квалификация персонала, которая обеспечивает правильную и долговечную работу техники.</li>
            </ul>
            
          </Col>
          <Col xs={12} md={4} lg={6} className="text-center">
            <img src="src/images/optimize.webp" alt="Printer" className="img-fluid" style={{ maxHeight: '300px' }} />
          </Col>
        </Row>
      </div>
      </Container>
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
        <div className="hero-sectionRefilling">
          <Container className="hero-contentRefilling">
            <h1>Заправка картриджей</h1>
            <p>
              Сервисный центр «Техномедиасоюз» осуществляет ремонт оргтехники и заправку картриджей
            </p>
            <Button 
              variant="primary" 
              onClick={handleShowModal}
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
        
        <Container className='main-container'>
          <InfoSection />
          <CartridgeCalculator />
          </Container>
          <WorkSteps/>
          <InfoSection2/>
      </div>
    </AppContext.Provider>
  );
};

export default Refilling;