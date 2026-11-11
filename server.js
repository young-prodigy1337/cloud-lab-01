const express = require("express");
const os = require("node:os");
 
const app = express();
app.use(express.json());
 
const port = Number(process.env.PORT) || 3000;
let services = [
  { id: 1, name: "Хранение файлов", category: "storage" },
  { id: 2, name: "Виртуальная машина", category: "compute" },
  { id: 3, name: "Среда разработки", category: "development" }
];

app.post('/api/services', (req, res) => {
  const { name, category } = req.body;

  if (!name || !name.trim() || !category || !category.trim()) {
    return res.status(400).json({ error: 'Поля name и category обязательны' });
  }

  const id = services.reduce((max, s) => Math.max(max, s.id), 0) + 1;

  const newService = { id, name, category };
  services.push(newService);

  res.status(201).json(newService);
});
 
app.get("/", (req, res) => {
  res.send(`
    <html lang="ru"><meta charset="utf-8">
    <title>Cloud Lab</title>
    <h1>Старый бог здесь</h1>
    <p>Приложение запущено на удалённом сервере.</p>
    <a href="/api/status">Состояние сервера</a><br>
    <a href="/api/services">Список сервисов</a>
  `);
});
 
app.get("/api/status", (req, res) => {
  res.json({
    app: process.env.APP_NAME || "Cloud Lab",
    status: "ok",
    time: new Date().toISOString(),
    hostname: os.hostname()
  });
});
 
app.get("/api/services", (req, res) => {
  res.json(services);
});

app.get('/api/hello', (req, res) => {
  const name = req.query.name || 'Старый бог';
  res.json({ message: `Привет, ${name}!` });
});


 
app.listen(port, "0.0.0.0", () => {
  console.log(`Server: http://localhost:${port}`);
});