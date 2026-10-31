import { createHmac, timingSafeEqual } from "node:crypto";
import type {
  CreateWalletTopupOrderRequestDto,
  CreateWalletTopupOrderResponseDto,
  RazorpaySuccessDto,
  VerifyPaymentDto,
} from "../../application/dto/shared.dto.ts";
import type { IPaymentGatewayService } from "../../domain/services/i-payment-gateway.service.ts";
import { instance } from "../payment/razorpay.ts";

export class RazorpayService implements IPaymentGatewayService {
  async verifyPayment(data: RazorpaySuccessDto): Promise<VerifyPaymentDto> {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;
    const secret = process.env.RAZORPAY_SECRET_KEY;

    if (!secret) {
      throw new Error("Razorpay secret is not configured");
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new Error("Missing Razorpay payment verification fields");
    }

    const expectedSignature = createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const expectedBuffer = Buffer.from(expectedSignature, "hex");
    const receivedBuffer = Buffer.from(razorpay_signature, "hex");

    const verified =
      expectedBuffer.length === receivedBuffer.length &&
      timingSafeEqual(expectedBuffer, receivedBuffer);

    return {
      verified,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    };
  }

  async createOrder(
    data: CreateWalletTopupOrderRequestDto,
  ): Promise<CreateWalletTopupOrderResponseDto> {
    const { amount, ownerId, receipt, purpose } = data;

    try {
      const order = await instance.orders.create({
        amount,
        currency: "INR",
        receipt,
        notes: {
          ownerId,
          purpose,
        },
      });

      return {
        orderId: order.id,
        amount: Number(order.amount),
        currency:
          order.currency as CreateWalletTopupOrderResponseDto["currency"],
        status: order.status,
      };
    } catch (error) {
      throw error;
    }
  }
}
