import react from "@vitejs/plugin-react";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vitePluginReactRemoveAttributes from "vite-plugin-react-remove-attributes";
import svgrPlugin from "vite-plugin-svgr";

const getSsg = async () => {
  const env = loadEnv("production", __dirname);
  if (env.VITE_SSG_URL) {
    const { data } = await axios.get(env.VITE_SSG_URL);

    return data;
  }
  return import("./ssg.json");
};

export default defineConfig(async ({ mode, command }) => {
  const ssgData = mode === "production" ? await getSsg() : [];
  const pages = [
    {
      filename: "",
      template: "index.html",
      injectOptions: {
        data: {},
      },
    },
  ];

  const input: Record<string, string> = {
    main: "index.html",
  };
  const tmpPath: string[] = [];
  if (command === "build")
    for (const page of ssgData) {
      const dirPath = page.url.substring(1);
      const dirArray = dirPath.split("/");

      const lastDir = dirArray[dirArray.length - 1].length;

      if (dirPath.length > lastDir) {
        const targetDir = dirPath.substring(0, dirPath.length - lastDir);
        const firstDir = targetDir.split("/")[0];
        if (fs.existsSync(targetDir) || fs.existsSync(firstDir)) {
          throw new Error(
            "[SSG] 폴더가 이미 존재합니다, SSG를 통한 빌드는 소스코드 폴더와 경로가 겹치면 안됩니다."
          );
        }
        fs.mkdirSync(targetDir, {
          recursive: true,
        });
        tmpPath.push(firstDir);
      }
      fs.copyFileSync("index.html", dirPath + ".html");
      pages.push({
        filename: "",
        template: "/" + dirPath + ".html",
        injectOptions: {
          data: page.data,
        },
      });
      tmpPath.push((input[dirPath + ".html"] = dirPath + ".html"));
    }

  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
    MODE: mode,
  };

  return {
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
    define: {
      ...Object.keys(process.env).reduce((acc: any, key) => {
        acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
        return acc;
      }, {}),
    },
    preview: {
      port: 8080,
    },
    build: {
      manifest: true,
      outDir: "build",
      rollupOptions: {
        input,
        output: {
          manualChunks(id) {
            const lib = [
              "quill",
              "dayjs",
              "react-icons/md",
              "async-validator",
              "rc-picker",
              "rc-upload",
            ];

            for (const l of lib) if (id.includes(l)) return l;
          },
        },
      },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      watch: {
        usePolling: true,
      },
    },
    ssr: {
      noExternal: ["@chakra-ui/react", "@dev-five-git/front-components"], // required while deps.fallbackCJS is required
    },
    resolve: {
      alias: {
        "@": __dirname + "/src",
        "@routes": __dirname + "/src/routes",
        "@theme": __dirname + "/src/theme",
        "@store": __dirname + "/src/store",
        "@interfaces": __dirname + "/src/interfaces",
        "@hooks": __dirname + "/src/hooks",
        "@pages": __dirname + "/src/pages",
        "@constants": __dirname + "/src/constants",
        "@components": __dirname + "/src/components",
        "@utils": __dirname + "/src/utils",
      },
    },
    plugins: [
      react(),
      visualizer(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      createHtmlPlugin({
        minify: true,
        pages,
      }),
      vitePluginReactRemoveAttributes({
        attributes: ["data-testid"],
      }),
      command === "build" && {
        name: "end of build",
        closeBundle: async () => {
          try {
            console.info("\n[SSG] Rename build files\n");

            await Promise.all(
              tmpPath.map(
                (value) =>
                  value.includes(".html") &&
                  new Promise((resolve, reject) =>
                    fs.rename(
                      path.resolve(__dirname, "build", value),
                      path.resolve(
                        __dirname,
                        "build",
                        value.replace(".html", "")
                      ),
                      (err) => {
                        if (err) reject(err);
                        else resolve("");
                      }
                    )
                  )
              )
            );
          } catch (e) {
            console.error(e);
          } finally {
            console.info("\n[SSG] Clear tmp files\n");
            await Promise.all(
              tmpPath.map(
                (value) =>
                  new Promise((resolve) =>
                    fs.rm(value, { recursive: true }, resolve)
                  )
              )
            );
          }
        },
      },
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/tests/setup.ts",
      ssr: {
        noExternal: ["@chakra-ui/react"], // required while deps.fallbackCJS is required
      },
      include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      deps: {
        fallbackCJS: true,
      },
    },
  };
});
