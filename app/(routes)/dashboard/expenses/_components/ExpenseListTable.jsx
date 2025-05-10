import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash, AlertCircle, Receipt, Pencil } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ExpenseListTable({ expensesList, refreshData }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const deleteExpense = async (expense) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, expense.id))
        .returning();

      if (result) {
        toast.success("Expense deleted successfully!");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  const updateExpense = async () => {
    if (!name || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      const result = await db
        .update(Expenses)
        .set({
          name: name,
          amount: Number(amount),
        })
        .where(eq(Expenses.id, editingExpense.id))
        .returning();

      if (result) {
        toast.success("Expense updated successfully!");
        refreshData();
        setEditingExpense(null);
        setName("");
        setAmount("");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast.error("Failed to update expense. Please try again.");
    }
  };

  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setName(expense.name);
    setAmount(expense.amount);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Receipt className="w-6 h-6" />
        </div>
        <h2 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Latest Expenses
        </h2>
        <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
          {expensesList.length} items
        </span>
      </div>

      {expensesList.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-dashed border-gray-200 shadow-soft">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No expenses added yet</p>
          <p className="text-gray-400 text-sm mt-1">Add your first expense to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-soft overflow-hidden">
          <div className="grid grid-cols-4 bg-gradient-to-r from-gray-50 to-white p-4 border-b">
            <h2 className="font-semibold text-gray-700">Name</h2>
            <h2 className="font-semibold text-gray-700">Amount</h2>
            <h2 className="font-semibold text-gray-700">Date</h2>
            <h2 className="font-semibold text-gray-700">Action</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {expensesList.map((expense, index) => (
              <div 
                key={expense.id}
                className="grid grid-cols-4 p-4 hover:bg-gray-50/50 transition-colors group"
              >
                <div className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                  {expense.name}
                </div>
                <div className="text-gray-700 font-medium">Rs. {expense.amount}</div>
                <div className="text-gray-600">{expense.createdAt}</div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors"
                        onClick={() => handleEditClick(expense)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Expense</DialogTitle>
                        <DialogDescription>
                          <div className="mt-5">
                            <div className="mt-2">
                              <h2 className="text-black font-medium my-1">Expense Name</h2>
                              <Input
                                placeholder="e.g. Groceries"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="mt-2">
                              <h2 className="text-black font-medium my-1">Amount</h2>
                              <Input
                                type="number"
                                placeholder="e.g. 5000 Rs."
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                              />
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            disabled={!(name && amount)}
                            onClick={updateExpense}
                            className="mt-5 w-full rounded-full"
                          >
                            Update Expense
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-400 hover:text-danger hover:bg-danger/5 transition-colors"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-gray-900">
                          Delete Expense
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600">
                          Are you sure you want to delete this expense? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-gray-200 hover:bg-gray-50">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteExpense(expense)}
                          className="bg-danger hover:bg-danger/90 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseListTable;
