import type { CreateWalletTopupOrderRequestDto, RazorpaySuccessDto, TopupOrderResponseDto, VerifyPaymentDto } from "../../application/dto/wallet.dto.ts";

export interface IPaymentGatewayService {
  createOrder(data: CreateWalletTopupOrderRequestDto): Promise<TopupOrderResponseDto>
  verifyPayment(data: RazorpaySuccessDto): Promise<VerifyPaymentDto>
//   fetchPayment();
//   refundPayment();
//   verifyWebhookSignature();
}
