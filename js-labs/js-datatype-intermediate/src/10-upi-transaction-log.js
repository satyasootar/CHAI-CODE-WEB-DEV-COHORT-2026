/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {

  if (!Array.isArray(transactions) || transactions.length === 0) {
    return null;
  }


  const validTransaction = transactions.filter(trx => {
    const validAmount =
      typeof trx.amount === "number" &&
      Number.isFinite(trx.amount) &&
      trx.amount > 0;

    const validType =
      trx.type === "credit" || trx.type === "debit";

    return validAmount && validType;
  });

  if (validTransaction.length === 0) {
    return null;
  }


  const totals = validTransaction.reduce(
    (acc, trx) => {
      if (trx.type === "credit") {
        acc.totalCredit += trx.amount;
      } else {
        acc.totalDebit += trx.amount;
      }
      return acc;
    },
    { totalCredit: 0, totalDebit: 0 }
  );

  const totalCredit = totals.totalCredit;
  const totalDebit = totals.totalDebit;


  const netBalance = totalCredit - totalDebit;

  const transactionCount = validTransaction.length;

  const avgTransaction = Math.round(
    (totalCredit + totalDebit) / transactionCount
  );

  const highestTransaction = validTransaction.reduce((max, trx) =>
    trx.amount > max.amount ? trx : max
  );


  const categoryBreakdown = validTransaction.reduce((acc, trx) => {
    acc[trx.category] = (acc[trx.category] || 0) + trx.amount;
    return acc;
  }, {});

  const frequency = {};
  let frequentContact = "";
  let maxCount = 0;

  for (const trx of validTransaction) {
    frequency[trx.to] = (frequency[trx.to] || 0) + 1;

    if (frequency[trx.to] > maxCount) {
      maxCount = frequency[trx.to];
      frequentContact = trx.to;
    }
  }


  const allAbove100 = validTransaction.every(
    trx => trx.amount > 100
  );


  const hasLargeTransaction = validTransaction.some(
    trx => trx.amount >= 5000
  );

  return {
    totalCredit,totalDebit,netBalance,transactionCount,avgTransaction,highestTransaction,categoryBreakdown,frequentContact,allAbove100,hasLargeTransaction
  };
}
