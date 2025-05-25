import { Question } from "../models/Database.js";

export class QuestionController {
  static async getQuestionsForCurrentQuiz(req) {
    return Question.findAll({
      where: {
        QuizId: req.id,
      },
    });
  }

  static async saveQuestion(req) {
    let question = Question.build(req.body);
    question.QuizId = req.id;
    return question.save();
  }

  static async findById(req) {
    return Question.findByPk(req.params.id);
  }

}
