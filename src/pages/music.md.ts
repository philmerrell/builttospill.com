import { discographyMarkdown, mdResponse } from '../lib/markdown';

export const GET = () => mdResponse(discographyMarkdown());
