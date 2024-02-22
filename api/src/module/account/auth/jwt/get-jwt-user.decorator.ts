import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJWTUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    // Assuming the JWT payload is attached to the request object as `user`.
    // You might need to adjust this depending on how your application is set up.
    return request.user;
  },
);
