import * as fs from 'fs';
import * as path from 'path';
import { ValidationResult, Validator } from '../core/types';

function walk(dir: string): string[] {
    let results: string[] = [];

    const entries =
        fs.readdirSync(dir);

    for (const entry of entries) {
        const fullPath =
            path.join(dir, entry);

        const stat =
            fs.statSync(fullPath);

        if (stat.isDirectory()) {
            results =
                results.concat(walk(fullPath));

            continue;
        }

        results.push(fullPath);
    }

    return results;
}

export const metaValidator: Validator = {
    name: 'meta-validator',

    validate(): ValidationResult[] {
        const results: ValidationResult[] = [];

        const files =
            walk('assets');

        for (const file of files) {

            const fileName =
                path.basename(file);

            // ignore meta files
            if (file.endsWith('.meta')) {
                continue;
            }

            // ignore hidden files
            if (fileName.startsWith('.')) {
                continue;
            }

            const metaFile =
                `${file}.meta`;

            if (!fs.existsSync(metaFile)) {
                results.push({
                    type: 'error',
                    message:
                        `[MISSING_META] ${file}`,
                });
            }
        }

        return results;
    },
};