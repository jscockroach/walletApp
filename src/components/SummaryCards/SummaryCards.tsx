import { memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { formatCurrency } from '../../utils/formatters'
import styles from './SummaryCards.module.css'

interface SummaryCardsProps {
  cardLimit: number
  cardBalance: number
  available: number
  dailyPoints: string
}

function SummaryCardsComponent({
  cardLimit,
  cardBalance,
  available,
  dailyPoints,
}: SummaryCardsProps) {
  return (
    <section className={styles.summaryGrid} aria-label="Card overview">
      <article className={styles.summaryCard}>
        <p className={styles.summaryTitle}>Card Balance</p>
        <p className={styles.summaryAmount}>{formatCurrency(cardBalance)}</p>
        <p className={styles.summarySubtext}>{formatCurrency(available)} Available</p>
        <p className={styles.summaryNote}>Max limit {formatCurrency(cardLimit)}</p>
      </article>

      <article className={`${styles.summaryCard} ${styles.noPaymentDue}`}>
        <p className={`${styles.summaryTitle} ${styles.noPaymentTitle}`}>No Payment Due</p>
        <p className={`${styles.summarySubtext} ${styles.noPaymentText}`}>
          You've paid your September balance.
        </p>
        <div className={styles.summaryCheck} aria-hidden="true">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </article>

      <article className={styles.summaryCard}>
        <p className={styles.summaryTitle}>Daily Points</p>
        <p className={styles.summaryPoints}>{dailyPoints}</p>
      </article>
    </section>
  )
}

export const SummaryCards = memo(SummaryCardsComponent)
