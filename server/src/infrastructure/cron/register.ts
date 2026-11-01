import type { ScheduledTask } from "node-cron";
import expirePendingWalletTransactionsJob from "./jobs/expire-pending-wallet-transactions.job.ts";


const cronJobs: ScheduledTask[] = [
    // slotGeneratorJob
    // expirePendingWalletTransactionsJob
]


export default cronJobs