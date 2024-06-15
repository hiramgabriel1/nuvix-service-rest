import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(

    ){}

    async create(user: UserDto){
        return user
    }   
}
