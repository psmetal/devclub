import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(comments);
    } catch (error) {
      console.error('Erro ao buscar comentarios:', error);
      return res.status(500).json({ error: 'Erro ao buscar comentarios' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { email, name, comentario, avaliacao } = req.body || {};

      if (!email || !name || !comentario) {
        return res.status(400).json({ error: 'Campos obrigatorios ausentes' });
      }

      const newComment = await prisma.comment.create({
        data: {
          email,
          name,
          comentario,
          avaliacao: typeof avaliacao === 'number' ? avaliacao : null,
        },
      });

      return res.status(201).json(newComment);
    } catch (error) {
      console.error('Erro ao salvar comentario:', error);
      return res.status(500).json({ error: 'Erro ao salvar comentario' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: 'Metodo nao permitido' });
}
