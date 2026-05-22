import express from "express";
import countries from "./public/countries.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let nextId = 7;
const posts = [
  {
    id: 1,
    title: "My soft-rock buddy",
    content:
      "I can't get hyped enough for a run without 'Kimi ga Suki da to Sakebitai' playing in my ears 🏀",
    name: "Coco",
    country: "Japan",
    flag: "🇯🇵",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "My first rock album",
    content:
      "I remember the first album I really got into, I was instantly hooked, I just kept replaying it. That was LOAD by Metallica",
    name: "Fede",
    country: "Italy",
    flag: "🇮🇹",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Drums",
    content:
      "I will always treasure the moment that I received my first drumkit. I played it all day long-I'm sure my neighbours did not enjoy it 😂. What a noisy joy!!!",
    name: "Fede",
    country: "Italy",
    flag: "🇮🇹",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "The best of the best of the best!!!",
    content: "Eddie Vedder forever 🤘🏻",
    name: "Tim",
    country: "United States",
    flag: "🇺🇸",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    title: "Vibin'",
    content: "When I'm upset, my go-to is dancing to 'Mr. Brighside'",
    name: "Natasha",
    country: "Mauritius",
    flag: "🇲🇺",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    title: "PARAMOREEEEEE",
    content:
      "Were you at the Scotiabank Arena in 2023? - OH YES I WAS THERE! The best concert ever!",
    name: "Matt",
    country: "Canada",
    flag: "🇨🇦",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Show all posts sorted in descending order- Homepage
app.get("/", (req, res) => {
  const sortedPosts = [...posts].sort((a, b) => {
    const latestA = Math.max(a.createdAt.getTime(), a.updatedAt.getTime());
    const latestB = Math.max(b.createdAt.getTime(), b.updatedAt.getTime());
    return latestB - latestA;
  });
  res.render("index.ejs", { posts: sortedPosts, countries });
});

app.post("/create", (req, res) => {
  // Find the country object that matches the selected country
  const newPostCountry = countries.find((c) => c.name === req.body.country);
  const createdPost = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    name: req.body.name,
    country: req.body.country,
    flag: newPostCountry.flag,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  posts.push(createdPost);
  res.redirect("/");
});

app.get("/editPost/:id", (req, res) => {
  const editedPost = posts.find((post) => post.id === Number(req.params.id));
  if (!editedPost) return res.statusCode(404).send("Post not found");
  res.render("edit.ejs", { editedPost, countries });
});

app.post("/updatePost/:id", (req, res) => {
  // Get the ID of the corresponding post
  const editedPostId = Number(req.params.id);
  // Find the post with the ID selected
  const editedPost = posts.find((post) => post.id === editedPostId);
  const editedFlag = countries.find((c) => c.name === req.body.country);
  if (!editedPost) return res.status(404).send("Post not found");
  editedPost.title = req.body.title;
  editedPost.content = req.body.content;
  editedPost.name = req.body.name;
  editedPost.country = req.body.country;
  editedPost.flag = editedFlag.flag;
  editedPost.updatedAt = new Date();
  res.redirect("/");
});

app.post("/deletePost/:id", (req, res) => {
  const deletePostId = Number(req.params.id);
  const deletedPost = posts.find((post) => deletePostId === post.id);
  if (deletedPost) {
    const postIndex = posts.findIndex((post) => post.id === deletePostId);
    posts.splice(postIndex, 1);
  }
  res.redirect("/");
});

app.get("/fullPost/:id", (req, res) => {
  const fullPostId = Number(req.params.id);
  const fullPost = posts.find((post) => post.id === fullPostId);
  res.render("post.ejs", { post: fullPost });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
