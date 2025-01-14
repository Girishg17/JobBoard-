import express from 'express';
import router from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
var cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
const swaggerOptions: swaggerJSDoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Node.js TypeScript API',
        version: '1.0.0',
        description: 'A simple Express API using TypeScript and Swagger',
      },
    },
    apis: ['./src/router.ts'], // Path to the API routes
  };
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
