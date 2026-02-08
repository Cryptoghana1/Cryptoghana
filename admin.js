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
          <input
            value="${DATA.rates[c].buy}"
            onchange="DATA.rates['${c}'].buy = this.value"
          />

          <div class="small">Sell rate</div>
          <input
            value="${DATA.rates[c].sell}"
            onchange="DATA.rates['${c}'].sell = this.value"
          />
        </div>
      `).join("")}

      <button onclick="save()">Save</button>
    </div>
  `;
}

function save() {
  saveData(DATA);
  alert("Saved");
}
