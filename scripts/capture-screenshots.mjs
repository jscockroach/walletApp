import { chromium, devices } from 'playwright'

const APP_URL = 'http://127.0.0.1:4173'
const iphone = devices['iPhone 12']

const browser = await chromium.launch()
const context = await browser.newContext({
  ...iphone,
})

const page = await context.newPage()
await page.goto(APP_URL, { waitUntil: 'networkidle' })
await page.getByRole('heading', { name: 'Latest Transactions' }).waitFor()
await page.screenshot({
  path: 'screenshots/transactions-list.png',
  fullPage: true,
})

await page.getByRole('button', { name: /airalo/i }).click({ force: true })
await page.getByRole('button', { name: 'Back' }).waitFor()
await page.screenshot({
  path: 'screenshots/transaction-detail.png',
  fullPage: true,
})

await browser.close()
