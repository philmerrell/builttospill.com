import { llmsFullTxt, textResponse } from '../lib/markdown';
import { getProducts, getShows } from '../lib/remote';

export const GET = async () => textResponse(llmsFullTxt(await getShows(), await getProducts()));
