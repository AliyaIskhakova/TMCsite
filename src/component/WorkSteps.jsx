import React from 'react';
import { Container } from 'react-bootstrap';
import { FaPhoneAlt, FaSearch, FaTools, FaCreditCard, FaChevronRight } from 'react-icons/fa';
import '../styles/WorkSteps.css';

const WorkSteps = () => {
  const steps = [
    { 
      id: 1, 
      title: 'ЗАЯВКА', 
      description: 'Оставьте заявку на сайте или напишите нам',
      icon: <FaPhoneAlt className="work-step-icon" />
    },
    { 
      id: 2, 
      title: 'ДИАГНОСТИКА', 
      description: 'Проведем бесплатную диагностику оборудования',
      icon: <FaSearch className="work-step-icon" />
    },
    { 
      id: 3, 
      title: 'РЕМОНТ', 
      description: 'Выполним качественный ремонт в кратчайшие сроки',
      icon: <FaTools className="work-step-icon" />
    },
    { 
      id: 4, 
      title: 'ОПЛАТА', 
      description: 'Оплата только после проверки результата',
      icon: <FaCreditCard className="work-step-icon" />
    }
  ];

  return (
    <section className="work-steps-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="h22">Как мы работаем?</h2>
        </div>
        
        <div className="work-steps-wrapper">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="work-step-item">
                <div className="icon-container">
                  <div className="work-step-circle">
                    {step.icon}
                  </div>
                </div>
                <h3 className="h33 step-title">{step.title}</h3>
                <p className="pp">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="work-step-arrow d-none d-md-flex">
                  <FaChevronRight className="arrow-icon" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorkSteps;