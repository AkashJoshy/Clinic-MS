import cron, { type ScheduledTask } from "node-cron";
import { expirePendingWalletTransactionsUseCase } from "../../../container/modules/common.modules.ts";


const expirePendingWalletTransactionsJob: ScheduledTask = cron.schedule("*/5 * * * *", async () => {
  try {
    console.log("[CRON] Starting Wallet Transaction status Pending to Failed...");
    await expirePendingWalletTransactionsUseCase.execute();
    console.log("[CRON] Wallet Transaction status updating completed.");
  } catch (error) {
    console.error("[CRON] Wallet Transaction status updation failed:", error);
  }
});

export default expirePendingWalletTransactionsJob;
