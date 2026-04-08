export type TransactionType = 'payment' | 'credit'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  cashbackPercentage?: number
  name: string
  description: string
  date: string
  pending: boolean
  authorizedUser?: string
  merchantKey: string
}
