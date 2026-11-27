import { mdResponse, videosMarkdown } from '../lib/markdown';

export const GET = () => mdResponse(videosMarkdown());
