import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import myUserRoute from "./routes/user.routes";
import myRestaurantRoute from "./routes/resturant.routes";
import orderRoute from "./routes/order.routes";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.static("public"))
app.use(cookieParser());

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/order", orderRoute);


export default app;
