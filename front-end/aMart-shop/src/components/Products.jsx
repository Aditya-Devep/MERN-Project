import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])

    const FetchProducts = async () => {
        try {
            const result = await axios.get('http://localhost:4000/api/getproducts')
            console.log(result.data)
            console.log('Products Fetched Successfully...')

            setProducts(result.data.data)
        }
        catch (err) {
            console.log(err)
            console.log('Failed to Fetch Products...')
        }

    }

    useEffect(() => {
        FetchProducts()
    }, [])

    return (
        <>
            <h1 className='my-2 text-center  fw-bold text-primary p-3'>Products Page </h1>

            <div className="container">
                <div className="row">
                    {
                        products.map((val, index) => {
                            return (
                                <>
                                    <div className="col-md-4 my-3" key={val.id}>
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title text-truncate" title={val.title} 
                                                style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>{val.title}</h3>
                                            </div>

                                            <div className="card-body text-center">
                                                <img src={val.image} alt="Product_Image"  className='img-fluid' style={{height:100, width:120}}/>
                                                <h6 className='my-3 text-success fw-bold'>Price :${val.price}</h6>
                                                <h6 className='my-3 text-dark fw-bold'>Category : {val.category}</h6>
                                            </div>

                                            <div className="footer text-center">
                                            <NavLink to={`/details/${val.id}`} ><button  className='btn btn-primary px-4 my-3 fw-bold my-2'>See Details</button> </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Products
