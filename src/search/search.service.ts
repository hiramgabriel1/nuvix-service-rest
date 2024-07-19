import { Injectable } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
    constructor(private prisma: PrismaService) { }
    // private filterPosts: [] | string = [];

    public async searchData(data: string): Promise<Posts[]> {
        let posts = await this.prisma.posts.findMany({
            where: {
                titlePost: {
                    contains: data,
                    mode: 'insensitive',
                }
            }
        });

        return posts
        // console.log(posts);

        // let response = posts.map((finded) => {
        //     this.filterPosts = finded.titlePost;

        //     if (this.filterPosts.includes(data)) return finded

        // });

        // return response;
    }
}
