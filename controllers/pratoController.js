const db = require("../config/firebase");
const path = require("path");
const fs = require("fs");

// Criar prato
exports.createPrato = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    let { ingredientes } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;

    // Parse ingredientes se vier como string
    if (typeof ingredientes === "string") {
      try {
        ingredientes = JSON.parse(ingredientes);
      } catch (e) {
        return res.status(400).json({ error: "Ingredientes inválidos." });
      }
    }

    if (!Array.isArray(ingredientes)) {
      return res.status(400).json({ error: "Ingredientes devem ser um array." });
    }

    const novoPrato = {
      nome,
      descricao,
      imagem_url,
      ingredientes: [...new Set(ingredientes.map(i => i.trim()))]
    };

    const doc = await db.collection("pratos").add(novoPrato);
    res.status(201).json({ id: doc.id, ...novoPrato });

  } catch (error) {
    console.error("Erro ao criar prato:", error);
    res.status(500).json({ error: "Erro ao criar prato." });
  }
};

// Obter todos os pratos
exports.getAllPratos = async (req, res) => {
  try {
  const snapshot = await db.collection('pratos').get();
  const pratos = snapshot.docs.map(doc => doc.data());
  res.json(pratos);
} catch (error) {
  console.error("Erro ao buscar pratos:", error);
  res.status(500).json({ error: 'Erro ao buscar pratos.' });
}

};

// Obter prato por nome
exports.getPratoByNome = async (req, res) => {
  try {
    const nomeBuscado = req.params.nome.toLowerCase();
    const snapshot = await db.collection("pratos").get();
    const encontrados = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(p => p.nome.toLowerCase().includes(nomeBuscado));

    if (encontrados.length === 0) {
      return res.status(404).json({ message: "Prato não encontrado." });
    }

    res.json(encontrados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar prato por nome." });
  }
};

// Obter prato por ID
exports.getPratoById = async (req, res) => {
  try {
    const doc = await db.collection("pratos").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Prato não encontrado." });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar prato por ID." });
  }
};

// Atualizar prato
exports.updatePrato = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    let { ingredientes } = req.body;
    const dadosAtualizados = {};

    if (nome) dadosAtualizados.nome = nome;
    if (descricao) dadosAtualizados.descricao = descricao;
    if (ingredientes) {
      if (typeof ingredientes === "string") {
        ingredientes = JSON.parse(ingredientes);
      }
      if (!Array.isArray(ingredientes)) {
        return res.status(400).json({ error: "Ingredientes devem ser array." });
      }
      dadosAtualizados.ingredientes = [...new Set(ingredientes.map(i => i.trim()))];
    }

    if (req.file) {
      dadosAtualizados.imagem_url = `/uploads/${req.file.filename}`;
    }

    await db.collection("pratos").doc(req.params.id).update(dadosAtualizados);
    res.json({ message: "Prato atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar prato." });
  }
};

// Deletar prato
exports.deletePrato = async (req, res) => {
  try {
    const docRef = db.collection("pratos").doc(req.params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Prato não encontrado." });
    }

    // Se tiver imagem local, tenta remover o ficheiro
    const dados = doc.data();
    if (dados.imagem_url && fs.existsSync(`.${dados.imagem_url}`)) {
      fs.unlinkSync(`.${dados.imagem_url}`);
    }

    await docRef.delete();
    res.json({ message: "Prato deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar prato." });
  }
};
