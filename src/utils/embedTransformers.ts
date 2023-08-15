export const CodeSandboxTransformer = {
  name: "CodeSandbox",
  // shouldTransform can also be async
  shouldTransform(url: string) {
    const { host, pathname } = new URL(url);

    return (
      ["codesandbox.io", "www.codesandbox.io"].includes(host) &&
      pathname.includes("/p/")
    );
  },
  // getHTML can also be async
  getHTML(url: string) {
    const iframeUrl = url;

    return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
  },
};

export const YoutubeTransformer = {
  name: "Youtube",
  shouldTransform(url: string) {
    const { host } = new URL(url);
    return ["youtube.com", "www.youtube.com"].includes(host);
  },
  getHTML(url: string) {
    return `<iframe src="https://www.youtube.com/embed/${
      url.split("v=")[1]
    }" style="width:100%; height:500px; frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  },
};
