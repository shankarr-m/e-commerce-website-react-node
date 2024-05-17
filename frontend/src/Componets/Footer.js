import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.css"
import '../Css/footer.css'

const Footer = () => {
    return (
        <>
            <section className='react-footer'>
                <footer className="bg-dark">
                    <Container fluid>
                        <Row>
                            <Col>
                                <h5 className='footer-head'>Contact Us</h5>
                                <p>Email: info@example.com</p>
                                <p>Phone: 123-456-7890</p>
                            </Col>
                            <Col>
                                <h5 className='footer-head'>Quick Links</h5>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/products">Products</a></li>
                                    <li><a href="/about">About Us</a></li>
                                    <li><a href="/contact">Contact Us</a></li>
                                </ul>
                            </Col>
                            <Col>
                                <h5 className='footer-head'>Follow Us</h5>
                                <p>Stay updated on social media:</p>
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href="#">Facebook</a></li>
                                    <li className="list-inline-item"><a href="#">Twitter</a></li>
                                    <li className="list-inline-item"><a href="#">Instagram</a></li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                    <div className="text-center p-3">
                        <p>&copy; 2024 E-commerce Site. All rights reserved.</p>
                    </div>
                </footer>
            </section>
        </>
    )
}

export default Footer