import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";
// import { authState } from "../atom"
// import { useRecoilState } from "recoil"
// import { useNavigate } from "react-router-dom"

const Shop = (props) => {
    const URL = props.backend+'/shop'
    // State to hold our list of product
    const [product, setProduct] = useState(null);

    // function to get all products
    const getProduct = async () => {
        // make the api call
        await fetch(URL+'/products', {
            method: "get"
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            // set the state to the api data
            setProduct(data)
        })
    }

    // function to filter products
    const searchProduct = async (item) => {
        // make the post request to our API
        await fetch(URL+'/products', {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(item)
        }).then(function(response) {
            return response.json()
        }).then(function(search) {
            // update state for list of products
            setProduct(search);
        })
        
    };

    const [cart, setCart] = useState(null)
    
    const getCart = async () => {
        await fetch(URL+'/cart', {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "id": props.auth.id
            },
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            setCart(data)
        })
    }


    const updateCart = async (newCart) => {
        await fetch(URL+'/cart', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "id": props.auth.id
            },
            body: JSON.stringify({cart: newCart})
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            setCart(data)
        })
        .then(console.log(cart))
    }

    const addToCart = async (id, op) => {
        // get item data with searchProduct route
        await fetch(URL+'/products', {
            method:"post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({productId: id})
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            const item = data[0]
            return item
        }).then(function(item) {
            const newCart = cart
            // check item position in cart
           const pos = newCart.findIndex((thing) => {
               if (thing.productId === item.productId) {
                   return true
               }
           })
           // add new item or increment existing
           if (pos === -1) {
               item.quantity = 1
               newCart.push(item)
           } else {
               op === "+" ? 
               newCart[pos].quantity += 1 :
               newCart[pos].quantity -= 1
            }
            
            return newCart
        }).then(function(newCart) {
            updateCart(newCart)
        })
    }

    // const editCart = async (id, num) => {
        
    // }
    
    useEffect( () => {
        if (product === null) {getProduct()}
    }, [])

    return (
    <div>
        <Routes>
            <Route path="/products" element={
                <Index 
                    auth={props.auth}
                    product={product} 
                    getProduct={getProduct} 
                    searchProduct={searchProduct} 
                    cart={cart}
                    getCart={getCart}
                    addToCart={addToCart}
                />
            } />
            <Route path="/products/:id" element={
                <Show 
                    auth={props.auth}
                    cart={cart}
                    getCart={getCart}
                    updateCart={updateCart}
                />
            } />
        </Routes>
    </div>
    )
}

export default Shop