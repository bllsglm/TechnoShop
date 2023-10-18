import { useNavigate, Link } from 'react-router-dom';
import { Row,Col, ListGroup, ListGroupItem,Image, Button,Card,Form, FormControl } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import Message from  "../components/Message";
import { useDispatch, useSelector } from 'react-redux';
import {useGetProductDetailsQuery} from '../slices/cartSlice'
import { addToCart, removoFromCart } from '../slices/cartSlice';


const CartScreen = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state)=> state.cart);
  const {cartItems} = cart;

  const addToCartHandler = async(product, qty) => {
      dispatch(addToCart({...product, qty}))
  }

  const removeFromCartHandler = async(id) => {
    dispatch(removoFromCart(id))
  }

  const checkOutHandler = () => {
    navigate('/login?redirect=/shipping');
  }

    return (
      <>
      <Row>
        <Col md={8}>
         <h1 style = {{marginBottom: '20px'}}>Shopping Cart</h1>
         {cartItems.length === 0 ? (
          <Message> 
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
         ) : (
          <ListGroup variant='flush' >
            {cartItems.map((item)=> (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2} >
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3} >
                    <Link to={`/product/${item._id}`}>{item.name} </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                  <FormControl
                      as ='select'
                      value = {item.qty}
                      onChange = {(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInstock).keys()].map((x)=>(
                          <option  key={x + 1} value = {x + 1}>
                            {x + 1}
                          </option>
                        ))}
                       
                      </FormControl>
                  </Col>
                  <Col>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item._id)}>
                      <FaTrash/>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
         ) }
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc,item)=> acc+item.qty,0)}) items
                </h2>
                ${cartItems.reduce((acc,item)=> acc +item.price*item.qty,0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>


      </>
    )
}

export default CartScreen