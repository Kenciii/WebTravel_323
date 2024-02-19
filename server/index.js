import express from "express"
import cors from "cors"
import travelRoutes from "./routes/travels.js"
import userRoutes from "./routes/users.js"


const app = express();
const PORT = 8081;


app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use( cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

/*

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
  
*/
  

app.get("/", (req, res) =>{
    res.send("Welcome to Travel App API!!");
});

app.use("/travels", travelRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});