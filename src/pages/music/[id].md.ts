import type { APIRoute } from 'astro';
import { albums, type Album } from '../../data';
import { albumMarkdown, mdResponse } from '../../lib/markdown';

export const getStaticPaths = () => albums.map((album) => ({ params: { id: album.id }, props: { album } }));

export const GET: APIRoute = ({ props }) => mdResponse(albumMarkdown(props.album as Album));
