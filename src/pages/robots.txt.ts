import { site } from '../data/site';
import { textResponse } from '../lib/markdown';

/**
 * Everything here is public and meant to be found, by search engines and by AI
 * assistants answering "when is Built to Spill playing?". The named agents are
 * listed explicitly so the welcome is unambiguous.
 */
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'DuckAssistBot',
  'MistralAI-User',
  'CCBot',
];

export const GET = () =>
  textResponse(
    [
      'User-agent: *',
      'Allow: /',
      '',
      ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
      `Sitemap: ${site.url}/sitemap-index.xml`,
      '',
      `# Machine-readable guide to this site: ${site.url}/llms.txt`,
    ].join('\n'),
  );
