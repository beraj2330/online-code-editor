import { Controller, Post, Body } from '@nestjs/common';
import { CodeExecutionService } from './code-execution.service';

@Controller('execute')
export class CodeExecutionController {
  constructor(private readonly codeExecutionService: CodeExecutionService) {}

  @Post()
  async execute(@Body() body: { language: string; code: string }) {
    const { language, code } = body;
    try {
      const result = await this.codeExecutionService.executeCode(
        language,
        code,
      );
      console.log("Result: ", result);
      return { sucess: true, output: result };
    } catch (error) {
      return { success: false, error: error.toString() };
    }
  }
}