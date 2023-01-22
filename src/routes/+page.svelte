<script>
	import Article from '../components/article.svelte';
	import Project from '../components/project.svelte';

	export let data;
</script>

<section>
	<p>Hej, my name's <span class="font-bold">Matteo</span> and I'm a fullstack web developer.</p>
	<a href="/cv.pdf" download="matteo_gassend_cv.pdf">This is my CV</a>
</section>

<section id="projects" class="w-full">
	<div class="w-full flex justify-center">
		<h2 class="font-bold text-xl mb-4">Projects</h2>
	</div>
	<div class="flex items-center justify-evenly h-96 w-full">
		{#each data.projects as project}
			<div class="h-full w-[30rem]">
				<Project {project} />
			</div>
		{/each}
	</div>
</section>

<section id="articles" class="w-full">
	<div class="w-full flex justify-center">
		<h2 class="font-bold text-xl mb-4">Articles</h2>
	</div>
	<div class="flex items-center justify-evenly h-96 w-full">
		{#each data.articles as article}
			<div class="h-full w-96">
				<Article post={article} />
			</div>
		{/each}
	</div>
</section>
