import { Link } from "react-router-dom"

const Checkout = (props) => {
    let total = 0
    props.cart.forEach((c) => {
        total += c.items[0].price.regular * c.quantity
    })
    total = total.toFixed(2)

    const deleteCart = (id) => {props.deleteItems('all')}

    return (
    <section>
        <div className="total">
            <h1>Total:</h1>
            <h3>{total}</h3>
            <button className="form-button" onClick={deleteCart}>Empty</button>
        </div>
        {props.cart.map((c) => {
            const add = () => {props.editCart(c.productId, "+")}
            const sub = () => {props.editCart(c.productId, "-")}
            const del = () => {props.deleteItems(c.productId)}
            return (
                <div key={c._id} className="item">
                    <div className="itemcontent">
                        <Link to={`/shop/products/${c.productId}`}>
                            <h2 className="cart-product-name">{c.description}</h2>
                        </Link>
                        <img className="product" src={c.images[0].sizes[0].url} alt={"thing"}/>
                        <h3 className="index-price">${c.items[0].price.regular}</h3>
                        <div>
                            <button className="form-button" onClick={sub}>-</button>
                            <h4>{c.quantity}</h4>
                            <button className="form-button" onClick={add}>+</button>
                            <button className="form-button" onClick={del}>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })}
    </section>
    )
}

export default Checkout
