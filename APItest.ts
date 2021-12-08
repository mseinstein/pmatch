import axios from "axios";

export type Question = {
    readonly category: string;
    readonly mac_answer: string;
    readonly hp_answer: string;
    readonly acer_answer: string;
    readonly asus_answer: string;
    readonly options: string[];
    readonly question: string;
  };

export type QuestionsState = Question & { answers: string[] };

export const getQuizQuestions = async () => {
    
  const response  = await axios.get('/getQuestions');

  return response.data.map((question: Question) => (
      {
          ...question,
          answers: [...question.options]
}
))
}
export const getQuizCount = async () => {
  const count  = await axios.get('/getCount') as {people: number};
  console.log(count.people);
  return count.people;
}
