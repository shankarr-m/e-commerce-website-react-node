import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css'
import '../Css/order.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Order = ({value,amount,stock}) => {

    console.log(value)

    const [showOrder, setShowOrder] = useState(false);
    const [showOrderPlaced, setShowOrderPlaced] = useState(false);
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3001/products/${value}`)
            .then(res => {
                setData(res.data)
            })
    }, [])


    const handleCloseOrder = () => setShowOrder(false);
    const handleShowOrder = () => setShowOrder(true);

    const handleCloseOrderPlaced = () => setShowOrderPlaced(false);
    const handleShowOrderPlaced = () => setShowOrderPlaced(true);

    const handleOrderPlace = () => {
        handleCloseOrder();
        handleShowOrderPlaced();
    };

    if(!data){
        return <div>Loading...</div>
    }

    return (
        <>
            <Link className="btn btn-primary me-2" onClick={handleShowOrder}>
                Buy Now
            </Link>
            <Modal
                show={showOrder}
                onHide={handleCloseOrder}
                backdrop="static"
                keyboard={false}
                size="lg"
                style={{ maxWidth: '100%' }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Order Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                                        <div className="col-md-4">
                                            <img src={data.imageURL} alt='...' height="200px" width="160px" />
                                        </div>
                                        <div className="col-md-8">
                                            <h3>{data.productName}</h3>
                                            <p className='order-body'>
                                                Description :{data.description}
                                            </p>
                                            <h6>Rs : {data.price}</h6>
                                            <p>Number Of products : {stock}</p>
                                            <h5>Total Value : {amount}</h5>
                                        </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrder}>Cancel</Button>
                    <Button variant="primary" onClick={handleOrderPlace}>Order Placed</Button>
                </Modal.Footer>
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
                    <h3>Continue shopping and enjoy it 🎉</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className='p-2 w-50 rounded-pill' onClick={handleCloseOrderPlaced}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


// const OrderPlaced = () => {
//     const [showOrder, setShowOreder] = useState(false);
//     const handleCloseConfirm = () => setShowOreder(false);
//     const handleShowOreder = () => setShowOreder(true);

//     return (
//         <>
//             <Button variant="primary" onClick={handleShowOreder}>
//                 Order Placed
//             </Button>

//             <Modal show={showOrder} onHide={handleCloseConfirm} backdrop="static"
//                 keyboard={false}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>
//                         Ordered 😍
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <center><img src='https://t4.ftcdn.net/jpg/05/52/36/59/360_F_552365973_sS3KeyOHzwMeILRwLiWGCKh8oC0T2400.jpg' alt='...' height="auto" width="auto" /></center>
//                     <h4>
//                         Your Order Will Be Successfully Placed 🎁
//                     </h4>
//                     <h3>
//                         continue Shop it and Enjoy it 🎉
//                     </h3>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="primary" className='p-2 w-50 rounded-pill' onClick={handleCloseConfirm}>
//                         Okay
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }

export default Order
// export { OrderPlaced }