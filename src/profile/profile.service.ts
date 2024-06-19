import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(
        private prisma: PrismaService
    ){}

    async editMyProfile(){
        
    }

    // lista de postulantes aceptados
    async viewMyListCompanies(){

    }

    async deleteCandidate(){

    }

    
}
