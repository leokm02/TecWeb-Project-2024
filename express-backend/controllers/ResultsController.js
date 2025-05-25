import { Results } from "../models/Database.js";

export class ResultsController {
  static async getResultsForCurrentQuiz(req) {
    return Results.findAll({
      where: {
        QuizId: req.id,
      },
    });
  }
  static async saveResults(req) {
    let results = Results.build(req.body);
    results.QuizId = req.id;
    return results.save();
  }
  static async findById(req) {
    return Results.findByPk(req.params.id);
  }

}
