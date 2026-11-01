import type { CreateWalletTopupOrderRequestDto, CreateWalletTopupOrderResponseDto, RazorpaySuccessDto, VerifyPaymentDto } from "../../application/dto/shared.dto.ts";

export interface IPaymentGatewayService {
  createOrder(data: CreateWalletTopupOrderRequestDto): Promise<CreateWalletTopupOrderResponseDto>
  verifyPayment(data: RazorpaySuccessDto): Promise<VerifyPaymentDto>
//   fetchPayment();
//   refundPayment();
//   verifyWebhookSignature();
}
