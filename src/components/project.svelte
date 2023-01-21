<script>
	import { PUBLIC_CMS_URL } from '$env/static/public';
	export let project;
</script>

<div
	class="relative w-full h-full bg-cover hover:scale-105 transition-transform"
	style={`background-image: url(${PUBLIC_CMS_URL}${project.cover_image.formats.small.url});`}
>
	<div
		class="w-full h-full flex flex-col justify-center items-center dark:bg-[rgba(0,0,0,0.7)] bg-[rgba(255,255,255,0.7)]"
	>
		<h2 class="text-xl">{project.title}</h2>
		<p>{project.summary}</p>
		<div class="">
			{#each project.stacks as stack}
				<iconify-icon icon={stack.icon} height="1.5em" />
			{/each}
		</div>
		<a href="/projects/{project.id}">Read More</a>
	</div>
</div>
