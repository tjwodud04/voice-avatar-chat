import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Flat config (ESLint 9 / Next.js 16). `next lint` was removed in Next 16,
// so linting now runs through the ESLint CLI (`npm run lint`).
/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [...nextCoreWebVitals, ...nextTypescript];

export default eslintConfig;
