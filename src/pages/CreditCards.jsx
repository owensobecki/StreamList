
import { useState } from 'react'

function CreditCards() {
  const [cards, setCards] = useState(() => {
    return JSON.parse(localStorage.getItem('streamlist-cards') || '[]')
  })

  const [cardholder, setCardholder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiration, setExpiration] = useState('')
  const [billingZip, setBillingZip] = useState('')
  const [message, setMessage] = useState('')

  const formatCardNumber = (value) =>
    value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')

  const handleSubmit = (event) => {
    event.preventDefault()

    const digits = cardNumber.replace(/\D/g, '')

    if (digits.length !== 16) {
      setMessage('Please enter a 16-digit demo card number.')
      return
    }

    const newCard = {
      id: Date.now(),
      cardholder,
      lastFour: digits.slice(-4),
      expiration,
      billingZip,
    }

    const updatedCards = [...cards, newCard]

    localStorage.setItem('streamlist-cards', JSON.stringify(updatedCards))
    setCards(updatedCards)

    setCardholder('')
    setCardNumber('')
    setExpiration('')
    setBillingZip('')
    setMessage('Demo payment method saved successfully!')
  }

  const removeCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id)
    localStorage.setItem('streamlist-cards', JSON.stringify(updatedCards))
    setCards(updatedCards)
  }

  return (
    <main className="payment-page">
      <header className="payment-heading">
        <h2>Payment Methods</h2>
        <p>Manage your StreamList payment information.</p>
      </header>

      <div className="payment-layout">
        <section className="payment-form-card">
          <h3>Add a Payment Method</h3>
          <p className="payment-note">
            Classroom demonstration only. Use fictional card information.
          </p>

          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-field">
              <label htmlFor="cardholder">Cardholder Name</label>
              <input
                id="cardholder"
                type="text"
                placeholder="Name on card"
                value={cardholder}
                onChange={(e) => setCardholder(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="expiration">Expiration Date</label>
                <input
                  id="expiration"
                  type="month"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="billingZip">Billing ZIP Code</label>
                <input
                  id="billingZip"
                  type="text"
                  inputMode="numeric"
                  placeholder="ZIP Code"
                  value={billingZip}
                  onChange={(e) => setBillingZip(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  maxLength={5}
                  required
                />
              </div>
            </div>

            <button type="submit" className="save-card-button">
              Save Payment Method
            </button>

            {message && <p className="payment-message" role="status">{message}</p>}
          </form>
        </section>

        <section className="saved-payment-section">
          <h3>Saved Payment Methods</h3>

          {cards.length === 0 ? (
            <p className="empty-payment">You haven't saved any payment methods yet.</p>
          ) : (
            <div className="saved-card-list">
              {cards.map((card) => (
                <article className="saved-card" key={card.id}>
                  <div className="saved-card-top">
                    <span>STREAMLIST</span>
                    <span>DEMO CARD</span>
                  </div>

                  <p className="saved-card-number">
                    •••• •••• •••• {card.lastFour}
                  </p>

                  <div className="saved-card-details">
                    <div>
                      <small>CARDHOLDER</small>
                      <p>{card.cardholder}</p>
                    </div>
                    <div>
                      <small>EXPIRES</small>
                      <p>{card.expiration}</p>
                    </div>
                  </div>

                  <button
                    className="remove-card-button"
                    onClick={() => removeCard(card.id)}
                  >
                    Remove Card
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default CreditCards
