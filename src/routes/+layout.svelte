<script>
	import '../app.css';
	import 'iconify-icon';
</script>

<header>
	<div class="w-full h-16 flex items-center">
		<div>
			<a href="/">MatteoG</a>
		</div>
		<nav>
			<ul>
				<li><a href="/#projects">Projects</a></li>
				<li><a href="/#articles">Articles</a></li>
			</ul>
			<ul>
				<li>
					<iconify-icon icon="mdi:github" />
				</li>
			</ul>
		</nav>
	</div>
</header>
<main><slot /></main>
<footer>
	<p>&copy; {new Date().getFullYear()} - Matteo Gassend</p>
</footer>
