const app = document.getElementById("app");
const WHATSAPP = "https://wa.me/233508579356";
let DATA = getData();
let flow = "", crypto = "";

renderHome();

function renderHome() {
  app.innerHTML = `
    <div class="card">
      <h2>Cryptoghana</h2>
      <button onclick="start('buy')">Buy Crypto</button>
      <button onclick="start('sell')">Sell Crypto</button>
    </div>`;
}

function start(type) {
  flow = type;
  app.innerHTML = `
    <div class="card">
      <h2>Select Crypto</h2>
      ${Object.keys(DATA.rates).map(c =>
        `<button onclick="selectCrypto('${c}')">${c}</button>`
      ).join("")}
    </div>`;
}

function selectCrypto(c) {
  crypto = c;
  flow === "buy" ? buyForm() : sellForm();
}

function buyForm() {
  app.innerHTML = `
    <div class="card">
      <h2>Buy ${crypto}</h2>
      <p class="small">Rate: ${DATA.rates[crypto].buy} GHS</p>
      <input placeholder="Your Wallet Address" />
      <input type="number" placeholder="Amount" />
      <button onclick="payment()">Next</button>
    </div>`;
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

function sellForm() {
  app.innerHTML = `
    <div class="card">
      <h2>Sell ${crypto}</h2>
      <p>${DATA.wallets[crypto]}</p>
      <button onclick="sendWhatsApp('I have sent crypto')">I HAVE SENT CRYPTO</button>
    </div>`;
}

function sendWhatsApp(text) {
  window.open(`${WHATSAPP}?text=${encodeURIComponent(text + " - " + crypto)}`);
}
