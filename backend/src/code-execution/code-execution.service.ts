import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class CodeExecutionService {

    async executeCode(language: string, code: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (language !== 'javascript') {
                reject('Currently, only Javascript is supported');
                return;
            }

            //save code to a temp file 
            const command = `node -e "${code.replace(/"/g, '\\"')}"`;

            exec(command, (error, stdout, stderr) => {
                console.log(error)
                if (error) {
                    reject(stderr || error.message);
                } else {
                    resolve(stdout);
                }
            });
        });
    }   
}
