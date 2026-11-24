import type {
  CreateSubscriptionRazorpayOrderDto,
  CreateSubscriptionRazorpayOrderResponseDto,
} from "../../../../dto/doctor-subscription.dto.ts";

export interface ICreateSubscriptionRazorpayOrderUseCase {
  execute(
    data: CreateSubscriptionRazorpayOrderDto,
  ): Promise<CreateSubscriptionRazorpayOrderResponseDto>;
}
