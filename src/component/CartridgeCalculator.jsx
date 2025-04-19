import { useState, useEffect } from 'react';
import { FiUser, FiPhone, FiMail, FiCheck, FiX, FiAlertCircle, FiPrinter, FiCheckCircle, FiSend, FiXCircle } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { Alert , InputGroup, Form} from 'react-bootstrap';
import { searchRefillServices } from '../api/services';
import { AddRequest } from '../api/requests';
import '../styles/CartridgeCalculator.css';

const CartridgeCalculator = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredServices, setFilteredServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [formData, setFormData] = useState({
      fio: '',
      telephone: '',
      email: ''
    });
    const [errors, setErrors] = useState({
      fio: '',
      telephone: '',
      email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({
      show: false,
      variant: 'success',
      message: ''
    });
  
    // Валидация в реальном времени
    useEffect(() => {
      if (formData.fio) validateFio(formData.fio);
      if (formData.telephone) validatePhone(formData.telephone);
      if (formData.email) validateEmail(formData.email);
    }, [formData.fio, formData.telephone, formData.email]);
  
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
        showNotification('danger', 'Произошла ошибка при поиске услуг');
      } finally {
        setIsLoading(false);
      }
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
  
      if (name === 'telephone') validatePhone(value);
      if (name === 'fio') validateFio(value);
      if (name === 'email') validateEmail(value);
    };
  
    const validateFio = (fio) => {
      const isValid = fio.trim().split(' ').length >= 2;
      setErrors({...errors, fio: isValid ? '' : 'Введите полное ФИО (минимум 2 слова)'});
      return isValid;
    };
  
    const validatePhone = (phone) => {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 11) {
        setErrors({...errors, telephone: 'Введите корректный номер телефона'});
        return false;
      }
      setErrors({...errors, telephone: ''});
      return true;
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
  
    const handleSubmitOrder = async (e) => {
      e.preventDefault();
      
      // Проверка всех полей перед отправкой
      const isFormValid = validateFio(formData.fio) && 
                        validatePhone(formData.telephone) &&
                        validateEmail(formData.email);
      
      if (!isFormValid || !selectedService) {
        if (!selectedService) {
          showNotification('danger', 'Пожалуйста, выберите услугу');
        }
        return;
      }
  
      try {
        setIsLoading(true);
        await AddRequest({
          fio: formData.fio,
          telephone: formData.telephone,
          email: formData.email,
          reason: selectedService.name
        });
        showNotification('success', 'Заказ на заправку успешно оформлен!');
        resetForm();
      } catch (error) {
        console.error('Ошибка оформления заказа:', error);
        showNotification('danger', 'Произошла ошибка при оформлении заказа');
      } finally {
        setIsLoading(false);
      }
    };
  
    const resetForm = () => {
      setSelectedService(null);
      setFormData({ fio: '', telephone: '', email: '' });
      setErrors({ fio: '', telephone: '', email: '' });
      setSearchQuery('');
    };
  
    return (
        <div className="refill-calculator">
        {/* Уведомление */}
        {notification.show && (
          <div className="notification-wrapper">
            <Alert 
              variant={notification.variant} 
              className="text-center"
              style={{ 
                display: 'inline-block',
                minWidth: '300px',
                maxWidth: '80%',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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
  
        <h2 className="refill-title">Калькулятор заправки картриджей</h2>
        <p className="refill-subtitle">Узнайте стоимость заправки вашего картриджа</p>
  
        <div className="search-section">
          <InputGroup>
            <InputGroup.Text className="bg-white">
              <FiPrinter className="text-muted" />
            </InputGroup.Text>
            <Form.Control
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
          </InputGroup>
          
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
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.telephone}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
  
            {/* Поле Email */}
            <Form.Group className="mb-4">
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
                <Form.Control.Feedback type="invalid" className="d-block">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
  
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isLoading}
              >
                <FiSend className="me-2" />
                {isLoading ? 'Оформление...' : 'ОФОРМИТЬ ЗАЯВКУ'}
              </button>
              <button 
                type="button"
                onClick={resetForm}
                className="reset-btn"
                disabled={isLoading}
              >
                <FiXCircle className="me-2" />
                ОЧИСТИТЬ
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

export default CartridgeCalculator;
