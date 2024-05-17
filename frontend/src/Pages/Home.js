import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css"
import ReactStarRatings from 'react-star-ratings';
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../Componets/Header'
import Footer from '../Componets/Footer'
import SearchBar from '../Componets/SearchBar'
import '../Css/carousel.css'
import '../Css/home.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddToCart from '../Componets/AddToCart';



const SwipSlide = () => {
    return (
        <>
            <section className='react-carousel'>
                <Container fluid>
                    <Carousel data-bs-theme="dark">
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="https://cdn.educba.com/academy/wp-content/uploads/2016/03/Ecommerce-Shopping-Websites.jpg"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h5></h5>
                                <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20230810093641/Free-Shipping--Shopbop.webp"
                                alt="Second slide"
                            />
                            <Carousel.Caption>
                                <h5></h5>
                                <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100 carousel-img"
                                src="https://www.blog.sagmart.com/wp-content/uploads/2013/07/online-mobile-shopping.jpg"
                                alt="Third slide"
                            />
                            <Carousel.Caption>
                                <h5></h5>
                                <p></p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </section>
        </>
    )
}


const Home = () => {

    let [data, setdata] = useState([])
    let [user,setUser] = useState(null)
   
    useEffect(() => {

        let value = localStorage.getItem("userId")

        if(value){
            setUser(value)
        }


        axios.get("http://localhost:3001/products")
            .then((result) => {
                setdata(result.data.products)
            })
    }, [])

    

    return (
        <>
            <Header />
            <section className='react-home'>
                <div className='search-bar'>
                    <SearchBar />
                </div>
                <SwipSlide />
                <Container>
                    <Row>
                        <h2>Welcome To Shop Now !</h2><br />
                    </Row>
                    <Row xs={1} sm={2} md={2} lg={3}>
                        {
                            data.map((item,index) => (
                                        <Col>
                                            <div className='react-product-card'>
                                                <div className="card p-4 m-3" >
                                                    <img src={item.imageURL} className="card-img-top p-3" alt="loating..." height="130px" width="10px" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.productName}</h5>
                                                    </div>
                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">{item.description}</li>
                                                        <li className="list-group-item star-rating"> <ReactStarRatings
                                                            rating={item.rating}
                                                            starRatedColor="yellow"
                                                            numberOfStars={5}
                                                            starDimension="30px"
                                                            name='rating' />
                                                        </li>
                                                        <li className='list-group-item'><h6>Rs : {item.price}</h6></li>
                                                    </ul>
                                                    <div className="card-body">
                                                        {/* <Link to={`/cart/${item._id}`} className='btn btn-outline-primary me-2'>Add to cart</Link> */}
                                                        <AddToCart productId={item._id} userId={user} />
                                                        <Link to={`/online-shopping/project-in/93.61.06.00/10960/product/${item._id}`} className='btn btn-primary'>View Detail</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                            ))
                        }
                    </Row>
                </Container>
            </section>
            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home
export { SwipSlide } 
