import express from "express";
import cors from "cors";
import path from "path";
import { db} from "./firebase-config";

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../../frontend/build")));
app.use(express.json());

const port = process.env.PORT || 8080;

type Question = {
  category: string;
  question: string;
  options: string[];
  mac_answer: string;
  hp_answer: string;
  acer_answer: string;
  asus_answer: string;
};

// type QuestionWithAnswers = Question & {
//   answers: string[];
// };
const numresponseCollection = db.collection("numresponse");
const questionsCollection = db.collection("questions");

app.get('/getQuestions', async (_, res) => {
  console.log("Backend called for getQuestions");
  const questions = await questionsCollection.get();
  res.json(
    questions.docs.map((doc): Question => {
      const question = doc.data() as Question;
      //const answers = question.options;
      return { ...question};
    })
  );
});

app.get('/getCount', async (_, res) => {
  console.log("Backend called for getCount");
  const count = await numresponseCollection.doc('num').get();
  const data= count.data();
  console.log(data);
  if (data === undefined) return 0;
  res.json(data);
});

app.post("/updateCount", async (req, res) => {
  const { people} = req.query;
  await numresponseCollection.doc('num').update({people: people});
  res.send("Count updated!");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));