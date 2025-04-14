const app = require("./app");

const PORT = process.env.PORT || 5005;

console.log("🚀 process.env.PORT:", process.env.PORT);
console.log("🛠️ Usando el puerto:", PORT);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});