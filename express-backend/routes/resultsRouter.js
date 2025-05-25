import express from "express";
import { ResultsController } from "../controllers/ResultsController.js";

export const resultsRouter = express.Router();

resultsRouter.get("/my-quizzes/:quizId/results", (req, res, next) => {
  ResultsController.getResultsForCurrentQuiz(req).then(resultsItem => {
    res.json(resultsItem);
  }).catch(err => {
    next(err);
  });
});

resultsRouter.get("/my-quizzes/:quizId/results/:id", (req, res, next) => {
  ResultsController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Results not found"});
  }).catch( err => {
    next(err);
  })
});