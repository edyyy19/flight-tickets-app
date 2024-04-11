// ====================== DATA BASE ======================
const ticketsDetails = [
  {
    id: 1,
    departureDate: 'Friday 26 December',
    price: 400,
    originCity: 'Bucharest',
    destinationCity: 'Paris',
    quantity: 0,
  },
  {
    id: 2,
    departureDate: 'Monday 19 January',
    price: 359.99,
    originCity: 'Praga',
    destinationCity: 'London',
    quantity: 0,
  },
  {
    id: 3,
    departureDate: 'Wednesday 11 July',
    price: 515.35,
    originCity: 'Roma',
    destinationCity: 'Cluj-Napoca',
    quantity: 0,
  },
  {
    id: 4,
    departureDate: 'Thursday 27 May',
    price: 1005.05,
    originCity: 'Bucharest',
    destinationCity: 'Chicago',
    quantity: 0,
  },
];
// =======================================================
// ====================== TICKETS PREVIEW ======================
const ticketsGlobalContainer = document.querySelector(
  '.tickets-global-container'
);

for (let i = 0; i < ticketsDetails.length; i++) {
  const ticketsContainer = document.createElement('div');
  ticketsContainer.classList.add('tickets-container');

  ticketsContainer.innerHTML = `

        <div class="tickets-departure">
          <span class="departure">DEPARTURE:</span>
          <span class="date">${ticketsDetails[i].departureDate}</span>
        </div>
        <div class="tickets-details">
          <div class="tickets-details-price-per-adult">
            <span class="tickets-details-price">$${ticketsDetails[i].price}</span>
            <span class="tickets-details-per-adult">Price per adult</span>
          </div>
          <div class="tickets-details-flight-details">
            <span class="tickets-details-flight-city">${ticketsDetails[i].originCity}</span>
            
            <div class="tickets-details-icon"><i class="fa-solid fa-plane"></i></div>
            <span class="tickets-details-flight-city">${ticketsDetails[i].destinationCity}</span>
          </div>
          <div class="tickets-details-buttons">
            <button class="tickets-buy-minus" data-flight-id="${ticketsDetails[i].id}">-</button>
            <span class="tickets-counter" data-flight-id="${ticketsDetails[i].id}">${ticketsDetails[i].quantity}</span>
            <button class="tickets-buy-plus" data-flight-id="${ticketsDetails[i].id}">+</button>
          </div>
        </div>
    
`;
  ticketsGlobalContainer.appendChild(ticketsContainer);
}
const resetQuantityOnRemoveButton = (e) => {
  const flightId = e.target.getAttribute('data-flight-id');
  const flightIndex = ticketsDetails.findIndex(
    (element) => element.id === parseInt(flightId)
  );
};
// ===== TICKETS ADD/REMOVE =====
// ===== PLUS ONE TICKET =====
const plusOneTicket = document.querySelectorAll('.tickets-buy-plus');
const addOneTicket = (e) => {
  const flightId = e.target.getAttribute('data-flight-id');
  const flightIndex = ticketsDetails.findIndex(
    (element) => element.id === parseInt(flightId)
  );
  ticketsDetails[flightIndex].quantity =
    ticketsDetails[flightIndex].quantity + 1;

  e.target.previousElementSibling.innerText =
    ticketsDetails[flightIndex].quantity;

  if (ticketsDetails[flightIndex].quantity > 0) {
    const colorMinusButton = document.querySelector(
      `.tickets-buy-minus[data-flight-id="${ticketsDetails[flightIndex].id}"]`
    );
    colorMinusButton.style.backgroundColor = '#2c2a4a';
    colorMinusButton.style.color = 'white';
  }
  return false;
};
// VARIANTA 1:
// for (let i = 0; i < plusOneTicket.length; i++) {
//   plusOneTicket[i].addEventListener('click', addOneTicket);
// }

// VARIANTA 2
plusOneTicket.forEach((button) => {
  button.addEventListener('click', (e) => {
    addOneTicket(e);
    checkoutTicketsTotalPreviewAdd(e);
  });
});
//============================
// ===== MINUS ONE TICKET =====
const minusOneTicket = document.querySelectorAll('.tickets-buy-minus');

const removeOneTicket = (e) => {
  const flightId = e.target.getAttribute('data-flight-id');
  const flightIndex = ticketsDetails.findIndex(
    (element) => element.id === parseInt(flightId)
  );
  if (ticketsDetails[flightIndex].quantity > 0) {
    ticketsDetails[flightIndex].quantity =
      ticketsDetails[flightIndex].quantity - 1;

    e.target.nextElementSibling.innerText =
      ticketsDetails[flightIndex].quantity;
  } else {
    return false;
  }

  if (ticketsDetails[flightIndex].quantity < 1) {
    const colorMinusButton = document.querySelector(
      `.tickets-buy-minus[data-flight-id="${ticketsDetails[flightIndex].id}"]`
    );
    colorMinusButton.style.backgroundColor = '#e7e7e7';
    colorMinusButton.style.color = '#907ad6';
  }
  return false;
};
minusOneTicket.forEach((button) => {
  button.addEventListener('click', (e) => {
    removeOneTicket(e);
    removeOneTicketFromCheckout(e);
  });
});

// ===== CHECKOUT TICKETS =====
const ticketsGlobalCheckoutContainer = document.querySelector(
  '.tickets-global-checkout-container'
);

// de terminat de adaugat in checkout total biletele adaugate si totalul lor

const checkoutTicketsTotalPreviewAdd = (e) => {
  const flightId = e.target.getAttribute('data-flight-id');
  const flightIndex = ticketsDetails.findIndex(
    (element) => element.id === parseInt(flightId)
  );
  if (ticketsDetails[flightIndex].quantity > 1) {
    document.querySelector(
      `.tickets-checkout-quantity[data-flight-id="${ticketsDetails[flightIndex].id}"]`
    ).innerText = ticketsDetails[flightIndex].quantity;

    // de updatat pretul cand " - " e apasat
    document.querySelector(
      `.tickets-checkout-total[data-flight-id="${ticketsDetails[flightIndex].id}"]`
    ).innerText = `$${parseFloat(
      ticketsDetails[flightIndex].quantity * ticketsDetails[flightIndex].price
    ).toFixed(2)}`;
  } else {
    const ticketsCheckoutContainer = document.createElement('div');
    ticketsCheckoutContainer.classList.add('tickets-checkout-container');
    ticketsCheckoutContainer.setAttribute(
      'data-flight-id',
      `${ticketsDetails[flightIndex].id}`
    );

    ticketsCheckoutContainer.innerHTML = `
 
  
  <div  class="tickets-checkout-flight-details">
  <span class="tickets-checkout-flight">Flight:</span>
  <div class="tickets-checkout-flight-name">
            <span class="tickets-checkout-flight-name-origin">${ticketsDetails[flightIndex].originCity} -</span>
            <span class="tickets-checkout-flight-name-destination">${ticketsDetails[flightIndex].destinationCity} </span>
          </div>
</div>
<div>
<span class="tickets-checkout-quantity-text">Quantity:</span>
<span data-flight-id="${ticketsDetails[flightIndex].id}" class="tickets-checkout-quantity">${ticketsDetails[flightIndex].quantity}</span>
</div>
<span data-flight-id="${ticketsDetails[flightIndex].id}" class="tickets-checkout-total">$${ticketsDetails[flightIndex].price}</span>
<button data-flight-id="${ticketsDetails[flightIndex].id}" class="tickets-checkout-remove-btn"><i class="fa-solid fa-trash"></i></button>

  `;

    ticketsGlobalCheckoutContainer.appendChild(ticketsCheckoutContainer);
    ticketsCheckoutContainer
      .querySelector('.tickets-checkout-remove-btn')
      .addEventListener('click', () => {
        ticketsGlobalCheckoutContainer.removeChild(ticketsCheckoutContainer);
        const flightId = e.target.getAttribute('data-flight-id');
        const flightIndex = ticketsDetails.findIndex(
          (element) => element.id === parseInt(flightId)
        );
        ticketsDetails[flightIndex].quantity = 0;

        const ticketQuantity = document.querySelector(
          `span[data-flight-id="${ticketsDetails[flightIndex].id}"]`
        );
        ticketQuantity.innerText = 0;
        if (ticketsDetails[flightIndex].quantity < 1) {
          const colorMinusButton = document.querySelector(
            `.tickets-buy-minus[data-flight-id="${ticketsDetails[flightIndex].id}"]`
          );
          colorMinusButton.style.backgroundColor = '#e7e7e7';
          colorMinusButton.style.color = '#907ad6';
        }
        return false;
      });
  }
};

const checkoutRemoveButtonElement = document.querySelectorAll(
  '.tickets-checkout-remove-btn'
);

const removeOneTicketFromCheckout = (e) => {
  const flightId = e.target.getAttribute('data-flight-id');
  const flightIndex = ticketsDetails.findIndex(
    (element) => element.id === parseInt(flightId)
  );
  if (ticketsDetails[flightIndex].quantity === 0) {
    const x = document.querySelector(
      `.tickets-checkout-container[data-flight-id="${flightId}"]`
    );
    x.remove();
  } else {
    const y = document.querySelector(
      `.tickets-checkout-quantity[data-flight-id="${flightId}"]`
    );
    y.innerText = parseInt(y.innerText) - 1;
  }
  document.querySelector(
    `.tickets-checkout-total[data-flight-id="${ticketsDetails[flightIndex].id}"]`
  ).innerText = `$${parseFloat(
    ticketsDetails[flightIndex].quantity * ticketsDetails[flightIndex].price
  ).toFixed(2)}`;
};
