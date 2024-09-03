export class CreateReportDto {
  reportDate: Date;

  title: string;

  description: string;

  status: boolean;

  requesterId: number;

  walkerId: number;

  orderId: number;

  adminId: number;
}
