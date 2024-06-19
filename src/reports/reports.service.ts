import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/report.dto';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }

    async validateIfUserExists(userId: number): Promise<boolean> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });

        if (!user) throw new BadRequestException('no existe el usuario');

        return true;
    }

    async createNewReport(userId: number, report: CreateReportDto) {
        const validate = await this.validateIfUserExists(userId)

        if (!validate) throw new BadRequestException('error al crear reporte')
    }

    async editReport(userId: number, newReportBody: CreateReportDto) { }

    async statusReport() { }

    async deleteReport() { }

    async showReports() { }

    async filterReports() { }
}
