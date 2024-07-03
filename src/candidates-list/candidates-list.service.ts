import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CandidatesList, User, WorkPost } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CandidatesListService {
  constructor(private prisma: PrismaService) {}

  async validateIfUserPostulated(
    userId: number,
    postId: number,
  ): Promise<boolean> {
    const isPostulated = await this.prisma.candidatesList.findFirst({
      where: {
        userId: userId,
        workId: postId,
      },
    });

    return isPostulated !== null;
  }

  async validatePostApplication(postId: number): Promise<WorkPost | boolean> {
    const postSearch = await this.prisma.workPost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postSearch) throw new BadGatewayException('no existe el post');

    return true;
  }

  async validateUserApplication(userId: number): Promise<User | boolean> {
    let validateIfUserExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (validateIfUserExists) return true;

    throw new BadRequestException('el usuario no existe');
  }

  async validateIfPostulatedIsRepeat(
    userId: number,
    postId: number,
  ): Promise<any> {
    const postulates = await this.prisma.candidatesList.findFirst({
      where: {
        workId: postId,
        userId: userId,
      },
    });

    if (postulates) {
      throw new BadRequestException('El usuario ya ha postulado anteriormente');
    }

    return true;
  }

  async validateUserPostulate(
    userId: number,
    postId: number,
  ): Promise<boolean> {
    const post = await this.prisma.workPost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) throw new BadRequestException('Post not found');

    if (post.authorId === userId)
      throw new BadRequestException(
        'no puede aplicar por que es el creador del post',
      );

    return true;
  }

  async sendApplication(
    userId: number,
    postId: number,
  ): Promise<CandidatesList> {
    const userValidation = await this.validateUserApplication(userId);
    const postValidation = await this.validatePostApplication(postId);
    const postulateUserValidation = await this.validateUserPostulate(
      userId,
      postId,
    );
    const validateUserRepeat = await this.validateIfPostulatedIsRepeat(
      userId,
      postId,
    );

    if (
      !(
        userValidation &&
        postValidation &&
        postulateUserValidation &&
        validateUserRepeat
      )
    )
      throw new BadGatewayException('error al intentar postular');

    const postulatePerson = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // @ts-ignore
    const postulateToProject: CandidatesList = {
      username: postulatePerson.username,
      descriptionLong: postulatePerson.descriptionLong,
      workId: postId,
      userId: postulatePerson.id,
      isAccepted: false,
      isWaitingResponse: true,
      // id: 1
    };

    const postPostulate = await this.prisma.candidatesList.createMany({
      data: {
        ...postulateToProject,
      },
    });

    if (!postPostulate)
      throw new BadRequestException('error al hacer la postulacion');

    return postulateToProject;
  }

  async approvePostulate(
    userId: number,
    postId: number,
  ): Promise<{ message: string; username: string }> {
    const hasPostulated = await this.validateIfUserPostulated(userId, postId);

    if (!hasPostulated)
      throw new BadRequestException('el usuario no ha postulado en ese post');

    const approveCandidate = await this.prisma.candidatesList.updateMany({
      where: {
        userId: userId,
        workId: postId,
      },
      data: {
        isAccepted: true,
      },
    });

    if (approveCandidate.count === 0)
      throw new BadRequestException('No se pudo aprobar la postulación');

    const getUsernameToCandidate = await this.prisma.candidatesList.findUnique({
      where: {
        id: userId,
      },
    });

    return {
      message: 'candidato aceptado',
      username: getUsernameToCandidate.username,
    };
  }

  async declinePostulate(
    userId: number,
    postId: number,
  ): Promise<{ message: string; username: string }> {
    const hasPostulated = await this.validateIfUserPostulated(userId, postId);

    if (!hasPostulated)
      throw new BadRequestException('No ha postulado el usuario');

    const decline = await this.prisma.candidatesList.updateMany({
      where: {
        userId: userId,
        workId: postId,
      },
      data: {
        isAccepted: false,
      },
    });

    if (decline.count === 0)
      throw new BadRequestException('No se pudo declinar al postulante');

    const getUsernameToCandidate = await this.prisma.candidatesList.findUnique({
      where: {
        id: userId,
      },
    });

    return {
      message: 'postulante declinad@ exitosamente',
      username: getUsernameToCandidate.username,
    };
  }

  async myCompanions(
    userId: number,
    workId: number,
  ): Promise<CandidatesList | any> {
    const validatePostulate = await this.prisma.candidatesList.findMany({
      where: {
        workId: workId,
        userId: userId,
      },
    });

    if (!validatePostulate)
      throw new BadRequestException(
        'El usuario no ha postulado para este trabajo',
      );

    const companions = await this.prisma.candidatesList.findMany({
      where: {
        workId: workId,
        isAccepted: true,
      },
      include: {
        user: true, //informacion adicional xd
      },
    });

    return companions;
  }

  async filterPostulatesByAncientDate(postId: number) {
    const findPost: WorkPost = await this.prisma.workPost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!findPost)
        throw new BadRequestException('usuario o post no existe');

    const currentDate = new Date();
    const candidates = await this.prisma.candidatesList.findMany({
      where: {
        workId: postId,
        date: {
          lt: currentDate, //lt -> less than Se utiliza en consultas para filtrar registros donde el valor de un campo es menor que un valor especificado
        },
      },
      // select: {
      //   date: true,
      // },
    });

    return candidates;
  }

  async filterPostulatesByLastDate(postId: number) {
    const findPost: WorkPost = await this.prisma.workPost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!findPost)
      throw new BadRequestException('post dont exists');

    const currentDate = new Date();
    const candidates = await this.prisma.candidatesList.findMany({
      where: {
        workId: postId,
        date: {
          gt: currentDate, // gt --> mayor o igual q
        },
      },
    });

    return candidates;
  }
}