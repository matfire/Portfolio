<script>
	import Post from '../components/post.svelte';

	export let data;
</script>

<section id="articles" class="w-full">
	<h2 class="text-center font-bold text-xl mb-4">Articles</h2>
	<div class="flex items-center justify-evenly h-96 w-full">
		{#each data.articles as article}
			<div class="h-full w-96">
				<Post post={article} />
			</div>
		{/each}
	</div>
</section>
