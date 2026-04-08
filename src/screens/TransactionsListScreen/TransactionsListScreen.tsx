import { memo } from 'react'
import type { Transaction } from '../../types/transaction'
import { SummaryCards } from '../../components/SummaryCards'
import { MemoizedTransactionRow } from '../../components/TransactionRow'
import styles from './TransactionsListScreen.module.css'

interface TransactionsListScreenProps {
  transactions: Transaction[]
  cardLimit: number
  cardBalance: number
  dailyPoints: string
  onSelectTransaction: (transaction: Transaction) => void
}

function TransactionsListScreenComponent({
  transactions,
  cardLimit,
  cardBalance,
  dailyPoints,
  onSelectTransaction,
}: TransactionsListScreenProps) {
  const available = Math.max(0, cardLimit - cardBalance)

  return (
    <div className={styles.screen}>
      <SummaryCards
        cardLimit={cardLimit}
        cardBalance={cardBalance}
        available={available}
        dailyPoints={dailyPoints}
      />

      <section className={styles.latestTransactions} aria-label="Latest transactions">
        <h2>Latest Transactions</h2>
        <div className={styles.transactionsCard}>
          {transactions.map((transaction) => (
            <MemoizedTransactionRow
              key={transaction.id}
              transaction={transaction}
              onSelect={onSelectTransaction}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export const TransactionsListScreen = memo(TransactionsListScreenComponent)
