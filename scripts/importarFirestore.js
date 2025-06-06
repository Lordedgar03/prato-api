const admin = require("firebase-admin");
const path = require("path");
const pratos = require("../pratos.json");
const ingredientes = require("../ingredientes.json");

const serviceAccount = require("../firebaseKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importarDados() {
  try {
    // Importar ingredientes
    for (const nome of ingredientes) {
      await db.collection("ingredientes").add({ nome });
      console.log(`Ingrediente adicionado: ${nome}`);
    }

    // Importar pratos
    for (const prato of pratos) {
      await db.collection("pratos").add(prato);
      console.log(`Prato adicionado: ${prato.nome}`);
    }

    console.log("✅ Importação concluída com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao importar dados:", err);
    process.exit(1);
  }
}

importarDados();
