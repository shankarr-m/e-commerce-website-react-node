import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Css/buynow.css';
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';

const BuyNow = () => {

    let nav = useNavigate()
    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
        "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
        "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
    ];

    const tamilNaduCities = [
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"
    ];

    const [selectedState, setSelectedState] = useState("");
    let [user, setUser] = useState(null)

    useEffect(() => {

        let value = localStorage.getItem("userId")

        if (value) {
            setUser(value)
        }
    }, [])

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let phno = document.getElementById("phno").value;
        let address = document.getElementById("address").value;
        let state = selectedState;
        let cityInput = document.getElementById("city");
        let city = cityInput ? cityInput.value : null;

        let key = {
            name: name,
            email: email,
            phno: phno,
            address:address,
            state: state,
            city: city
        };

        try {
            const res = await axios.put(`http://localhost:3001/auth/user/${user}/address`, key)
            if (res.data.message === "Address added successfully") {
                nav("/online-shopping/projct-in/93.61.06.09/conformation")
            }
            else {
                alert("Something want Error Try Again")
            }

        } catch (error) {
            console.error('Error updating address:', error);
        }

    };

    return (
        <>
            <section className='react-buy'>
                <div className="buy-container">
                    <div className="buy-form">
                        <h2 className='buy-head'>
                            <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5583d3", }} />》
                            <FontAwesomeIcon icon={faCircle} style={{ color: "#5583d3", }} />》
                            <FontAwesomeIcon icon={faCircle} style={{ color: "#5583d3", }} />
                        </h2>
                        <p className='text-center'>Address&nbsp;&nbsp;&nbsp;Conformation&nbsp;&nbsp;&nbsp;Payment</p>
                        <h2>Customer Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name :</label>
                                <input type="hidden" name="addressId" id="addressId" value="0" />
                                <input className='buy-input' type="text" name="name" id='name' required />
                            </div>
                            <div className="form-group">
                                <label>Email :</label>
                                <input className='buy-input' type="email" name="email" id='email' required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number :</label>
                                <input className='buy-input' type="number" name="phone" id='phno' required />
                            </div>
                            <div className="form-group">
                                <label>Address :</label>
                                <textarea id="address" name="address" rows="4" required style={{ width: "100%" }} />
                            </div>
                            <div className="form-group">
                                <label>State:</label>
                                <select id="state" name="state" className='buy-select' required onChange={handleStateChange}>
                                    <option value="">Select State</option>
                                    {indianStates.map(state => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedState === "Tamil Nadu" && (
                                <div className="form-group">
                                    <label>City:</label>
                                    <select id="city" name="city" className='buy-select' required>
                                        <option value="">Select City</option>
                                        {tamilNaduCities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <button className='buy-btn' type="submit">Next &#8594;</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};


const Confirmation = () => {

    const nav = useNavigate()

    const [addresses, setAddresses] = useState([]);
    const [productDetails, setProductDetails] = useState(null);
    const userId = localStorage.getItem('userId');
    const productId = localStorage.getItem('productId');
    const stock = localStorage.getItem('stock');
    const amount = localStorage.getItem('amount');

    useEffect(() => {
        fetchProductDetails(productId);
        fetchUserAddresses();
    }, [userId, productId]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3001/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProductDetails(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserAddresses = async () => {
        try {
            const response = await fetch(`http://localhost:3001/auth/user/${userId}/addresses`);
            if (!response.ok) {
                throw new Error('Failed to fetch addresses');
            }
            const data = await response.json();
            setAddresses(data);
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <section className='react-conform'>
            <Container>
                <Row>
                    <h3 className='con-head text-center'>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5583d3" }} />》
                        <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5583d3" }} />》
                        <FontAwesomeIcon icon={faCircle} style={{ color: "#5583d3" }} />
                    </h3>
                    <h6 className='text-center'>Address&nbsp;&nbsp;&nbsp;Confirmation&nbsp;&nbsp;&nbsp;Payment</h6>
                </Row>
                <Row></Row>
                <Row xl={2} md={2} sm={1} lg={2}>
                    <Col>
                        <div className='con-user'>
                            <h4>Address Details : </h4>
                            <div className='con-values'>
                                {addresses && addresses.map((address, index) => (
                                    <div key={index}>
                                        <h6>Name : {address.name}</h6>
                                        <h6>Email : {address.email}</h6>
                                        <h6>Phno : {address.phno}</h6>
                                        <h6>Address : {address.address}</h6>
                                        <h6>State : {address.state}</h6>
                                        <h6>City : {address.city}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='con-values'>
                            <img src='https://img.etimg.com/thumb/width-1200,height-900,imgsize-19338,resizemode-75,msid-96717167/prime/prime-decoder/how-electronic-proof-of-delivery-is-enabling-logistics-companies-fast-track-billing-and-collection.jpg' alt='...' height="175px" width="430px" />
                        </div>
                    </Col>
                    <Col>
                        <div className='con-product'>
                            <h4>Product Details : </h4>
                            <div className='con-values'>
                                {productDetails && (
                                    <>
                                        <img src={productDetails.imageURL} alt='Product' height="200px" width="160px" />
                                        <h3>{productDetails.productName}</h3>
                                        <p className='order-body'>Description: {productDetails.description}</p>
                                        <h6>Rs: {productDetails.price}</h6>
                                        <p>Number Of products: {stock}</p>
                                        <h5>Total Value: {amount}</h5>
                                    </>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Payment />
                </Row>
            </Container>
        </section>
    );
};


const Payment = () => {

    let nav = useNavigate()

    const [showOrder, setShowOrder] = useState(false);
    const [showOrderPlaced, setShowOrderPlaced] = useState(false);



    const handleCloseOrder = () => setShowOrder(false);
    const handleShowOrder = () => setShowOrder(true);

    const handleCloseOrderPlaced = () => setShowOrderPlaced(false);
    const handleShowOrderPlaced = () => setShowOrderPlaced(true);

    const handleOrderPlace = () => {
        handleCloseOrder();
        handleShowOrderPlaced();
    };

    const goBack = () => {
        nav("/online-shopping/projct-in/93.61.06.09/buynow")
    }

    let handleOkay = () => {
        nav("/online-shopping/project-in/93.61.06.00/109601639/home")
    }

    let handleCard = () =>{
        nav("/online-shopping/projct-in/93.61.06.09/card")
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <button className='btn btn-primary w-25' onClick={goBack}>&#8592; Back</button>
                <Link className="btn btn-primary me-2 w-25" onClick={handleShowOrder}>
                    confirm &#8594;
                </Link>
            </div>
            <Modal
                show={showOrder}
                onHide={handleCloseOrder}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Payment</h5>
                    </Modal.Title>
                </Modal.Header>
                <h4 className='payment-icon'>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5583d3", }} />》
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5583d3", }} />》
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#5583d3", }} />
                </h4>
                <h6 className='payment-head'>Address&nbsp;&nbsp;&nbsp;Conformation&nbsp;&nbsp;&nbsp;Payment</h6>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <img src='https://img.freepik.com/premium-vector/online-payment-concept_118813-2685.jpg' alt='...' height="330pxpx" width="auto" />
                            <button className='payment-cash-btn my-2' onClick={handleOrderPlace}> 💸 Cash On Delivery</button>
                            <div className='d-flex'>
                                <a href="https://pay.google.com/about/" className='me-3 payment-online-btn' style={{ height: "50px", width: "220px" }}><img src="https://1000logos.net/wp-content/uploads/2023/03/Google-Pay-logo.png" alt="Your Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></a>
                                <a href='https://www.phonepe.com/business-solutions/payment-gateway/register/?utm_source=SEM_PG_PhonePe_Self_JAN_24_SL2&gad_source=1&gclid=EAIaIQobChMI5dnWloPThQMVtg2DAx2AfAA8EAAYASACEgI3JfD_BwE' className='payment-online-btn' style={{ height: "50px", width: "220px" }}><img src="https://logolook.net/wp-content/uploads/2022/12/PhonePe-Logo.png" alt="Your Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></a>
                            </div>
                            <button className='payment-cash-btn my-2' onClick={handleCard}> Card 💳</button>
                            <button className='btn text-center btn-danger my-2 w-50' onClick={handleCloseOrder}>Cancel</button>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrder}>Cancel</Button>
                    <Button variant="primary" onClick={handleOrderPlace}>Cash On Delivery</Button>
                </Modal.Footer> */}
            </Modal>

            <Modal
                show={showOrderPlaced}
                onHide={handleCloseOrderPlaced}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Ordered 😍</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center><img src='https://t4.ftcdn.net/jpg/05/52/36/59/360_F_552365973_sS3KeyOHzwMeILRwLiWGCKh8oC0T2400.jpg' alt='...' height="auto" width="auto" /></center>
                    <h4>Your Order Will Be Successfully Placed 🎁</h4>
                    <h3>Product Delivery in 14 Days🛵</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='p-2 w-50 rounded-pill' onClick={handleOkay}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

const Card = () => {
    return (
        <>
        <center>
        <h3>Something was Worng . . . </h3>
        <p>Please Try Again </p>
        </center>
        </>
    )
}

export default BuyNow;
export { Confirmation, Payment, Card }
