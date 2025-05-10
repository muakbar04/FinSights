import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { Loader, PlusCircle, Receipt } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    if (!name || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: Number(amount),
          budgetId: budgetId,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning({ insertedId: Expenses.id });

      if (result) {
        setAmount("");
        setName("");
        refreshData();
        toast.success("New Expense Added!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Failed to add expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-soft hover:shadow-hover transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-50"></div>
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Receipt className="w-6 h-6" />
          </div>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            Add New Expense
          </h2>
        </div>
        
        <div className="space-y-5">
          <div className="group">
            <label className="text-sm font-medium text-gray-700 block mb-2 group-focus-within:text-primary transition-colors">
              Expense Name
            </label>
            <Input
              placeholder="e.g. Bedroom Decor"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 rounded-xl"
            />
          </div>
          
          <div className="group">
            <label className="text-sm font-medium text-gray-700 block mb-2 group-focus-within:text-primary transition-colors">
              Expense Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                Rs.
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-14 border-gray-200 focus:border-primary focus:ring-primary/20 transition-all duration-200 rounded-xl"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <Button
            disabled={!(name && amount) || loading}
            onClick={addNewExpense}
            className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-medium py-3 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add Expense
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
