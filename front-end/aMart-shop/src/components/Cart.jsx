import axios from 'axios'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    var nav = useNavigate()
    
    const [cartItems, setcartItems] = useState([])
   

    const FetchCart = async () =>{

    try{

    const result  = await axios.get(`http://localhost:4000/api/cartdata`);

    console.log(result.data.data)
    console.log('Cart Data fetched')
    setcartItems(result.data.data)
    }
    catch(err)
    {
        console.log(err)
        console.log('failed to fetch cart data')
    }
}

    useEffect(()=>{
        FetchCart()
    },[])

    const RemoveProduct = async(cart_id) => {

      try{
        
         const result = await axios.delete(`http://localhost:4000/api/delete/${cart_id}`);
    
          console.log(result);
          console.log('Product Deleted...');

          const updatedCart = cartItems.filter((val) => val.cart_id !== cart_id);
          setcartItems(updatedCart);

          alert(`Product Deleted: ${id}`);

          nav('/addtocart');
      }
      catch(err)
      {
        console.log(err)
        console.log('Failed to Delete...')
      }
    }

  console.log(cartItems)


  return (
    <>

    <div className="container my-4">
      <h1 className="text-center fw-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">Your cart is empty.</div>
      ) : (
        <>
          <div className="row">
            {
                
            cartItems.map((val, index) => (
              <div className="col-md-6 mb-4" key={val.cart_id}>
                <div className="card h-100 shadow-sm">
                  <div className="row g-0">
                    <div className="col-md-4 text-center p-3">
                      <img
                        src={val.image}
                        alt={val.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: '120px' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{val.title}</h5>
                        <p className="card-text text-muted">{val.category}</p>
                        <p className="card-text">
                          <strong>Price:</strong> ${val.price} <br />
                        </p>
                        <button  onClick={() => {if (window.confirm('Are You Sure ?')) 
                            {RemoveProduct(val.cart_id); }}}
                         className='btn btn-danger fw-bold btn-sm'>Remove from Cart</button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end mt-4">
            <button className="btn btn-primary mt-2">Proceed to Checkout</button>
          </div>


        </>
      )}
    </div>
    </>
  )
}

export default Cart
