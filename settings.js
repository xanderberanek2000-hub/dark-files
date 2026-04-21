// settings.js — loads and saves settings via JSONBin
const BIN_ID = "69e7fcc8aaba882197237490";
const API_KEY = "$2a$10$yHUij.ZgeeK5AuvRygpW7eQ7SBoBxMaL6C9LP35yOfWtKTP4y39ze";
const BIN_URL = "https://api.jsonbin.io/v3/b/" + BIN_ID;

async function loadSettings() {
  try {
    const r = await fetch(BIN_URL + "/latest", {
      headers: { "X-Master-Key": API_KEY }
    });
    const d = await r.json();
    return d.record || {};
  } catch(e) { return {}; }
}

async function saveSettings(settings) {
  await fetch(BIN_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(settings)
  });
}
