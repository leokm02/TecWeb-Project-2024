import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

import { quizRouter } from "./routes/quizRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { enforceAuthentication } from "./middleware/authorization.js";
import { resetRouter } from "./routes/resetRouter.js";

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "An error occurred"
  });
});

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'SmartQuiz API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*Router.js'],
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(authRouter);
app.use(enforceAuthentication);
app.use(quizRouter);
app.use(resetRouter);

app.listen(PORT);