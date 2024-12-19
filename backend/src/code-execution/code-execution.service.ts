import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CodeExecutionService {
  async executeCode(language: string, code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const tempDir = path.join(__dirname, 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
      }
      
      const fileName = path.join(tempDir, `temp.py`);
      let command: string;

      switch (language) {
        case 'javascript':
          command = `node -e "${code.replace(/"/g, '\\"')}"`;
          break;
        case 'python':
          console.log("Language: ", language);
          console.log("FileName: ", fileName);
          fs.writeFileSync(fileName, code);
          command = `python ${fileName}`;
          break;
        case 'java':``
          fs.writeFileSync(fileName, code);
          const className = 'Main';
          const javaFile = path.join(tempDir, `${className}.java`);
          fs.renameSync(fileName, javaFile);
          command = `javac ${javaFile} && java -cp ${tempDir} ${className}`;
          break;
        case 'cpp':
          fs.writeFileSync(fileName, code);
          const outputFile = path.join(tempDir, 'a.out');
          command = `g++ ${fileName} -o ${outputFile} && ${outputFile}`;
          break;
        default:
          reject('Unsupported language.');
          return;
      }

      exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
        // Cleanup temp files
        fs.rmSync(tempDir, { recursive: true, force: true });

        if (error) {
          reject(stderr || error.message);
        } else {
          resolve(stdout);
        }
      });
    });
  }
}
