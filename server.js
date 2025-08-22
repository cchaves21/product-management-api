const express = require('express');
const productRoutes = require('./src/routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Products API running on port ${PORT}`);
});

module.exports = app;