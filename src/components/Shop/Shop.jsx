import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getProducts } from '../../apiServices'
import ProductCard from './ProductCard'

import { setProductToCartList } from '../actionCreators'



const Shop = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getProducts().then((res) => {
      if (res) {
        setProducts(res.data.products)
      }
    })
  }, [])

  const handleAddToCart = (item, quantity) => {
    item['quantity'] = quantity
    item['key'] = item._id
    dispatch(setProductToCartList(item))
    toast.success('Item successfully added into cart', {
      position: toast.POSITION.TOP_CENTER
    })
  }

  const filteredList = products.filter(item => item.title.toUpperCase().includes(search.toUpperCase()) || item.description.toUpperCase().includes(search.toUpperCase()))

  return (
    <>
      <img
        src={require(`../../assets/hero.png`).default}
        alt="Loading..."
        className="img-fluid"
      />
      <div className="row m-0">
        <div className="col-12 text-left">
          <div className="row px-md-5 px-3 my-5">
            <div className="col-12 px-0  text-center d-flex justify-content-center">
              <div className="d-flex mx-md-5 mx-2 px-0 fontSearch">
                <input
                  type="text"
                  className="search"
                  value={search}
                  placeholder="Search Your Product"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fad fa-search search-icon" />
              </div>
            </div>
          </div>
          <div className="row m-0 p-md-5 p-0">
            {
              products && products.length ? filteredList.map((item, i) => (
                <ProductCard key={i} product={item} i={i} handleAddToCart={handleAddToCart} />
              ))
                :
                <h6>No Items in Store please <Link to="/add">Add Product</Link></h6>
            }
          </div>
        </div>
      </div>
    </>
  )
}


export default Shop