import type { Request , Response  } from "express";

import { sql } from "../config/db";

export const createTransaction = async (req :Request, res:Response) => {
  const { title, amount, category, user_id } = req.body;
  const {userId} = req.params ;
  try {
    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ message: "All field are required" });
    }
    const transaction = await sql`
            INSERT INTO Transactions(user_id,title,amount,category)
            VALUES (${user_id},${title},${amount},${category})
            RETURNING *
        `;
    return res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error in the creation Transactions", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getTransaction = async (req: Request, res:Response) => {
  const {userId} = req.params ;
  try {
    if (userId) {
      return res.status(400).json({ message: "user not found" });
    }
    const transactions = await sql`
            SELECT * from Transactions WHERE user_id =${userId} ORDER BY created_at DESC
        `;
    return res.status(200).json(transactions);
  } catch (error) {
    console.log("Error in the getting Transactions", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const deleteTransaction = async (req :Request, res:Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "transactions id not found" });
    }
    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ message: "transactions not found" });
    }
    return res
      .status(200)
      .json({ message: "transactions deleted successfully" });
  } catch (error) {
    console.log("Error in the delete Transactions ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getSummary = async (req: Request, res:Response) => {
    const {userId} = req.params ;

    try {
      if (userId) {
        return res.status(400).json({ message: "user not found" });
      }
      const balanceResult = await sql`
            SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE  user_id=${userId}
        `;
      const incomeResult = await sql`
            SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE  user_id=${userId} and amount > 0 
        `;

      const expensesResult = await sql`
            SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE  user_id=${userId} and amount < 0 
        `;

      return res.status(200).json({
        //@ts-ignore
        balance: balanceResult[0].balance,
        //@ts-ignore
        income: incomeResult[0].income,
        //@ts-ignore
        expenses: expensesResult[0]``.income,
      });
    } catch (error) {
      console.log("Error in the getting Transactions summary", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }