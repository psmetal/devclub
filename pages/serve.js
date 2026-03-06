import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/comments', async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  const { email, name, comentario, avaliacao } = req.body;
  const newComment = await prisma.comment.create({
    data: {
      email,
      name,
      comentario,
      avaliacao,
    },
  });
  res.json(newComment);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
