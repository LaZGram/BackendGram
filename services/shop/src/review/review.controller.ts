import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern('shopReview')
  shopReview(msg: object): string {
    const id = parseInt(msg["shopId"].toString());
    return this.reviewService.shopReview(id);
  }
}
