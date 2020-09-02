/* eslint-disable class-methods-use-this */
import TransactionsRepository, {
  TransactionDTO,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (value > balance.total && type === 'outcome') {
      throw new Error('Insuficient founds');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
