import { lyricsMarkdown, mdResponse } from '../lib/markdown';

export const GET = () => mdResponse(lyricsMarkdown());
