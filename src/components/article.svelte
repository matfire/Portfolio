<script>
	import { PUBLIC_BLOG_URL } from '$env/static/public';
	export let post;
</script>

<div
	class="relative h-full bg-cover shadow-md hover:shadow-lg hover:scale-110 hover:rotate-1 duration-200 transition-transform"
	style="background-image: url({post.coverImage});"
>
	<div
		class="h-full w-full flex flex-col justify-center space-y-4 items-center top-0 left-0 z-10 dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(255,255,255,0.7)]"
	>
		<p class="text-center text-xl">{post.title}</p>
		<a
			target="_blank"
			class="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
			rel="noreferrer"
			href={`${PUBLIC_BLOG_URL}/${post.slug}-${post.cuid}`}>Read More</a
		>
	</div>
</div>
