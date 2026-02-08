const admin = document.getElementById("admin");
let DATA = getData();

/* Ensure default data is saved once */
if (!localStorage.getItem("DATA")) {
  saveData(DATA);
}

admin.innerHTML = `
  <div class="card">
    <h2>Admin Login</h2>
    <input id="pass" placeholder="Passcode" />
    <button onclick="login()">Enter</button>
  </div>
`;

function login() {
  if (document.getElementById("pass").value !== "STARMOB") {
    return alert("Wrong passcode");
  }
  renderAdmin();
}

function renderAdmin() {
  admin.innerHTML = `
    <div class="card">

      <h2>Rates (GHS)</h2>
      ${Object.keys(DATA.rates).map(c => `
        <div style="margin-bottom:16px">
          <strong>${c}</strong>

          <div class="small">Buy rate</div>
          <input value="${DATA.rates[c].buy}"
            onchange="DATA.rates['${c}'].buy=this.value" />

          <div class="small">Sell rate</div>
          <input value="${DATA.rates[c].sell}"
            onchange="DATA.rates['${c}'].sell=this.value" />
        </div>
      `).join("")}

      <h2>Wallet Addresses</h2>
      ${Object.keys(DATA.wallets).map(c => `
        <div style="margin-bottom:12px">
          <strong>${c}</strong>
          <input value="${DATA.wallets[c]}"
            onchange="DATA.wallets['${c}']=this.value" />
        </div>
      `).join("")}

      <h2>Payment Details</h2>

      <strong>MTN MoMo</strong>
      <input placeholder="Number"
        value="${DATA.payments.momo.number}"
        onchange="DATA.payments.momo.number=this.value" />
      <input placeholder="Name"
        value="${DATA.payments.momo.name}"
        onchange="DATA.payments.momo.name=this.value" />

      <strong>Vodafone Cash</strong>
      <input placeholder="Number"
        value="${DATA.payments.vodafone.number}"
        onchange="DATA.payments.vodafone.number=this.value" />
      <input placeholder="Name"
        value="${DATA.payments.vodafone.name}"
        onchange="DATA.payments.vodafone.name=this.value" />

      <strong>Bank</strong>
      <input placeholder="Bank name"
        value="${DATA.payments.bank.bank}"
        onchange="DATA.payments.bank.bank=this.value" />
      <input placeholder="Account name"
        value="${DATA.payments.bank.name}"
        onchange="DATA.payments.bank.name=this.value" />
      <input placeholder="Account number"
        value="${DATA.payments.bank.number}"
        onchange="DATA.payments.bank.number=this.value" />

      <button onclick="save()">Save</button>
    </div>
  `;
}


function save() {
  saveData(DATA);
  alert("Saved");
}
