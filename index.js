const express = require("express")

const app = express()

const db = require("./models")

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");

db.sequelize.sync().then(() => {
  console.log("Synced db.")
}).catch((err) => {
  console.log("Failed to sync db: " + err.message)
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/reg", (req, res) => {
  // res.json({ message: "HI from the home route" });
  res.render('index', { title: 'Home' });
});

require("./routes")(app);

app.all('*', function (req, res) {
  res.status(404).send();
});


app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${app.get('port')}.`);
});
