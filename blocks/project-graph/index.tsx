import { FileBlockProps } from "@githubnext/blocks";
import { useEffect } from "react";

export default function ExampleFolderBlock({
  context,
  content,
  onRequestGitHubData,
}: FileBlockProps) {
  const projectName = JSON.parse(content).name;

  useEffect(() => {
    onRequestGitHubData(
      `/repos/${context.owner}/${context.repo}/contents/graph/static/environment.js`,
      { ref: context.sha }
    ).then((data) => {
      const script = document.createElement("script");
      script.innerHTML = atob(data.content);
      document.getElementById("nx-project-graph").appendChild(script);
      import("./static/runtime.js");
      import("./static/polyfills.js");
      import("./static/styles.js");
      import("./static/main.js");
      window.location.hash = "/projects/" + projectName;
    });
  }, []);

  const html = `
        <meta charset="utf-8" />
        <title>Nx Workspace Project Graph</title>
        
    
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
    
        <!-- Theming -->
        <script>
          if (
            localStorage.getItem('nx-dep-graph-theme') === 'dark' ||
            (localStorage.getItem('nx-dep-graph-theme') === null &&
              window.matchMedia('(prefers-color-scheme: dark)').matches)
          ) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        </script>
      <link rel="stylesheet" href="@fs/home/jason/projects/triage/blocks-test/blocks/project-graph/static/styles.css"></head>
    
      <div
        class="h-full w-full overflow-hidden bg-white text-slate-500 dark:bg-slate-900 dark:text-slate-400"
      >
        <div class="flex h-full w-full overflow-hidden p-0" id="app"></div></div>
    </html>
    
    `;

  return (
    <>
      <div
        id="nx-project-graph"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </>
  );
}
