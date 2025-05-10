"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select()
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Incomes.id));

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="font-bold text-4xl">
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Hi, {user?.fullName}
            </span>
            <span className="ml-2 text-amber-500">👋</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Here's what's happening with your money. Let's manage your expenses together.
          </p>
        </div>

        <CardInfo budgetList={budgetList} incomeList={incomeList} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl border shadow-soft p-6">
              <BarChartDashboard budgetList={budgetList} />
            </div>

            <div className="bg-white rounded-2xl border shadow-soft p-6">
              <ExpenseListTable
                expensesList={expensesList}
                refreshData={() => getBudgetList()}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-gray-900">Latest Budgets</h2>
            <div className="space-y-4">
              {budgetList?.length > 0 ? (
                budgetList.map((budget, index) => (
                  <BudgetItem budget={budget} key={index} />
                ))
              ) : (
                [1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="h-[180px] w-full bg-gray-100 rounded-2xl animate-pulse"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
