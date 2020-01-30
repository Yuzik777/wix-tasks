import express, {Request, Response, NextFunction} from 'express';
import UserService from './services/users';
import { runInNewContext } from 'vm';

const app = express();
app.use(express.json());

const users = new UserService();

const errorCodes = new Map<string, number>();
errorCodes.set("ValidationError", 422);

app.get("/", (req, res) => {
    res.send("Hi");
});

app.post("/api/v1/users", async (req, res, next: NextFunction) => {
    try {
        const result = await users.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    const status: number = errorCodes.get(err.name) || 500;

    res.status(status).json('Something broke!')
  })
export default app;
