import React, { useState, useRef, useEffect } from 'react';
import { Container, Button, Modal, Form, Row, Col, Card, Table, Alert, InputGroup} from 'react-bootstrap';
import InputMask from 'react-input-mask';
import '../styles/RapairComputer.css'; 
import { AddRequest } from '../api/requests';
import { getType2 } from '../api/services';
import WorkSteps from '../component/WorkSteps';
import { FiUser, FiPhone, FiMail, FiMessageSquare, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';


const InfoSection = () => {
  return (
    <div className='mt-5 mb-4'>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={8} lg={6} className="">
          <p className="text-justify" style={{ fontSize: '17px' }}>

          Мы производим срочный, текущий, сервисный ремонт системных блоков, ноутбуков в Арске. Делаем апгрейд — увеличиваем память и объем диска, меняем процессор и видеокарту на более мощное «железо», устанавливаем более мощный блок питания. Производим ремонт материнских плат и отдельных комплектующих.
          <br/><br/>
ССпециалисты нашего сервисного центра по ремонту ноутбуков и компьютеров в Арске способны справиться со всеми видами неисправностей — устранят причину перегрева и самопроизвольного отключения, восстановят работоспособность техники, на которую пролита жидкость.
<br/><br/>
В случае если восстановление работоспособности материнской платы невозможно, то подберем варианты по замене материнской платы или иных неисправностей.

          </p>
        </Col>
        <Col xs={12} md={4} lg={6} className="text-center">
          <img src="src/images/repaircomp.jpg" alt="Printer" className="img-fluid" style={{ maxHeight: '400px' }} />
        </Col>
      </Row>
    </div>
  );
};
const InfoSection2 = () => {
    return (
        <Container className='main-container'>
      <div className='mt-4'>
        <h2 className='text-center'>Наши преимущества оказания ремонта</h2>
        <Row className="my-4 justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6} className="">
          <ul style={{ fontSize: '17px' }}>
            <li>Прежде чем приступить к ремонту оборудования, мы проводим предварительную диагностику. Благодаря этому вы изначально будете знать, на какую сумму рассчитывать. В случае вашего согласия, мы приступим к ремонту оргтехники;</li>
            <br/>
            <li>В нашей компании вы сможете получить консультацию специалиста о том, как избежать подобных поломок в будущем;</li>
            <br/>
            <li>Если в процессе ремонта понадобится замена комплектующих, мы обязательно вас об этом уведомим.</li>
            </ul>
            
          </Col>
          <Col xs={12} md={4} lg={6} className="text-center">
            <img src="src/images/repaircomputer.jpg" alt="Printer" className="img-fluid" style={{ maxHeight: '300px' }} />
          </Col>
        </Row>
      </div>
      </Container>
    );
  };

const RepairComputer = () => {
  const [services, setServices]=React.useState([]);
const [showModal, setShowModal] = useState(false);
  const [selectedSService, setSelectedService] = React.useState('');
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

  useEffect(() => {
      if (formData.fio) validateFio(formData.fio);
      if (formData.reason) validateReason(formData.reason);
  }, [formData.fio, formData.reason]);

  const handleShowModal = (serviceName = '') => {
    setSelectedService(serviceName);  
    setShowModal(true);
    
  };
  const handleCloseModal = () => {
      setShowModal(false);
      setFormData({ fio: '', telephone: '', email: '', reason: '' });
      setErrors({ fio: '', telephone: '', email: '', reason: '' });
      setSelectedService('');
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
      
      const isFormValid = validateFio(formData.fio) && 
                        validatePhone(formData.telephone) && 
                        validateEmail(formData.email) && 
                        validateReason(formData.reason);
      
      if (!isFormValid) {
          return;
      }

      try {
          const requestData = {
                      ...formData
                      };
                      if (selectedSService!=null) {
                        requestData.reason = `Услуга: ${selectedSService}\nОписание проблемы: ${formData.reason}`
                      };
                      await AddRequest(requestData);
                      console.log('Форма отправлена:', requestData);
          console.log('Форма отправлена:', formData);
          showNotification('success', 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
          handleCloseModal();
      } catch (error) {
          console.error('Ошибка при отправке формы:', error);
          showNotification('danger', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз.');
      }
  }

  React.useEffect(()=>{
    getType2().then((data) =>{
      setServices(data); 
    })
}, [])

    return(
      
      <div>
        <div className="hero-sectionRepairComputer">
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
            <Container className="hero-contentRepairComputer">
                <h1>Ремонт компьютерной техники</h1>
                <p>
                    Сервисный центр «ТехноМедиаСоюз» осуществляет ремонт компьютеров и ноутбуков
                </p>
                <Button variant="primary" size="lg" onClick={() => handleShowModal(null)}>
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
                <Container className='main-container'>
                  <InfoSection/>
                </Container>
        
        
          <WorkSteps/>
          <InfoSection2/>
        <Container className='main-container'> 
        <h2 className="text-center ">Цены на работы</h2>

        <Table striped bordered hover className="custom-table">
            <tbody>
              <tr>
              <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}>Услуга</th>
            <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}>Цена</th>
            <th style={{ backgroundColor: '#0A1C6F', color: 'white' }}></th>
              </tr>
              {services.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>от {item.cost} руб.</td>
                  <td>
                   <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(item.name)}>
                          Оставить заявку
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="text-muted mt-3" style={{ fontSize: '12px' }}>
            *Цены зависят от сложности ремонта и наличия электронных компонентов. Вы всегда можете узнать цену решения проблемы по Whatsapp, Telegram или же оставить заявку на нашем сайте.
          </p>
        </Container>
        </div>
    );
};

export default RepairComputer
