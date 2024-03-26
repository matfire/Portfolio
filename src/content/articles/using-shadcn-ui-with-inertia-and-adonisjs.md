---
title: "Using Shadcn-ui with Inertia and AdonisJS"
cover_image: "https://cdn.blog.matteogassend.com/adonisjs_inertia_shadcn_cover.webp"
publishDate: 2024-03-26
summary: "A small guide to use shadcn/ui with Inertia and AdonisJS"
tags:
- adonisjs
- reactjs
- inertiajs
- tutorial
---

Since [AdonisJS](https://adonisjs.com) V6 has experimental support for [Inertia](https://inertiajs.com), I thought it might be a good idea to see if I could configure [shadcn/ui](ui.shadcn.com) to run with the aforementioned stack.

## Configuring Inertia with AdonisJS

Since support is experimental, I'll refer you to [Adonis](https://docs.adonisjs.com/guides/inertia#installation)'s documentation on this procedure. If you're starting from scratch, it may be as simple as installing their inertia starter kit.

## Installing Shadcn/ui

To install [shadcn/ui](ui.shadcn.com), you can follow the basic instructions for Vite-based projects, but we'll need to adapt a few steps.
The one thing to keep in mind is that you need to specifiy inertia's css file as the `global CSS file` during setup.

### Where to store components and libs

I would personally advice (also, this is what I tested) to store all shadcn related files inside the `inertia` folder; i personally created a `lib` folder and had shadcn install everything in there.

### tsconfig

The documentation asks us to create aliases in both the `tsconfig` file and the `vite.config.{js|ts}` file. If you only change those in the root directory, shadcn will work fine, but your inertia pages will not be able to resolve the imports using those aliases.
You can definitely stop here for this step and modify the imported components to use a normal path instead of the aliases it includes.

But if you want to avoid that headache, there is one more tsconfig file you'll need to modify; the one inside the `inertia` folder. Just copy the same aliases you just set up in the root project.

Here's, for example, my root project tsconfig:

```js
{
  compilerOptions: {
    paths: {
      //other paths can go here
      "@/*": ["./inertia/lib/*"]
    }
  }
}
```

which then translates inside the `inertia` folder to:

```js
compilerOptions: {
  paths: {
    // other paths here
    "@/*": ["./lib/*"]
  }
}
```

as for the vite config, here's the interesting bit:

```js
{
  resolve: {
    alias: {
      // other aliases can go here
      '@': `${getDirname(import.meta.url)}/inertia/lib`
    }
  }
}
```


### Tailwind Config

After running the installation commands, we need to change a few settings from those created by default in our tailwind config file. This is because shadcn makes certain assumptions regarding the location of all our components and files.
The only thing to modify is the `content` array. If you're only using inertia (with React, in this case), you can probably use something like this:

```js
{
  content: [
    "./inertia/**/*.{js,ts,jsx,tsx}"
  ]
}
```

## Conclusion

There you go! Now you can enjoy using shadcn/ui with Inertia and AdonisJS. To demonstrate this, I built a small example you can find below:

https://codesandbox.io/p/devbox/adonis-shadcn-rntkn3?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clu8ezwgp00062v6l6kas9hzw%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clu8ezwgp00022v6l9o371wmr%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clu8ezwgp00042v6ls3fy8qaz%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clu8ezwgp00052v6lnreyzmof%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B100%252C0%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clu8ezwgp00022v6l9o371wmr%2522%253A%257B%2522id%2522%253A%2522clu8ezwgp00022v6l9o371wmr%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252F.codesandbox%252Ftasks.json%2522%252C%2522id%2522%253A%2522clu8f9lcu00gf2v6lr8loumog%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clu8f9lcu00gf2v6lr8loumog%2522%257D%252C%2522clu8ezwgp00052v6lnreyzmof%2522%253A%257B%2522id%2522%253A%2522clu8ezwgp00052v6lnreyzmof%2522%252C%2522activeTabId%2522%253A%2522clu8fgs9g01822v6lgv5psosi%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3333%252C%2522id%2522%253A%2522clu8fgs9g01822v6lgv5psosi%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%2522%257D%255D%257D%252C%2522clu8ezwgp00042v6ls3fy8qaz%2522%253A%257B%2522id%2522%253A%2522clu8ezwgp00042v6ls3fy8qaz%2522%252C%2522activeTabId%2522%253A%2522clu8ezwgp00032v6lvbpw77m7%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clu8ezwgp00032v6lvbpw77m7%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%257D%252C%257B%2522id%2522%253A%2522clu8f0zei003g2v6ludq6ewpw%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clu8f0obz01aqdkg6g3g1dgdl%2522%257D%255D%257D%257D%252C%2522showDevtools%2522%253Afalse%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D
