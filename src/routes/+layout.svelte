<script>
	import '../app.css';
	import 'iconify-icon';
	import { PUBLIC_GITHUB_URL } from '$env/static/public';
</script>

<header>
	<div class="w-full h-16 flex items-center justify-between px-2 bg-slate-400 dark:bg-slate-800">
		<div>
			<a href="/">Matteo G</a>
		</div>
		<nav class="w-full md:w-1/2">
			<ul class="flex justify-evenly">
				<li><a href="/#projects">Projects</a></li>
				<li><a href="/#articles">Articles</a></li>
				<li>
					<a aria-label="github link" href={PUBLIC_GITHUB_URL} target="_blank" rel="noreferrer">
						<iconify-icon icon="mdi:github" height="1.5em" />
					</a>
				</li>
			</ul>
		</nav>
	</div>
</header>
<main><slot /></main>
<footer class="bg-slate-400 dark:bg-slate-800">
	<p>&copy; {new Date().getFullYear()} - Matteo Gassend</p>
</footer>
