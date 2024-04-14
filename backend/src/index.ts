import dotenv from "dotenv";
import connectDB from "./db/index";
import app from "./app"


dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        
        app.listen(process.env.PORT || 3000, () => {

            console.log(`app is running on localhost:${process.env.PORT}`)
        })
        app.on("error", (err) => {
            console.error("Server error: ", err);
        })
    })
    .catch((err: any) => {
        console.error(`mongoDB connnection failed: ${err.message}`)
    })
