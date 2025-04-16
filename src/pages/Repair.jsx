import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card, Table} from 'react-bootstrap';
import InputMask from 'react-input-mask'; // Импорт библиотеки для маски ввода
import '../styles/Repair.css'; // Импорт стилей из папки styles
import '../styles/TableStyle.css';
import { AddRequest } from '../api/requests';
import { getType1 } from '../api/services';
import { Link } from 'react-router-dom';
import WorkSteps from '../component/WorkSteps'

const InfoSection = () => {
  return (
    <Container className='main-container'>
    <div className='mt-5'>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6} >
          <p style={{ fontSize: '17px' }}>
          Мы производим срочный, текущий, сервисный ремонт оргтехники. Делаем ремонт практически всей офисной техники, модульный ремонт, компонентный ремонт.
          <br /><br />
Специалисты нашего сервисного центра по ремонту оргтехники способны справиться со всеми видами неисправностей — устранят причину перебои и ошибки, восстановят работоспособность техники.
<br /><br />
В случае если восстановление работоспособности оборудования невозможно, то подберем варианты по замене устройств не хуже чем были по характеристикам.
<br /><br />
            Наш сервисный центр предоставляет услуги по ремонту оргтехники в Арске и Атне.
           
          </p>
          
        </Col>
        <Col xs={12} md={4} lg={6} className="text-center">
          <img src="src/images/repairtech.png" alt="Printer" className="img-fluid" style={{ maxHeight: '300px' }} />
        </Col>
      </Row>
      <Row className="mt-4 justify-content-center">
            <Col xs={12} md={6} lg={6}>
              <ul className="text-primary " style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li className='mb-2'>Принтеры, МФУ, плоттеры; термопринтеры;</li>
                <li className='mb-2'>Компьютеры, ноутбуки, серверы;</li>
                <li className='mb-2'>Мониторы, телевизоры;</li>
                <li className='mb-2'>ИБП, стабилизаторы;</li>
              </ul>
            </Col>
            <Col xs={12} md={6} lg={6} >
              <ul className="text-primary" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li className='mb-2'>Проекторы, видеонаблюдение;</li>
                <li className='mb-2'>Шредеры, брошюраторы;</li>
                <li className='mb-2'>Ламинаторы, резаки;</li>
                <li className='mb-2'>Факсы и другие офисные устройства.</li>
              </ul>
            </Col>
          </Row>
    </div>
    </Container>
  );
};

const InfoSection2 = () => {
    return (
        <Container className='main-container'>
      <div className='mt-5'>
        <h2 className='text-center'>Наши преимущества оказания ремонта</h2>
        <Row className="mt-5 justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6} className="my-3">
          <ul style={{ fontSize: '17px' }}>
            <li>Прежде чем приступить к ремонту оборудования, мы проводим предварительную диагностику. Благодаря этому вы изначально будете знать, на какую сумму рассчитывать. В случае вашего согласия, мы приступим к ремонту оргтехники;</li>
            <br/>
            <li>В нашей компании вы сможете получить консультацию специалиста о том, как избежать подобных поломок в будущем;</li>
            <br/>
            <li>Если в процессе ремонта понадобится замена комплектующих, мы обязательно вас об этом уведомим.</li>
            </ul>
            
          </Col>
          <Col xs={12} md={4} lg={6} className="text-center">
            <img src="src/images/printerrepair.png" alt="Printer" className="img-fluid" style={{ maxHeight: '300px' }} />
          </Col>
        </Row>
      </div>
      </Container>
    );
  };

const Repair = () => {
  const [services, setServices]=React.useState([]);
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
    };

  React.useEffect(()=>{
    getType1().then((data) =>{
      setServices(data); 
    })
}, [])

    return(
      
      <div>
        <div className="hero-sectionRepair">
            <Container className="hero-contentRepair">
                <h1>Ремонт и обслуживание оргтехники</h1>
                <p>
                    Сервисный центр «Техномедиасоюз» осуществляет ремонт, обслуживание оргтехники
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
                                <Form.Label>Фамилия</Form.Label>
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
        <InfoSection/>
        <WorkSteps/>
        <InfoSection2/>
        <Container className='main-container'>
          <h2 className="text-center ">Цены на работы</h2>  
          <Table striped bordered hover>
    <tbody>
        <tr>
            <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}>Услуга</th>
            <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}>Цена</th>
            <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}></th>
        </tr>
        {
            services.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>от {item.cost} руб.</td>
                    <td>
                        <Button variant="outline-primary" size="sm" onClick={handleShowModal}>
                            Оставить заявку
                        </Button>
                    </td>
                </tr>
            ))
        }
    </tbody>
</Table>

    <p className="text-muted mt-3" style={{ fontSize: '12px' }}>
            *Цены зависят от сложности ремонта и наличия электронных компонентов. Вы всегда можете узнать цену решения проблемы по Whatsapp, Telegram или же оставить заявку на нашем сайте.
          </p>
    </Container>
        </div>
    );
};

export default Repair
