import { createSyntaxTreeLinter } from '../utils/syntaxTreeLinter';

export const cssLinter = createSyntaxTreeLinter(() => 'Syntax error in CSS');
