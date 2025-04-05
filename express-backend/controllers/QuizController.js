import { Quiz } from "../models/Database.js";

export class QuizController {
  static async getQuizzesForCurrentUser(req) {
    console.log(req.body);
    return Quiz.findAll({
      where: {
        UserUserName: req.username,
      },
    });
  }

  static async saveQuiz(req) {
    let quiz = Quiz.build(req.body);
    quiz.UserUserName = req.username;
    return quiz.save();
  }

  static async findById(req) {
    return Quiz.findByPk(req.params.id);
  }

  static async update(id, updated) {
    let quiz = await Todo.findByPk(id);
    quiz.set(updated);
    return quiz.save();
  }

  static async delete(req) {
    return new Promise((resolve, reject) => {
      this.findById(req).then((item) => {
        item.destroy().then(() => {
          resolve(item);
        });
      });
    });
  }
}
