
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const products = [
  { id: 1, name: 'Basic Subscription', description: 'For one user', price: 4.99, icon: '🥉' },
  { id: 2, name: 'Gold Subscription', description: 'Share with family', price: 9.99, icon: '🥇' },
  { id: 3, name: 'Premium Subscription', description: 'Share with the world', price: 12.99, icon: '🏆' },
  { id: 4, name: 'EZ Tech Hat', price: 16.99, image: '/ez-tech-hat.png' },
  { id: 8, name: 'EZ Tech T-Shirt', price: 25.99, icon: '👕' },
  { id: 5, name: 'EZ Tech Necklace', price: 11.99, image: '/ez-tech-necklace.png' },
  { id: 6, name: 'EZ Tech Shoes', price: 39.99, image: '/ez-tech-shoes.png' },
  { id: 7, name: 'EZ Tech Case', price: 8.99, icon: '📱' },
]

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('streamlist-shopping-cart') || '[]')
    const validNames = products.map((product) => product.name)

    return saved.filter((item) => validNames.includes(item.name))
  })

  useEffect(() => {
    localStorage.setItem('streamlist-shopping-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id)

      if (existing) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    )
  }

  const updateQuantity = (id, amount) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  )

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  )

  return (
    <main className="store-page">
      <h2>StreamList Store</h2>
      <p className="store-description">
        Explore subscriptions and EZ Tech merchandise.
      </p>

      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            ) : (
              <span className="product-icon">{product.icon}</span>
            )}

            <h3>{product.name}</h3>

            {product.description && <p>{product.description}</p>}

            <p className="product-price">${product.price.toFixed(2)}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>

      <section className="shopping-cart">
        <h2>Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>${item.price.toFixed(2)} each</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>
                  +
                </button>
              </div>

              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}

        <hr />

        <h3>
          Items in cart: {totalItems} | Total: ${totalPrice.toFixed(2)}
        </h3>

        <Link
          to="/credit-cards"
          className="checkout-button"
          aria-disabled={cartItems.length === 0}
          onClick={(event) => {
            if (cartItems.length === 0) event.preventDefault()
          }}
        >
          Checkout
        </Link>
      </section>
    </main>
  )
}

export default Cart
