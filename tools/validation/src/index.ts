import { branchNameValidator } from "./validator/branch-name-validator";

const branchName =
  process.env.BRANCH_NAME || '';

const results =
  branchNameValidator.validate({
    branchName,
  });

if (results.length > 0) {
  for (const result of results) {
    console.error(`
[${result.type.toUpperCase()}]
${result.message}
`);
  }

  process.exit(1);
}

console.log('Validation passed');