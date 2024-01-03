import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import styles from './Home.module.css';
import {useNavigate} from "react-router-dom";


export default function Home() {
    let Navigate=useNavigate();
    function switchToLogin() {

        return Navigate("/login");
    }
    return (
        <div style={{ height: '100vh', background: '#2c3e50', color: '#ecf0f1' }}>
            <Button variant="primary" className="position-absolute top-0 end-0 m-4" onClick={()=>{
                switchToLogin();
            }}>Login page</Button>

            <Container className={`align-items-center justify-content-center p-5 rounded`} style={{ maxHeight: '100vh', maxWidth: '1000px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}>
                <div className="custom-div text-center mb-4">
                    <h1 className="display-4 font-weight-bold" style={{ color: '#3498db' }}>SIMULATION DU CONTROLE AERIEN</h1>
                </div>

                <Row className="align-items-center justify-content-center">
                    <Col md={8} className={`${styles.background} mb-4 rounded`}>
                    </Col>

                    <Col md={4} className="custom-div text-center">
                        <p className="lead">Ce simulateur devra permettre de suivre les vols et les stations au sol d'un certain nombre d'avions</p>
                    </Col>
                </Row>
            </Container>

            <Container fluid className="d-flex align-items-center justify-content-center custom-navbar py-3" style={{ background: '#2c3e50' }}>
                <div className="d-flex justify-content-around" style={{ width: '200px' }}>
                    <FontAwesomeIcon icon={faFacebook} size="2x" style={{ color: '#1877f2' }} />
                    <FontAwesomeIcon icon={faInstagram} size="2x" style={{ color: '#e4405f' }} />
                    <FontAwesomeIcon icon={faTwitter} size="2x" style={{ color: '#1da1f2' }} />
                    <FontAwesomeIcon icon={faYoutube} size="2x" style={{ color: '#ff0000' }} />
                    <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: '#0077b5' }} />
                </div>
            </Container>
        </div>
    );
}
