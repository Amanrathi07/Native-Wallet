import exapress from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummary,
  getTransaction,
} from "../controllers/transaction.controller";

const router = exapress.Router();

router.post("/transactions/:userId", createTransaction);

router.get("/transactions/:userId",  getTransaction);

router.delete("transactions/:id", deleteTransaction);

router.get("/transactions/summary/:userId", getSummary);

export default router;
