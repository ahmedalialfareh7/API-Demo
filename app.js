const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const PORT= process.env.PORT || 8080;


const {router} = require("./routes/mainRoutes");
const {downloadRouter} = require("./routes/downloadFile");
const {uploadRouter} = require("./routes/uploadFile");
const {uploadManyRouter} = require("./routes/uploadManyFiles");
const {usersRouter} = require("./routes/users-routes/getStudentsRoutes");
const {classesRouter} = require("./routes/classes-routes/classesRoutes");
const {TeacherRouter} = require("./routes/users-routes/TeacherRoutes");
const {SubjectsRouter} = require("./routes/subjectsRoutes");

const {SlidesRouter} = require("./routes/slidesRoutes");
const {homeWorksRouter} = require("./routes/homeworksRoutes");
const {deliveredHWsRouter} = require("./routes/deliveredHWsRoutes");
const {projectsRouter} = require("./routes/projectsRoutes");

// Init App
const app = express();

// Apply Middleware
app.use(express.json());

// Cors Policy
app.use(cors());
 

// Routes
app.use("/cs1am/" , router);                // mainRoutes
app.use("/download/" , downloadRouter);     // downloadRoutes
app.use("/upload/" , uploadRouter);         // uploadRoutes
app.use("/upload-many/" , uploadManyRouter);     // uploadManyRouter

// Routes-Users 
app.use("/users-routes/" , usersRouter);

// Routes-Classes 
app.use("/classes-routes/" , classesRouter);

// Routes-Teachers 
app.use("/teachers-routes/" , TeacherRouter);

// Routes-Subjects 
app.use("/subjects-routes/" , SubjectsRouter);

// Routes-Slides 
app.use("/slides-routes/" , SlidesRouter);

// Routes-HomeWorks 
app.use("/homeworks-routes/" , homeWorksRouter);
 
// Routes-HomeWorks  
app.use("/deliveredHWs-routes/" , deliveredHWsRouter);

// Routes-Projects 
app.use("/projects-routes/" , projectsRouter);


//.connect("mongodb+srv://main-user:unTestAPIpwd@untestapi.bn7enus.mongodb.net/?retryWrites=true&w=majority")
//.connect("mongodb://127.0.0.1:27017/unTestAPI")
//MONGO_URI=mongodb://127.0.0.1:27017/unApiDemo
//connect to mongoose 
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log("connection failed to mongodb" , error));



// Running Server
app.listen(PORT , () => console.log('Server is Running on Port ' + PORT));