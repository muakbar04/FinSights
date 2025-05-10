import React, { useEffect, useState, useMemo } from "react";
import { Sparkles, PiggyBank, ReceiptText, Wallet, CircleDollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function CardInfo({ budgetList, incomeList }) {
  const [financialAdvice, setFinancialAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize calculations to prevent unnecessary recalculations
  const { totalBudget, totalSpend, totalIncome, balance } = useMemo(() => {
    const totalBudget = budgetList?.reduce((acc, budget) => acc + (Number(budget.amount) || 0), 0) || 0;
    const totalSpend = budgetList?.reduce((acc, budget) => acc + (Number(budget.totalSpend) || 0), 0) || 0;
    const totalIncome = incomeList?.reduce((acc, income) => acc + (Number(income.amount) || 0), 0) || 0;
    const balance = totalIncome - totalSpend;

    return { totalBudget, totalSpend, totalIncome, balance };
  }, [budgetList, incomeList]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-IN").format(num || 0);
  };

  useEffect(() => {
    const generateFinancialInsight = () => {
      try {
        setLoading(false);
        setError(null);
        
        // Calculate basic financial metrics
        const savingsRate = ((totalIncome - totalSpend) / totalIncome) * 100;
        const budgetUtilization = (totalSpend / totalBudget) * 100;
        const balanceRatio = (balance / totalIncome) * 100;
        
        // Define insight arrays for different situations
        const noIncomeInsights = [
          "Start tracking your income to get a better view of your finances.",
          "Begin by recording all your income sources, including salary, freelance work, and investments.",
          "Set up income categories to better understand your earning patterns.",
          "Consider adding multiple income streams for better financial stability.",
          "Track your income regularly to identify trends and opportunities."
        ];

        const noBudgetInsights = [
          "Set up your first budget to begin managing your expenses effectively.",
          "Create budget categories based on your spending patterns.",
          "Start with essential expenses like housing, food, and utilities.",
          "Allocate a portion of your income to savings and investments.",
          "Review and adjust your budget monthly to stay on track."
        ];

        const noExpenseInsights = [
          "Begin tracking your expenses to understand your spending patterns.",
          "Record daily expenses to identify where your money goes.",
          "Categorize expenses to spot potential areas for savings.",
          "Set up expense alerts to stay within your budget.",
          "Review your spending habits weekly to make better financial decisions."
        ];

        const overspendingInsights = [
          "Your expenses exceed your income. Consider reducing non-essential spending.",
          "Look for subscription services you can cancel or downgrade.",
          "Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings.",
          "Consider using cash for discretionary spending to limit overspending.",
          "Set up automatic transfers to savings to reduce available spending money."
        ];

        const lowSavingsInsights = [
          "Try to save at least 10% of your income for better financial security.",
          "Start with small, consistent savings goals and increase gradually.",
          "Set up automatic savings transfers on payday.",
          "Create an emergency fund with 3-6 months of expenses.",
          "Consider high-yield savings accounts for better returns."
        ];

        const highSavingsInsights = [
          "Great job saving! Consider investing some of your savings for better returns.",
          "Diversify your investments across different asset classes.",
          "Look into retirement accounts for long-term growth.",
          "Consider index funds for steady, low-cost investment returns.",
          "Set up automatic investments to maintain your saving momentum."
        ];

        const highBudgetUtilizationInsights = [
          "You're very close to your budget limits. Look for areas to cut back.",
          "Review your largest expenses for potential savings.",
          "Consider negotiating bills and subscriptions for better rates.",
          "Look for ways to reduce fixed costs like housing and transportation.",
          "Create a buffer in your budget for unexpected expenses."
        ];

        const lowBudgetUtilizationInsights = [
          "You're well under budget. Consider allocating more to savings or investments.",
          "Increase your emergency fund contributions.",
          "Look into retirement or investment accounts.",
          "Consider paying off high-interest debt faster.",
          "Set new financial goals with your extra funds."
        ];

        const negativeBalanceInsights = [
          "Your balance is negative. Focus on reducing expenses and increasing income.",
          "Create a debt repayment plan for high-interest debts.",
          "Look for ways to increase your income through side hustles.",
          "Cut back on non-essential expenses temporarily.",
          "Set up a strict budget to get back to positive balance."
        ];

        const healthyBalanceInsights = [
          "You have a healthy balance. Consider setting new financial goals.",
          "Look into long-term investment opportunities.",
          "Consider increasing your retirement contributions.",
          "Plan for major future expenses like home ownership.",
          "Explore ways to grow your wealth through diversified investments."
        ];

        const stableFinancesInsights = [
          "Your finances are stable. Keep tracking and maintaining this balance.",
          "Continue monitoring your spending patterns.",
          "Regularly review and adjust your budget as needed.",
          "Stay consistent with your savings and investment strategy.",
          "Consider setting new financial milestones to achieve."
        ];

        // Select appropriate insights based on financial situation
        let insightArray;
        if (totalIncome === 0) {
          insightArray = noIncomeInsights;
        } else if (totalBudget === 0) {
          insightArray = noBudgetInsights;
        } else if (totalSpend === 0) {
          insightArray = noExpenseInsights;
        } else if (totalSpend > totalIncome) {
          insightArray = overspendingInsights;
        } else if (savingsRate < 10) {
          insightArray = lowSavingsInsights;
        } else if (savingsRate > 30) {
          insightArray = highSavingsInsights;
        } else if (budgetUtilization > 95) {
          insightArray = highBudgetUtilizationInsights;
        } else if (budgetUtilization < 50) {
          insightArray = lowBudgetUtilizationInsights;
        } else if (balanceRatio < 0) {
          insightArray = negativeBalanceInsights;
        } else if (balanceRatio > 50) {
          insightArray = healthyBalanceInsights;
        } else {
          insightArray = stableFinancesInsights;
        }

        // Randomly select one insight from the appropriate array
        const randomInsight = insightArray[Math.floor(Math.random() * insightArray.length)];
        setFinancialAdvice(randomInsight);
      } catch (error) {
        console.error('Error generating financial insight:', error);
        setError(null);
        setFinancialAdvice("Track your income and expenses regularly to maintain financial health.");
      }
    };

    if (budgetList && incomeList) {
      generateFinancialInsight();
    }
  }, [budgetList, incomeList, totalIncome, totalBudget, totalSpend, balance]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="card-modern p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-foreground/80">{title}</h2>
        <div className={`p-2 rounded-lg bg-${color}/10`}>
          <Icon className={`w-5 h-5 text-${color}`} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-foreground">
        Rs. {formatNumber(value)}
      </h2>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {budgetList?.length > 0 ? (
        <>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card-modern p-6 bg-gradient-to-r from-primary/5 to-primary/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white shadow-soft">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground mb-1">Financial Insight</h2>
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-foreground/80"
                    >
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Generating insight...
                    </motion.div>
                  ) : error ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400"
                    >
                      {error}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="insight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-foreground/90"
                    >
                      {financialAdvice}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Budget"
              value={totalBudget}
              icon={PiggyBank}
              color="primary"
            />
            <StatCard
              title="Total Spend"
              value={totalSpend}
              icon={ReceiptText}
              color="primary"
            />
            <StatCard
              title="Total Income"
              value={totalIncome}
              icon={CircleDollarSign}
              color="primary"
            />
            <StatCard
              title="Balance"
              value={balance}
              icon={Wallet}
              color="primary"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[150px] w-full bg-muted rounded-lg animate-shimmer"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
