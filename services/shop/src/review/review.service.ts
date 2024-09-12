import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService, private appservice: AppService) {}

  async shopReview(authId: string) {
    return this.prisma.review.findMany({
      where: {
        shopId: await this.appservice.getShopId(authId)
      },
      select: {
        reviewId: true,
        rating: true,
        comment: true,
        requester: {
          select: {
            username: true,
            profilePicture: true
          }
        },
      }
    })
  }
}
