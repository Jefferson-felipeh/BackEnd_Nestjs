import { 
    Injectable, 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException, 
    UnauthorizedException 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RepositoryRole } from '../role.repository';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private roleRepository: RepositoryRole
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(
                'roles', 
                [context.getClass(), context.getHandler()]
            );
            
            if (!requiredRoles || requiredRoles.length === 0) {
                return true; // Nenhuma role exigida, acesso permitido
            }
    
            const request = context.switchToHttp().getRequest();
            const user = request.user; // JWT deve conter roles corretamente
            
            if (!user || !user.sub) {
                throw new UnauthorizedException('Usuário não autenticado ou sem permissões.');
            }

            const roleUser = await this.roleRepository.getOneUser(user.sub);
            if(!roleUser) throw new ForbiddenException('Acesso negado: função insuficiente.');
            
            const verifyRoleToUser = roleUser.roles.some(role => requiredRoles.includes(role.name));

            return verifyRoleToUser;
    
        } catch (error) {
            throw new ForbiddenException(error.message || 'Erro ao verificar permissões.');
        }
    }    
}
