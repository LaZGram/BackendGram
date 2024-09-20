import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SearchOrderDto } from './dto/search-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getToDayOrder() {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));
    return this.prisma.order.findMany({
      where:{
        orderDate: {
          gte: startOfToday,  // Greater than or equal to start of today
          lte: endOfToday,    // Less than or equal to end of today
        },
      },
    })
  }

  getOrderInfo(orderId: number) {
    return this.prisma.order.findUnique({
      where: {
        orderId: orderId
      },
      select: {
        orderId: true,
        orderDate: true,
        orderStatus: true,
        requester: {
          select: {
            requesterId: true,
            phoneNumber: true
          }
        },
        walker: {
          select: {
            walkerId: true,
            phoneNumber: true
          }
        },
        Photo: {
          select: {
            photoId: true,
            photoPath: true
          }
        },
        canteen: {
          select: {
            canteenId: true,
            name: true,
            latitude: true,
            longitude: true
          }
        },
        address: {
          select: {
            addressId: true,
            name: true,
            detail: true,
            note: true,
            latitude: true,
            longitude: true
          }
        }
      }
    })
  }

  searchOrder(msg: SearchOrderDto) {
    let id = []
    for (const key in msg) {
      if(msg[key]) {
        id.push({[key]: parseInt(msg[key].toString())});
      }
    }
    return this.prisma.order.findMany({
      where: {
        AND: id
      }
    });
  }

  async filterOrder(msg: FilterOrderDto) {
    let filter = {}
    let sort = '';
    for (const key in msg) {
      switch (key) {
        case 'orderDate':
          const date = new Date(msg[key]);
          filter[key] = {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lte: new Date(date.setHours(23, 59, 59, 999))
          }
          break;
        case 'canteenId':
          filter[key] = parseInt(msg[key].toString());
          break;
        case 'shopId':
          filter['orderItem'] = {
            every: {
              shopId: parseInt(msg[key].toString())
            }
          };
          break;
        case 'orderStatus':
          filter[key] = msg[key];
          break;
        case 'sortPrice':
          sort = msg[key];
          break;
      }
    }
    const order = await this.prisma.order.findMany({
      where: filter
    });
    if(sort === 'asc') {
      return order.sort((a, b) => a.amount - b.amount);
    } 
    else if(sort === 'desc') {
      return order.sort((a, b) => b.amount - a.amount);
    } 
    else {
      return order;
    }
  }
}
