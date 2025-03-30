import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { OwnQuizzesComponent } from './own-quizzes/own-quizzes.component';
import { OwnQuizDetailComponent } from './own-quiz-detail/own-quiz-detail.component';
import { PlayComponent } from './play/play.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { authGuard } from './_guards/auth/auth.guard';
import { CreateComponent } from './create/create.component';


export const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent,
    title: "Home | SmartQuiz"
  }, {
    path: "login",
    component: LoginComponent,
    title: "Login | SmartQuiz"
  }, {
    path: "signup",
    component: SignupComponent,
    title: "Signup | SmartQuiz"
  }, {
    path: "profile",
    component: ProfileComponent,
    title: "Profile | SmartQuiz",
    canActivate: [authGuard]
  }, {
    path: "logout",
    component: LogoutComponent,
    title: "Log Out | SmartQuiz"
  }, {
    path: "my-quizzes",
    component: OwnQuizzesComponent,
    title: "My Quizzes | SmartQuiz",
    canActivate: [authGuard]
  }, {
    path: "my-quizzes/:id",
    component: OwnQuizDetailComponent,
    title: "My Quizzes | SmartQuiz",
    canActivate: [authGuard]
  }, {
    path: "create",
    component: CreateComponent,
    title: "Create Quiz | SmartQuiz",
    canActivate: [authGuard]
  }, {
    path: "play",
    component: PlayComponent,
    title: "Play Quiz | SmartQuiz"
  }, {
    path: "play/:id",
    component: PlayQuizComponent,
    title: "Play Quiz | SmartQuiz"
  }, {
    path: "",
    redirectTo: "/home",
    pathMatch: 'full'
  },
];
