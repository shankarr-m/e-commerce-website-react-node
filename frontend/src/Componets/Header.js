import React from 'react'
import { Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faShop, faUser, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Nav, Navbar } from 'react-bootstrap'
import { Tooltip } from 'react-tooltip'

const Header = () => {

    let handleLinkClick = (e) =>{
        localStorage.clear()
    }

    return (
        <>
            <Tooltip anchorSelect=".my-anchor-element" place="bottom">
                Logout
            </Tooltip>
            <Tooltip anchorSelect=".my-anchor-element-home" place="bottom">
                Home
            </Tooltip>
            <Tooltip anchorSelect=".my-anchor-element-cart" place="bottom">
                Cart
            </Tooltip>
            <Tooltip anchorSelect=".my-anchor-element-about" place="bottom">
                About
            </Tooltip>
            <Navbar fixed='top' className="bg-body-tertiary " >
                <Container fluid>
                    <Navbar.Brand href="#">Ms</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className='h-auto t' />
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Item className='px-3'>
                            <Nav.Link href="/online-shopping/project-in/93.61.06.00/109601639/home" className='my-anchor-element-home'><FontAwesomeIcon icon={faShop} style={{ color: "#5583d3", fontSize: "20px" }} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='px-3'>
                            <Nav.Link href='/online-shopping/project-in/93.61.06.00/10960/cart' eventKey="link-1" className='my-anchor-element-cart'><FontAwesomeIcon icon={faCartShopping} style={{ color: "#5583d3", fontSize: "20px" }} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='px-3'>
                            <Nav.Link href='/' onClick={handleLinkClick}  eventKey="link-2" className="my-anchor-element"><FontAwesomeIcon icon={faUser} beatFade style={{ color: "#5583d3", fontSize: "20px" }} /></Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='px-3'>
                            <Nav.Link href='/online-shopping/projct-in/93.61.06.09/error' className='my-anchor-element-about'><FontAwesomeIcon icon={faCircleExclamation} style={{ color: "#5583d3", fontSize: "20px" }} /></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header