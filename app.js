const app = document.getElementById("app");
const WHATSAPP = "https://wa.me/233508579356";

let DATA = getData();
let flow = "";
let crypto = "";
let order = {};

renderHome();

/* ---------- HOME ---------- */

function renderHome() {
  const prices = Object.keys(DATA.rates).map(c => `
    <div class="price-box">
      <strong>${c}</strong>
      <p>Buy: ${DATA.rates[c].buy} GHS</p>
      <p>Sell: ${DATA.rates[c].sell} GHS</p>
    </div>
  `).join("");

  app.innerHTML = `
    <div class="card">
      <h2>Cryptoghana</h2>

      <div class="price-grid">${prices}</div>

      <button onclick="start('buy')">Buy Crypto</button>
      <button onclick="start('sell')">Sell Crypto</button>
    </div>
  `;
}

/* ---------- START ---------- */

function start(type) {
  flow = type;
  crypto = "";
  order = {};

  app.innerHTML = `
    <div class="card">
      <h2>Select Crypto</h2>
      ${Object.keys(DATA.rates).map(c =>
        `<button onclick="selectCrypto('${c}')">${c}</button>`
      ).join("")}
    </div>
  `;
}

function selectCrypto(c) {
  crypto = c;
  flow === "buy" ? buyForm() : sellForm();
}

/* ---------- BUY FLOW ---------- */

function buyForm() {
  app.innerHTML = `
    <div class="card">
      <h2>Buy ${crypto}</h2>
      <p class="small">Rate: ${DATA.rates[crypto].buy} GHS</p>

      <input id="wallet" placeholder="Your Wallet Address" />
      <input id="amount" type="number" placeholder="Amount" min="1" />

      <button onclick="validateBuy()">Next</button>
    </div>
  `;
}

function validateBuy() {
  const wallet = document.getElementById("wallet").value.trim();
  const amount = document.getElementById("amount").value;

  if (!wallet) return alert("Enter wallet address");
  if (!amount || amount <= 0) return alert("Enter valid amount");

  order.wallet = wallet;
  order.amount = amount;

  payment();
}

function payment() {
  app.innerHTML = `
    <div class="card">
      <h2>Select Payment Method</h2>

      <button onclick="showPaymentDetails('momo')">MTN MoMo</button>
      <button onclick="showPaymentDetails('vodafone')">Vodafone Cash</button>
      <button onclick="showPaymentDetails('bank')">Bank Transfer</button>
    </div>
  `;
}

function showPaymentDetails(type) {
  let details = "";

  if (type === "momo") {
    details = `MTN MoMo<br>${DATA.payments.momo.number}<br>${DATA.payments.momo.name}`;
  }

  if (type === "vodafone") {
    details = `Vodafone Cash<br>${DATA.payments.vodafone.number}<br>${DATA.payments.vodafone.name}`;
  }

  if (type === "bank") {
    details = `${DATA.payments.bank.bank}<br>${DATA.payments.bank.name}<br>${DATA.payments.bank.number}`;
  }

  order.payment = type;

  app.innerHTML = `
    <div class="card">
      <h2>Make Payment</h2>
      <p>${details}</p>

      <button onclick="sendOrderToWhatsApp('payment')">
        I HAVE SENT PAYMENT
      </button>
    </div>
  `;
}

/* ---------- SELL FLOW ---------- */

function sellForm() {
  app.innerHTML = `
    <div class="card">
      <h2>Sell ${crypto}</h2>

      <p><strong>Send to:</strong></p>
      <p>${DATA.wallets[crypto]}</p>

      <button onclick="sellDetails()">I HAVE SENT CRYPTO</button>
    </div>
  `;
}

function sellDetails() {
  app.innerHTML = `
    <div class="card">
      <h2>Your Payment Details</h2>

      <input id="name" placeholder="Your Name" />
      <input id="pay" placeholder="MoMo / Bank Number" />

      <button onclick="validateSell()">Submit</button>
    </div>
  `;
}

function validateSell() {
  const name = document.getElementById("name").value.trim();
  const pay = document.getElementById("pay").value.trim();

  if (!name) return alert("Enter your name");
  if (!pay) return alert("Enter payment details");

  order.name = name;
  order.pay = pay;

  sendOrderToWhatsApp('crypto');
}

/* ---------- WHATSAPP SUMMARY ---------- */

function sendOrderToWhatsApp(type) {
  let message = `
NEW ${flow.toUpperCase()} ORDER

Crypto: ${crypto}
Rate: ${flow === 'buy' ? DATA.rates[crypto].buy : DATA.rates[crypto].sell} GHS
`;

  if (flow === "buy") {
    message += `
Amount: ${order.amount}
Wallet: ${order.wallet}
Payment: ${order.payment}
Status: I HAVE SENT PAYMENT
`;
  } else {
    message += `
Sender Name: ${order.name}
Payment Info: ${order.pay}
Status: I HAVE SENT CRYPTO
`;
  }

  window.open(`${WHATSAPP}?text=${encodeURIComponent(message)}`);
}
