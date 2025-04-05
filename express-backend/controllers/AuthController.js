import { User, Quiz } from "../models/Database.js";
import Jwt from "jsonwebtoken";

export class AuthController {
/**
   * @param {http.IncomingMessage} request
   * @param {http.ServerResponse} response
   */
  static async checkCredentials(req, res){
    let user = new User({
      userName: req.body.usr, 
      password: req.body.pwd
    });

    let found = await User.findOne({
      where: {
        userName: user.userName,
        password: user.password
      }
    });

    return found !== null;
  }

  static async saveUser(req, res){
    let user = new User({
      userName: req.body.usr, 
      password: req.body.pwd
    });
    return user.save();
  }

  static issueToken(username){
    return Jwt.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
  }

  static isTokenValid(token, callback){
    Jwt.verify(token, process.env.TOKEN_SECRET, callback);
  }

  static async canUserModifyQuiz(user, quizId){
    const quiz = await Quiz.findByPk(quizId);
    return quiz && quiz.UserUserName === user;
  }
}