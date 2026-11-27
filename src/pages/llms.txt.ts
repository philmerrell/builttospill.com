import { llmsTxt, textResponse } from '../lib/markdown';

export const GET = () => textResponse(llmsTxt());
