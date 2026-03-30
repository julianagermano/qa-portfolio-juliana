const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", "Auth_DummyJSON.postman_environment.json");
const schemasDir = path.join(__dirname, "..", "schemas");

const mapping = [
  { file: "login.response.200.schema.json", key: "schema_login_200" },
  { file: "login.response.401.schema.json", key: "schema_login_401" },
  { file: "error.response.default.schema.json", key: "schema_error_default" }
];

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function upsertVar(vars, key, value) {
  const idx = vars.findIndex(v => v.key === key);
  const entry = { key, value, type: "text", enabled: true };
  if (idx >= 0) vars[idx] = entry;
  else vars.push(entry);
}

const env = loadJson(envPath);
env.values = env.values || [];

for (const m of mapping) {
  const schemaPath = path.join(schemasDir, m.file);
  const schema = loadJson(schemaPath);
  upsertVar(env.values, m.key, JSON.stringify(schema));
}

fs.writeFileSync(envPath, JSON.stringify(env, null, 2), "utf8");
console.log("✅ Schemas sincronizados no environment com sucesso.");
``
