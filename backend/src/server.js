/**
 * server.js — HTTP server entry point
 * Run: node src/server.js
 * Dev:  npm run dev  (uses nodemon)
 */

require('dotenv').config();
const app  = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🌍  Wanderlust API running on http://localhost:${PORT}`);
  console.log(`    Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(`    Health check: http://localhost:${PORT}/api/health\n`);
});
