import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SurveyService } from './survey.service';

@Injectable()
export class UserSurveyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private surveyService: SurveyService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const surveyId = request.params.id;
    const hasAccess = this.surveyService.checkAccess(
      surveyId,
      user.id,
      user.faculty,
    );

    if (!hasAccess) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
