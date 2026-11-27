import { homeMarkdown, mdResponse } from '../lib/markdown';
import { getProducts, getShows } from '../lib/remote';

export const GET = async () => mdResponse(homeMarkdown(await getShows(), await getProducts()));
