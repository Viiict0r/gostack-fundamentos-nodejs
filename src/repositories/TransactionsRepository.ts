import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const outcome = this.transactions.reduce((a, b) => {
      if (b.type === 'outcome') return a + b.value;
      return a;
    }, 0);

    const income = this.transactions.reduce((a, b) => {
      if (b.type === 'income') return a + b.value;
      return a;
    }, 0);

    return {
      outcome,
      income,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
