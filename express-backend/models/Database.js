import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createQuizModel } from "./Quiz.js";
import { createModel as createQuestionModel } from "./Question.js";
import { createModel as createMultipleAnswersModel } from "./MultipleAnswers.js";
import { createModel as createResultsModel } from "./Results.js";

import 'dotenv/config.js';

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createUserModel(database);
createQuizModel(database);
createQuestionModel(database);
createMultipleAnswersModel(database);
createResultsModel(database);

export const {User, Quiz, Question, MultipleAnswers, Results} = database.models;

//associations configuration
User.Quiz = User.hasMany(Quiz, {
    onDelete: 'CASCADE',
});
Quiz.User = Quiz.belongsTo(User);

Quiz.Question = Quiz.hasMany(Question, {
  onDelete: 'CASCADE',
});
Question.Quiz = Question.belongsTo(Quiz);

Question.MultipleAnswers = Question.hasOne(MultipleAnswers, {
  onDelete: 'CASCADE',
});
MultipleAnswers.Question = MultipleAnswers.belongsTo(Question);

Quiz.Results = Quiz.hasMany(Results, {
  onDelete: 'CASCADE',
});
Results.Quiz = Results.belongsTo(Quiz);



//synchronize schema (creates missing tables)
database.sync().then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.error("Error with database synchronization: " + err.message);
});