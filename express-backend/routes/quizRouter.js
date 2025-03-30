import express from "express";
import { QuizController } from "../controllers/QuizController.js";
import { ensureUsersModifyOnlyOwnQuizzes } from "../middleware/authorization.js";

export const quizRouter = express.Router();

quizRouter.get("/my-quizzes", (req, res, next) => {
  QuizController.getQuizzesForCurrentUser(req).then(quizItems => {
    res.json(quizItems);
  }).catch(err => {
    next(err);
  });
});

quizRouter.post("/my-quizzes", (req, res, next) => {
  QuizController.saveQuiz(req).then( result => {
    res.json(result);
  }).catch(err => {
    next(err);
  });
});

quizRouter.get("/my-quizzes/:id", ensureUsersModifyOnlyOwnQuizzes, (req, res, next) => {
  QuizController.findById(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Quiz not found"});
  }).catch( err => {
    next(err);
  })
});

quizRouter.delete("/my-quizzes/:id", ensureUsersModifyOnlyOwnQuizzes, (req, res, next) => {
  QuizController.delete(req).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Quiz not found"});
  }).catch( err => {
    next(err);
  })
});


quizRouter.put("/my-quizzes/:id", ensureUsersModifyOnlyOwnQuizzes, (req, res, next) => {
  QuizController.update(req.params.id, req.body).then( (item) => {
    if(item)
      res.json(item);
    else 
      next({status: 404, message: "Quiz not found"});
  }).catch( err => {
    next(err);
  })
});