import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReportDto } from './dto/report.dto';
import { Reports } from '@prisma/client';
import { errorMessage } from 'src/common/error.message';

@Injectable()
export class ReportsService {
    constructor(private prisma: PrismaService) { }
    private errorMessage: string;

    async isReportExists(postId: number) {
        const isExists = await this.prisma.reports.findFirst({
            where: {
                id: postId,
            },
        });

        if (!isExists) throw new BadRequestException('el report no existe');

        return true;
    }

    async isUserCreator(userId: number, reportId: number, _newReportBody) {
        const creatorValidate = await this.prisma.user.findFirst({
            include: {
                myReports: {
                    where: {
                        userReporteredId: userId,
                        id: reportId,
                    },
                },
            },
        });

        if (!creatorValidate)
            throw new BadRequestException(
                `el usuario ${creatorValidate.username} no creo este post`,
            );

        return true;
    }

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

    async editReport(
        reportId: number,
        userId: number,
        newReportBody: CreateReportDto,
    ) {
        const user = await this.isUserCreator(reportId, userId, newReportBody);

        if (user) {
            const reportEdited = await this.prisma.reports.updateMany({
                where: {
                    id: reportId,
                },
                data: {
                    ...newReportBody,
                },
            });

            if (!reportEdited) return this.errorMessage;

            return reportEdited;
        }
    }

    async statusReport(reportId: number, userId: number) {
        const user = await this.validateIfUserExists(userId);

        if (user) {
            const myStatusReport = await this.prisma.reports.findMany({
                where: {
                    id: reportId,
                    userReporteredId: userId,
                },
                include: {
                    userReportered: true,
                },
            });

            if (!myStatusReport) return this.errorMessage;

            return myStatusReport;
        }
    }

    async deleteReport(
        userId: number,
        reportId: number,
    ): Promise<Reports | string> {
        const reportFinder = this.isUserCreator(userId, reportId, null);

        if (reportFinder) {
            const removeReport = await this.prisma.reports.delete({
                where: {
                    id: reportId,
                },
            });

            if (!removeReport) return this.errorMessage;

            return removeReport;
        }
    }

    async showAllReports() {
        const reports = await this.prisma.reports.findMany({
            include: {
                userReportered: true,
            },
        });

        if (!reports) return this.errorMessage;

        return reports;
    }

    async showMyReports(userId: number) {
        const user = await this.validateIfUserExists(userId);

        if (user) {
            const myReports = await this.prisma.reports.findMany({
                where: {
                    userReporteredId: userId,
                },
            });

            if (!myReports) return this.errorMessage;

            return myReports;
        }
    }

    async acceptReport(reportId: number): Promise<Reports | string> {
        const reportExists = await this.isReportExists(reportId);

        if (reportExists) {
            const updated = await this.prisma.reports.update({
                where: {
                    id: reportId,
                },
                data: {
                    isResolved: true,
                },
            });

            if (!updated) return this.errorMessage;

            return updated;
        }
    }

    async declineReport(reportId: number) {
        const reportExists = await this.isReportExists(reportId);

        if (reportExists) {
            const declinedReport = await this.prisma.reports.delete({
                where: {
                    id: reportId,
                },
            });

            if (!declinedReport) return this.errorMessage;

            return declinedReport;
        }
    }
}