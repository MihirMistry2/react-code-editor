import { CompletionContext, CompletionResult } from '@codemirror/autocomplete';
import { jsonCompletion } from 'codemirror-json-schema';

export const safeJsonCompletion = (schema: Record<string, any>) => {
    const source = jsonCompletion(schema);

    return (ctx: CompletionContext): CompletionResult | null => {
        const result = source(ctx);
        return Array.isArray(result) ? null : result;
    };
};
