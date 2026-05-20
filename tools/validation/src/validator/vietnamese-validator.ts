import * as fs from 'fs';

import {
    franc,
} from 'franc-min';

import {
    ValidationContext,
    ValidationResult,
    Validator,
} from '../core/types';

const TEXT_EXTENSIONS = [
    '.ts',
    '.js',
    '.json',
    '.txt',
    '.md',
];

const MIN_TEXT_LENGTH = 5;

export const vietnameseValidator:
    Validator = {

    name: 'vietnamese-validator',

    validate({
        changedFiles,
    }: ValidationContext): ValidationResult[] {

        const results:
            ValidationResult[] = [];

        for (const file of changedFiles) {

            // only validate assets
            if (
                !file.startsWith('assets/')
            ) {
                continue;
            }

            const ext =
                file.substring(
                    file.lastIndexOf('.'),
                );

            // ignore unsupported files
            if (
                !TEXT_EXTENSIONS.includes(ext)
            ) {
                continue;
            }

            // ignore deleted files
            if (
                !fs.existsSync(file)
            ) {
                continue;
            }

            const content =
                fs.readFileSync(
                    file,
                    'utf8',
                );

            // extract quoted strings
            const matches =
                content.match(
                    /(['"`])((?:\\.|(?!\1).)*)\1/g,
                ) || [];

            for (const raw of matches) {

                const text =
                    raw
                        .slice(1, -1)
                        .trim();

                // ignore short text
                if (
                    text.length <
                    MIN_TEXT_LENGTH
                ) {
                    continue;
                }

                const language =
                    franc(text);

                console.log(
                    `[${file}] Detected language: ${language} for text: ${text}`,
                );

                if (
                    language === 'vie'
                ) {
                    results.push({
                        type: 'error',
                        message:
                            `[VIETNAMESE_DETECTED] ${file}\n${text}`,
                    });

                    break;
                }
            }
        }

        return results;
    },
};