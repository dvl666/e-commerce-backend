import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly refrector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.refrector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    console.log(requiredRoles)
    if(!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest();
    if(user.role === Role.ADMIN) return true
    return requiredRoles.some(( role ) => user.role?.includes( role ))
  }
}
