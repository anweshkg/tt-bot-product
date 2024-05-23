import { AuthGuard } from '@nestjs/passport';

export class RtGaurd extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
