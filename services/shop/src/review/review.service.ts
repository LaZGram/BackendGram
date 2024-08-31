import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  shopReview(id: number): any {
    return this.prisma.review.findMany({
      where: {
        shopId: {
          equals: id
        }
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
