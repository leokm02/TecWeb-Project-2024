import express from "express";
import { QuestionController } from "../controllers/QuestionController.js";

export const questionRouter = express.Router();

questionRouter.get("/my-quizzes/:quizId/questions", (req, res, next) => {
  QuestionController.getQuestionsForCurrentQuiz(req).then(questionItems => {
    res.json(questionItems);
  }).catch(err => {
    next(err);
  });
});

questionRouter.get("/my-quizzes/:quizId/questions/:id", (req, res, next) => {
  QuestionController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Question not found"});
  }).catch( err => {
    next(err);
  })
});