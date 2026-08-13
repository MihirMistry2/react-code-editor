export {
    setValidationState,
    dispatchValidationState,
} from './state/diagnosticsState';

export { validationLinter } from './validation/validationLinter';
export { validationState } from './validation/validationState';

export { createSyntaxTreeLinter } from './utils/syntaxTreeLinter';

export { cssDiagnosticsExtension, cssLinter } from './languages/css';
export { htmlDiagnosticsExtension, htmlLinter } from './languages/html';
export { jsDiagnosticsExtension, jsLinter } from './languages/javascript';
export {
    jsonDiagnosticsExtension,
    jsonLinter,
    safeJsonCompletion,
} from './json';
