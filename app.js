const express = require("express");
const path = require("path");
const {v4} = require("uuid");
const moment = require("moment");

const app = express();
const port = "3000";
const host = "localhost";
moment.locale("ru");

let REVIEWS = [
  {id: v4(), author: "Самуил", message: "Привет, Верунь!", date: "11 октября 2011"},
  {id: v4(), author: "Самуил", message: "Привет, Верунь! Вот это да", date: "12 октября 2011"},
  {id: v4(), author: "Самуил", message: "Привет, Верунь! ниче себе ты крутая. фотка класс!!!!", date: "13 октября 2011"},
  {id: v4(), author: "Лилия Семенова", message: "Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами?", date: "14 октября 2011"},
  {id: v4(), author: "Лилия Семенова", message: "Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент?", date: "14 октября 2011"},
];

app.use(express.json());

app.get("/api/reviews", (requeste, response) => {
  let lastReview = REVIEWS.filter((r, i, arr) => i > arr.length - 4 );
  let result = {
    count: REVIEWS.length,
    reviews: lastReview
  }
  setTimeout(() => {
    response.json(result)
  }, 1000);
});

app.post("/api/reviews", (requeste, response) => {
  const review = {...requeste.body, id: v4(), date: moment().format("D MMMM YYYY")};
  REVIEWS.push(review);
  response.json(review);
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (requeste, response) => {
  response.sendFile(path.resolve(__dirname, "client", "index.html"))
});

app.listen(port, host, () => console.log(`Server has been started on http://${host}:${port}`));