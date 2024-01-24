import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import quizz_questions from "../../../assets/data/quizz_questions.json"
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [NgIf, NgFor, ResultsComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

  questions: any
  questionSelected: any

  answers: string[] = []
  answerSelected: string = ""

  questionIndex: number = 0
  questionMaxIndex: number = 0

  finished: boolean = false

  ngOnInit(): void {
    if (quizz_questions) {

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }

  }

  playerChoose(value: string) {
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep() {
    this.questionIndex += 1

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers: string[]) {

    const result = answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })

    return result
  }
}
