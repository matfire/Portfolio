export async function GET() {
  return new Response(JSON.stringify(
    {
      "subject": "acct:mgassend@hachyderm.io",
      "aliases": [
        "https://hachyderm.io/@mgassend",
        "https://hachyderm.io/users/mgassend"
      ],
      "links":
        [
          { "rel": "http://webfinger.net/rel/profile-page", "type": "text/html", "href": "https://hachyderm.io/@mgassend" },
          { "rel": "self", "type": "application/activity+json", "href": "https://hachyderm.io/users/mgassend" },
          { "rel": "http://ostatus.org/schema/1.0/subscribe", "template": "https://hachyderm.io/authorize_interaction?uri={uri}" }
        ]
    }
  ))
}