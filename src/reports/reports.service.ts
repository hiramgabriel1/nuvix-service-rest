import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/report.dto';
import { Reports } from '@prisma/client';

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
        const validate = await this.validateIfUserExists(userId);

        if (!validate) throw new BadRequestException('el usuario no existe');

        const reportCreated = await this.prisma.reports.createMany({
            data: {
                userReporteredId: userId,
                ...report,
            },
        });

        if (!reportCreated) throw new BadRequestException('error al crear');

        return reportCreated;
    }

    async editReport(userId: number, newReportBody: CreateReportDto) { }

    async statusReport(reportId: number, userId: number) {
        const user = await this.validateIfUserExists(userId);

        if (user) {
            return this.prisma.reports.findMany({
                where: {
                    id: reportId,
                    userReporteredId: userId,
                },
                include: {
                    userReportered: true,
                },
            });
        }
    }

    async deleteReport(userId: number, reportId: number) {
        // validar si el usuario es el creador o no del report
    }

    async showAllReports() {
        return this.prisma.reports.findMany({
            include: {
                userReportered: true
            }
        });
    }

    async showMyReports() { }

    async filterReports() { }

    // todo: admin methods
    private async acceptReport() { }
    private async declineReport() { }
}
