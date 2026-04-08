import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Transaction } from './types/transaction'
import { TransactionsListScreen } from './screens/TransactionsListScreen'
import { TransactionDetailScreen } from './screens/TransactionDetailScreen'
import { calculateDailyPoints, formatPoints } from './utils/points'
import styles from './App.module.css'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const cardLimit = 1500
  const cardBalance = useMemo(() => {
    const randomAmount = 50 + Math.random() * 1200
    return Math.round(randomAmount * 100) / 100
  }, [])

  const dailyPoints = useMemo(() => {
    return formatPoints(calculateDailyPoints(new Date()))
  }, [])

  const handleSelectTransaction = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }, [])

  const handleBackToList = useCallback(() => {
    setSelectedTransaction(null)
  }, [])

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/transactions.json')
        if (!response.ok) {
          throw new Error('Could not load transactions')
        }

        const data = (await response.json()) as Transaction[]
        setTransactions(data.slice(0, 10))
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : 'Unknown loading error',
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <main className={styles.appShell}>
      {isLoading ? <p className={styles.status}>Loading transactions...</p> : null}
      {loadError ? <p className={`${styles.status} ${styles.error}`}>{loadError}</p> : null}

      {!isLoading && !loadError && selectedTransaction === null ? (
        <TransactionsListScreen
          transactions={transactions}
          cardLimit={cardLimit}
          cardBalance={cardBalance}
          dailyPoints={dailyPoints}
          onSelectTransaction={handleSelectTransaction}
        />
      ) : null}

      {!isLoading && !loadError && selectedTransaction !== null ? (
        <TransactionDetailScreen
          transaction={selectedTransaction}
          onBack={handleBackToList}
        />
      ) : null}
    </main>
  )
}

export default App
