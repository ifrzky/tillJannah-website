const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./server/config/db.js");
const colors = require("colors");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const flash = require("connect-flash");

const userRoutes = require("./server/routes/userRoutes.js");
const jadwalRoutes = require("./server/routes/jadwalRoutes.js");
const kalenderRoutes = require("./server/routes/kalenderRoutes.js");
const alquranRoutes = require("./server/routes/alquranRoutes.js");
const articleRoutes = require("./server/routes/articleRoutes.js");
const {
  errorHandler,
  notFound,
} = require("./server/middleware/errorMiddleware.js");

dotenv.config();

// Set zona waktu
process.env.TZ = "Asia/Jakarta";

connectDB();

const app = express(); // main thing
app.use(cors());

app.use(express.json()); // to accept json data

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Setup session and flash message
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.flash_message = req.flash("flash_message");
  next();
});

app.use("/api/users", userRoutes);

app.use("/api/sholat", jadwalRoutes);

app.use("/api/kalender", kalenderRoutes);

app.use("/api/alquran", alquranRoutes);

app.use("/api/article", articleRoutes);

// Error Handling middlewares
app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app
  .listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
        .bold
    );
  })
  .on("error", (err) => {
    console.error(`Failed to start server: ${err.message}`);
  });
