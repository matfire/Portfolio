
export const get = async() => {
    const data = await (await (fetch("https://api.hashnode.com", {
      method:"POST",
        headers: {
          "Content-Type":"application/json"
        }, body: JSON.stringify({query: `{
            user(username: "matfire") {
              publication {
                posts {
                  title
                  dateAdded
                  coverImage
                  slug
                  cuid
                }
              }
            }
        }`})
    }))).json()
    return new Response(JSON.stringify({
      articles: data.data.user.publication.posts
    }), {
      status:200,
      headers: {
        "Content-Type":"application/json"
      }
    })

}