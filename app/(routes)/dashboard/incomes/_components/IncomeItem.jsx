import React, { useState } from "react";
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
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Pencil, Trash } from "lucide-react";
import { eq } from "drizzle-orm";
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

function IncomeItem({ budget, refreshData }) {
  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState(budget.amount);
  const { user } = useUser();

  const onUpdateIncome = async () => {
    try {
      await db
        .update(Incomes)
        .set({
          name: name,
          amount: amount,
        })
        .where(eq(Incomes.id, budget.id));

      refreshData();
      toast("Income Source Updated!");
    } catch (error) {
      console.error("Error updating income:", error);
      toast("Failed to update income source");
    }
  };

  const onDeleteIncome = async () => {
    try {
      await db
        .delete(Incomes)
        .where(eq(Incomes.id, budget.id));

      refreshData();
      toast("Income Source Deleted!");
    } catch (error) {
      console.error("Error deleting income:", error);
      toast("Failed to delete income source");
    }
  };

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  return (
    <div className="p-5 border rounded-2xl hover:shadow-md h-[170px]">
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-primary text-lg">Rs. {budget.amount}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Income Source</DialogTitle>
                <DialogDescription>
                  <div className="mt-5">
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1">Source Name</h2>
                      <Input
                        placeholder="e.g. Youtube"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-2">
                      <h2 className="text-black font-medium my-1">Monthly Amount</h2>
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
                    onClick={() => onUpdateIncome()}
                    className="mt-5 w-full rounded-full"
                  >
                    Update Income Source
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
                  Delete Income Source
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  Are you sure you want to delete this income source? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-200 hover:bg-gray-50">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDeleteIncome}
                  className="bg-danger hover:bg-danger/90 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default IncomeItem;
