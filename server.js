require("dotenv/config");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

app.get("/api/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
});

app.post("/api/comments", async (req, res) => {
  try {
    const { email, name, comentario, avaliacao } = req.body;

    if (!email || !name || !comentario) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" });
    }

    const newComment = await prisma.comment.create({
      data: {
        email,
        name,
        comentario,
        avaliacao: typeof avaliacao === "number" ? avaliacao : null,
      },
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Erro ao salvar comentário:", error);
    res.status(500).json({ error: "Erro ao salvar comentário" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
