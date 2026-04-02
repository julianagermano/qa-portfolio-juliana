const fs = require("fs");
const path = require("path");

const schemasDir = path.join(__dirname, "..", "schemas");
const files = fs.readdirSync(schemasDir).filter(f => f.endsWith(".json"));

let ok = 0;
let fail = 0;

for (const f of files) {
  const p = path.join(schemasDir, f);
  try {
    JSON.parse(fs.readFileSync(p, "utf8"));
    console.log(`✅ OK: ${f}`);
    ok++;
  } catch (e) {
    console.log(`❌ ERRO: ${f}`);
    console.log(`   -> ${e.message}`);
    fail++;
  }
}

console.log(`\nResumo: ${ok} ok, ${fail} com erro`);
process.exit(fail ? 1 : 0);