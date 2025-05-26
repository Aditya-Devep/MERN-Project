import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const Details = () => {

    var nav = useNavigate() 

    var { id } = useParams()

    const [products, setProducts] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating_rate: '',
        rating_count: ''

    })

     
    const AddtoCart = async(id) =>{
        try{
            alert('Added to cart')
            const result = await axios.post(`http://localhost:4000/api/addtocart/${id}`)

            console.log(result[0])

            console.log('Added to Cart')

            nav('/addtocart')
        }
        catch(err)
        {
            console(err)
            console.log('Failed to add to cart')

        }

    }

    // useEffect(()=>{
    //     Addtocart()
    // },[])

    const FetchProduct = async () => {
        try {
            const result = await axios.get(`http://localhost:4000/api/details/${id}`)

            console.log(result.data.data[0])

            console.log('Products Fetched Successfully...')

            setProducts(result.data.data[0])
        }
        catch (err) {
            console.log(err)
            console.log('Failed to Fetch Products...')
        }
    }

    useEffect(() => {
        FetchProduct()
    }, [])

    return (
        <>
            <div className="container my-5">
                <div className="card shadow p-4">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <img src={products.image} alt={products.title} className="img-fluid"
                                style={{ maxHeight: '300px', objectFit: 'contain' }}/>
                        </div>
                        <div className="col-md-8">
                            <h3>{products.title}</h3>
                            <h5 className="text-success fw-bold">${products.price}</h5>
                            <p className="text-muted">{products.category}</p>
                            <p>{products.description}</p>
                            <p>
                                <strong>Rating:</strong> {products.rating_rate} ⭐ ({products.rating_count} reviews)
                            </p>
                             <button onClick={()=> AddtoCart(products.id) } className="btn btn-primary mt-3">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Details
