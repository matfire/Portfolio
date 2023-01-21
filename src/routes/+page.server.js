import {GET_ARTICLES} from '../utils/hashnode';
import {PUBLIC_CMS_URL} from '$env/static/public';

export async function load () {
  const articles = await (await fetch ('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (GET_ARTICLES),
  })).json ();
  const projects = await (await fetch (`${PUBLIC_CMS_URL}/portfolios`)).json ();
  return {
    articles: articles.data.user.publication.posts,
    projects,
  };
}
