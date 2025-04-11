import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card, Table} from 'react-bootstrap';
import InputMask from 'react-input-mask'; // Импорт библиотеки для маски ввода
import '../styles/HeroSection.css'; // Импорт стилей из папки styles
import '../styles/ServicesSection.css';
import '../styles/ContactSection.css'; // Импорт стилей
import { AddRequest } from '../api/requests';
import { getType2 } from '../api/services';
import { Link } from 'react-router-dom';
import '../styles/TableStyle.css';
import WorkSteps from '../component/WorkSteps';

const InfoSection = () => {
  return (
    <div className='mt-5'>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6} className="my-3">
          <p className="text-justify" style={{ fontSize: '17px' }}>

          Мы производим срочный, текущий, сервисный ремонт системных блоков, ноутбуков в Арске. Делаем апгрейд — увеличиваем память и объем диска, меняем процессор и видеокарту на более мощное «железо», устанавливаем более мощный блок питания. Производим ремонт материнских плат и отдельных комплектующих.
          <br/><br/>
ССпециалисты нашего сервисного центра по ремонту ноутбуков и компьютеров в Арске способны справиться со всеми видами неисправностей — устранят причину перегрева и самопроизвольного отключения, восстановят работоспособность техники, на которую пролита жидкость.
<br/><br/>
В случае если восстановление работоспособности материнской платы невозможно, то подберем варианты по замене материнской платы или иных неисправностей.

          </p>
        </Col>
        <Col xs={12} md={4} lg={6} className="my-3 d-flex justify-content-center">
          <img src="src/images/printer.jpg" alt="Printer" className="img-fluid" style={{ maxHeight: '400px' }} />
        </Col>
      </Row>
    </div>
  );
};

const RepairComputer = () => {
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
        setFormData({ surname: '', name1: '', telephone: '', reason: '' }); // Очистка формы
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
    getType2().then((data) =>{
      setServices(data); 
    })
}, [])

    return(
      
      <div>
        <div className="hero-sectionRepairComputer">
            <Container className="hero-contentRepairComputer">
                <h1>Ремонт компьютерной техники</h1>
                <p>
                    Сервисный центр «Техномедиасоюз» осуществляет ремонт, обслуживание компьютерной техники в Арске и Атне.
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
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="formname">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name1"
                                    value={formData.name1}
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
                <Container>
                  <InfoSection/>
                </Container>
        
        
          <WorkSteps/>
        <Container> 
        <Table striped bordered hover className="custom-table">
            <tbody>
              <tr>
                <th>Услуга</th>
                <th>Цена</th>
                <th></th>
              </tr>
              {services.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>от {item.cost} руб.</td>
                  <td>
                    <Button variant="outline-primary" size="sm" onClick={handleShowModal}>
                      Оставить заявку
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        </div>
    );
};

export default RepairComputer
