import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class MatchsService {
    constructor(private prisma: PrismaService) { }

    public async getSkillsUser(userId: number): Promise<string[]> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { id: userId },
            select: { skills: true },
        });

        return user?.skills || [];
    }

    public async findMatchsByUser(userId: number): Promise<User[] | Object> {
        const userSkills = await this.getSkillsUser(userId);

        if (!userSkills.length) return [];

        const usersMatches = await this.prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: userId } },
                    { skills: { hasSome: userSkills } }, // users with one skills common
                ],
            },
            select: {
                id: true,
                username: true,
                description: true,
                descriptionLong: true,
                avatar_url: true,
                skills: true,
            },
        });

        const scoreMatches = usersMatches.map((user) => {
            const lengthCommonSkills = user.skills.filter((skill) =>
                userSkills.includes(skill),
            ).length;

            return { user, lengthCommonSkills };
        });

        return scoreMatches.sort(
            (a, b) => b.lengthCommonSkills - a.lengthCommonSkills,
        );
    }
}
