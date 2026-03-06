import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para JSON
app.use(express.json());

// Servir scripts.js especificamente
app.get('/scripts.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'scripts.js'));
});

// Servir arquivos CSS
app.get('/assets/css/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'css', req.params.file));
});

// Servir imagens
app.get('/assets/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', req.params.file));
});

// Servir páginas HTML
app.get('/pages/:file', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', req.params.file));
});

// Servir arquivos estáticos da raiz
app.use(express.static(__dirname));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Exportar para Vercel
export default app;
