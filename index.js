const prompts = require("prompts");
const { exec } = require("child_process");
const { readdirSync } = require("fs");

// Get the list of all directories for a given path
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const templates = getDirectories('./src/templates');

const choices = templates.map(template => ({title: template, value: template}));

(async () => {
  const { folder, environment} = await prompts([
    {
      type: "autocomplete",
      name: "folder",
      message: "Pick Template Name",
      choices,
    },
    {
      type: "autocomplete",
      name: "environment",
      message: "Pick Development Environment",
      choices: [
        {
          title: "development",
          description: "Select this to run development environment",
          value: "development",
        },
        {
          title: "production",
          description: "Select this to create a build",
          value: "production",
        },
      ],
    },
  ]);

  process.env.FOLDER_NAME = folder;

  process.env.NODE_ENV = environment;

  let script = "webpack-dev-server --open";

  if (process.env.NODE_ENV === "production") {
    script = "webpack";
  }

  console.log(folder, environment, script);
  const child = exec(script);


  child.stdout.on('data',(data) => {
    console.log(data);
  });
})();