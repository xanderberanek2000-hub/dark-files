const _BIN = "69e7fcc8aaba882197237490";
const _KEY = "$2a$10$yHUij.ZgeeK5AuvRygpW7eQ7SBoBxMaL6C9LP35yOfWtKTP4y39ze";
const _URL = "https://api.jsonbin.io/v3/b/" + _BIN;

async function loadSettings() {
  try {
    const r = await fetch(_URL + "/latest", {
      headers: { "X-Master-Key": _KEY, "X-Bin-Meta": "false" }
    });
    if (!r.ok) return {};
    return await r.json();
  } catch(e) { return {}; }
}

async function saveSettings(data) {
  const r = await fetch(_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": _KEY
    },
    body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error("Save failed");
  return await r.json();
}
