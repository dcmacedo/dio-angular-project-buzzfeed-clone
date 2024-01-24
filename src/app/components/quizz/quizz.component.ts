import { Component } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import { QuestionsComponent } from "../questions/questions.component";

@Component({
  selector: 'app-quizz',
  standalone: true,
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
  imports: [QuestionsComponent]
})

export class QuizzComponent {

  title: string = ""

  ngOnInit(): void {
    if (quizz_questions) {
      this.title = quizz_questions.title
    }
  }
}
