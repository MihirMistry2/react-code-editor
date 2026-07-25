import type { Extension } from '@codemirror/state';
import {
    HighlightStyle,
    syntaxHighlighting,
    type TagStyle,
} from '@codemirror/language';
import { tags } from '@lezer/highlight';

import type { ThemeSyntax } from '../../../types';

export const createSyntaxHighlight = (syntax: ThemeSyntax): Extension => {
    const syntaxMap: Array<[string | undefined, TagStyle['tag']]> = [
        [syntax.keyword, tags.keyword],
        [syntax.string, tags.string],
        [syntax.number, tags.number],
        [syntax.comment, tags.comment],
        [syntax.variable, tags.variableName],
        [syntax.function, tags.function(tags.variableName)],
        [syntax.type, tags.typeName],
        [syntax.property, tags.propertyName],
        [syntax.class, tags.className],
        [syntax.tag, tags.tagName],
        [syntax.attribute, tags.attributeName],
        [syntax.operator, tags.operator],
        [syntax.punctuation, tags.punctuation],
    ];

    const highlight = syntaxMap.flatMap(([color, tag]) =>
        color ? [{ tag, color }] : [],
    );

    return syntaxHighlighting(HighlightStyle.define(highlight));
};
