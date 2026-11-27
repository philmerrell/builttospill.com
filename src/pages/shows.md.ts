import { mdResponse, showsMarkdown } from '../lib/markdown';
import { getShows } from '../lib/remote';

export const GET = async () => mdResponse(showsMarkdown(await getShows()));
