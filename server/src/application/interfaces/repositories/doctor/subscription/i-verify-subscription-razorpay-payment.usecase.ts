import type {
  VerifySubscriptionRazorpayPaymentDto,
  VerifySubscriptionRazorpayPaymentResponseDto,
} from "../../../../dto/doctor-subscription.dto.ts";

export interface IVerifySubscriptionRazorpayPaymentUseCase {
  execute(
    data: VerifySubscriptionRazorpayPaymentDto,
  ): Promise<VerifySubscriptionRazorpayPaymentResponseDto>;
}
