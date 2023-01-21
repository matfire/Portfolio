import {GET_ARTICLES} from '../utils/hashnode';

export async function load () {
  const articles = await (await fetch ('https://api.hashnode.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (GET_ARTICLES),
  })).json ();
  return {
    articles: articles.data.user.publication.posts,
  };
}
