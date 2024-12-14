import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Module({
	imports: [
		Jwt.register({ secret: 'secret', signOptions: { expiresIn: '1h' } }),
	],
	providers: [JwtService],
	exports: [JwtService],
})
export class JwtModule {}
