import { Module } from '@nestjs/common';
import { CodeExecutionModule } from './code-execution/code-execution.module';

@Module({
  imports: [CodeExecutionModule],
})
export class AppModule {}
