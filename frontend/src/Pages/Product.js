import React, { Fragment, useEffect, useState } from 'react'
import Footer from '../Componets/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../Componets/Header'
import Card from 'react-bootstrap/Card';
import '../Css/product.css'
import { Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ReactStarRatings from 'react-star-ratings'
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import AddToCart from '../Componets/AddToCart';


const Product = () => {

  const { _id } = useParams()

  let nav = useNavigate()

  const id = new String(_id)

  const [data, setdata] = useState(null)
  let [user, setUser] = useState(null)
  const [stock, setStock] = useState(1);

  useEffect(() => {

    let value = localStorage.getItem("userId")

    if (value) {
      setUser(value)
    }

    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => {
        console.log(res.data)
        setdata(res.data)
      })

  }, [])


  const incrementStock = () => {
    if (stock < data.stockQuantity) {
      setStock(stock + 1);
    }
  };

  const decrementStock = () => {
    if (stock > 0) {
      setStock(stock - 1);
    }
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = stock * data.price;

    localStorage.setItem("productId",data._id)
    localStorage.setItem("stock",stock)
    localStorage.setItem("amount",amount)
    
    nav('/online-shopping/projct-in/93.61.06.09/buynow')
  };

  return (
    <>
      <Fragment>
        <Header />
        <section className='react-product'>
          <Container>
            <Row>
              <Card className="m-3">
                <Card.Header>Product Listing</Card.Header>
                <Card.Body>
                  <Card.Title>{data.productName}</Card.Title>
                  <Row>
                    {/* Column for the image */}
                    <div className="col-md-6">
                      <img src={data.imageURL} className="card-img-top p-3" alt="Product" height="300" />
                    </div>
                    {/* Column for the video */}
                    <div className="col-md-6 product-video">
                      <video width="100%" height="300" controls autoPlay>
                        <source src={data.video} type="video/mp4" />
                      </video>
                    </div>
                  </Row>
                  <Card.Text>
                    <div className="card p-4 m-3 border-0">
                      <div className="card-body">
                        <h5> <a href={data.video} style={{textDecoration: "none" }}>{data.video}</a></h5>
                        <p>
                          {data.description}
                        </p>
                        <Accordion>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header><h6>User Guidence</h6></Accordion.Header>
                            <Accordion.Body>
                              {data.userGuidence}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item border-0  star-rating">
                          <ReactStarRatings
                            rating={data.rating}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            starDimension="30px"
                            name='rating'
                          />
                        </li>
                        <li className='list-group-item border-0'><h6>Rs : {data.price}</h6></li>
                        <li className="list-group-item border-0">Available stock: {data.stockQuantity}</li>
                      </ul>
                      <div className='stock-value p-3'>
                        <button className='btn btn-primary border rounded-start w-0' onClick={decrementStock}>-</button>
                        <input type='text' value={stock} className='input-stock' readOnly />
                        <button className='btn btn-primary border rounded-start w-0' onClick={incrementStock}>+</button>
                      </div>
                      <div className="card-body">
                        <AddToCart productId={data._id} userId={user} />
                        {/* <Order value={data._id} amount={stock * data.price} stock={stock} /> */}
                        <button className='btn btn-primary' on onClick={handleSubmit}>Buy Now</button>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted"></Card.Footer>
              </Card>
            </Row>
          </Container>
        </section>
        <section>
          <Footer />
        </section>
      </Fragment >
    </>
  )
}

export default Product