import express from 'express';
import cors from "cors";
import summaryRoutes from './routes/summaryRoutes.js'
import { initializeFirebaseApp } from './services/firebase.js';

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

initializeFirebaseApp();

app.use(cors({origin: allowedOrigin}))
app.use(summaryRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});
app.use((err, req, res, next) => { // Error handler
  console.error(err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send({
      message: 'File too large. Max size is 10MB.',
      type: 'FileSizeLimitError'
    });
  }

  res.status(err.status || 500).send({
    message: err.message || 'Internal Server Error',
    type: err.name || 'UnhandledError'
  });
  next()
});

app.listen(PORT,'0.0.0.0', () => {
  return console.log(`Server running on port ${PORT}`);
});