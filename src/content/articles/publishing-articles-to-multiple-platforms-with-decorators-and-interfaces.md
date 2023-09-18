---
title: "Publishing articles to multiple platforms with decorators and interfaces"
cover_image: "https://cdn.blog.matteogassend.com/publishing-articles-to-multiple-platforms-with-decorators-and-interfaces.webp"
series: "magiedit"
tags:
- sveltekit
- typescript
---

I have been working on [magiedit](https://magiedit.magitools.app) for a while now, and a few days ago I finally merged the pull request implementing one of the main ideas I had when I started building this tool; publishing an article to different platforms at once. For now, the only supported platforms are [dev.to](https://dev.to) and [hashnode](https://hashnode.com), but the api allows for easily adding more providers if needed (medium, the fediverse, etc); that api is what I want to talk about, because it is one of the things that took me the longer to work out (and it still isn't exactly done).

## API Design

This is the code for the basic api for the platform interface:
```js
interface IBasePlatform<T> {
	settings: Record<string, string>;
	publish(article: Article): void;
	setSettings(settings: UserPreferences[]): T;
	getRequiredSettings(): string[];
	getPlatformName(): string;
}
```
It is kind of built on the builder pattern (I'll eventually write an article on that), and allows to generalize the declaration and use of any implementation of this class because each of these has the same exact invocation method (the basics of an interface, I know, but sometimes it's necessary to restate the basics).

- settings: holds all the specific settings required to use this implementation (api keys, tokens and whatnot)
- setSettings: loops over the settings and gets those required by the implementation (not very safe, but right now it what I found)
- getRequiredSettings: returns a list of keys required for the integration to work (this usually works within setSettings)
- getPlatformName: pretty self explanatory, usually used for logging of successful or unsuccesful publishing
- publish: actually handles all the publishing step (mostly handling the api call to the platform with required formatting, headers and body)

Let's take a look at a concrete example; the dev.to implementation:

```js
class DevPlatform implements IBasePlatform<DevPlatform> {
	settings: Record<string, string> = {};
	public getRequiredSettings(): string[] {
		return ['dev'];
	}

	getPlatformName(): string {
		return 'dev.to';
	}

	setSettings(settings: UserPreferences[]) {
		settings.forEach((e) => {
			if (this.getRequiredSettings().includes(e.key.split(':')[1])) {
				this.settings[e.key.split(':')[1]] = e.value;
			}
		});
		return this;
	}

	public async publish(article: Article) {
		const setting = this.settings['dev'];
		if (!setting) throw new Error('could not find required settings');
		const res = await fetch('https://dev.to/api/articles', {
			method: 'post',
			body: JSON.stringify({
				article: {
					title: article.title,
					body_markdown: article.content,
					published: article.published
				}
			}),
			headers: {
				accept: 'application/vnd.forem.api-v1+json',
				'content-type': 'application/json',
				'api-key': setting
			}
		});
		if (!res.ok) {
			throw new Error('something went wrong');
		}
	}
}
```
**NB: this does not yet support tags matching for the different platforms: that will come in a future release**

## Registering a new platform provider

### Typescript Decorators

Now that we have a (mostly) working platform implementation, how do let the program know? By using decorators!

![Season 6 What GIF by The Office](https://media3.giphy.com/media/ghuvaCOI6GOoTX0RmH/giphy.gif?cid=bcfb69442kgj0xwn63swq7t1t97b3irfiuh163t7c92wwgcn&ep=v1_gifs_search&rid=giphy.gif&ct=g)

Decorators are a way to "decorate" methods and classes; what this means is it can execute functions on classes and methods (more info [here](https://www.typescriptlang.org/docs/handbook/decorators.html)). The way I decided to use it is by creating a list of registered implementations that gets an element pushed each time a class gets "decorated"; let's take a look.

```js
const supportedPlatforms: (new () => IBasePlatform<any>)[] = [];
function RegisterPlatform(constructor: new () => IBasePlatform<any>) {
	supportedPlatforms.push(constructor);
}
```
These are the two sections used (NB: this is still not final, but for now it works enough)
- supportedPlatforms: the list of platforms with said decorator; the typing of the variables specifies that they must be something having a `new` method that returns an implementation of the interface we saw above.
- RegisterPlatform: the actual decorator function that can be used like this:
```js
@RegisterPlatform
class DevPlatform implements IBasePlatform<DevPlatform>
```

Having defined these methods, if we decorate the dev.to implementation we saw above, it will get added to the list.

**ATTENTION**: there is a caveat here, because you need to import the file containing the implementation somewhere, otherwise it will just get skipped. In magiedit, this was solved by having an index file importing all the needed implementations.

## Putting it all together

Now we have a list of all the possible implementations in a single variable and all with the same methods, but how do we use them?
For each element of the list (here `platform`), we instantiate it, call getSettings() and run publish:
```js
await new platform().setSettings(tokens).publish()
```

And voilà!

![Season 9 Thank You GIF by The Office](https://media3.giphy.com/media/1BFEEIo4h1BuTH8eqP/giphy.gif?cid=bcfb69442ubf7xftc9bpq6n6h9a2q3d5gi0q7ch5tr0w2sn3&ep=v1_gifs_search&rid=giphy.gif&ct=g)
