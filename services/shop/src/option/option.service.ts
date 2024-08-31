import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { EditOptionDto } from './dto/edit-option.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OptionService {
  constructor(private prisma: PrismaService) {}

  async create(createOptionDto: CreateOptionDto) {
    const option = await this.prisma.option.create({
      data: {
        menu: {
          connect: {
            menuId: createOptionDto.menuId
          }
        },
        name: createOptionDto.name,
        mustChoose: createOptionDto.mustChoose,
        maxChoose: createOptionDto.maxChoose,
        minChoose: createOptionDto.minChoose,
      }
    });
    await this.prisma.optionItem.createMany({
      data: createOptionDto.optionItems.map(optionItem => {
        return {
          optionId: option.optionId,
          name: optionItem.name,
          price: optionItem.price
        };
      })
    });
    return option;
  }

  async edit(id: number, updateOptionDto: EditOptionDto) {
    const option = await this.prisma.option.update({
      where: {
        optionId: id
      },
      data: {
        menu: {
          connect: {
            menuId: updateOptionDto.menuId
          }
        },
        name: updateOptionDto.name,
        mustChoose: updateOptionDto.mustChoose,
        maxChoose: updateOptionDto.maxChoose,
        minChoose: updateOptionDto.minChoose,
      }
    });
    await this.prisma.optionItem.deleteMany({
      where: {
        optionId: id
      }
    }).then(async () => {
      await this.prisma.optionItem.createMany({
        data: updateOptionDto.optionItems.map(optionItem => {
          return {
            optionId: option.optionId,
            name: optionItem.name,
            price: optionItem.price
          };
        })
      });
    });
    return option;
  }

  getOptionInfo(id: number) {
    return this.prisma.optionItem.findMany({
      where: {
        optionId: id
      }
    });
  }

  getOption(menuId: number) {
    return this.prisma.option.findMany({
      where: {
        menuId: menuId
      }
    });
  }

  async remove(id: number) {
    await this.prisma.optionItem.deleteMany({
      where: {
        optionId: id
      }
    })
    return this.prisma.option.delete({
      where: {
        optionId: id
      }
    })
  }
}
