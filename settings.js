const _BIN = "69e7fcc8aaba882197237490";
const _KEY = "$2a$10$yHUij.ZgeeK5AuvRygpW7eQ7SBoBxMaL6C9LP35yOfWtKTP4y39ze";
const _URL = "https://api.jsonbin.io/v3/b/" + _BIN;

async function loadSettings() {
  try {
    const r = await fetch(_URL + "/latest", {
      method: "GET",
      headers: {
        "X-Master-Key": _KEY,
        "X-Bin-Meta": "false"
      }
    });
    if (!r.ok) {
      console.warn("loadSettings failed:", r.status);
      return {};
    }
    const data = await r.json();
    // JSONBin v3 with X-Bin-Meta:false returns the record directly
    // but sometimes still wraps it
    if (data && typeof data === 'object' && data.record) return data.record;
    return data || {};
  } catch(e) {
    console.error("loadSettings error:", e);
    return {};
  }
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
  if (!r.ok) {
    const txt = await r.text();
    console.error("saveSettings failed:", r.status, txt);
    throw new Error("Save failed: " + r.status);
  }
  return await r.json();
}
