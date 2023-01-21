export const GET_ARTICLES = {
  query: `{
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
	}`,
};
