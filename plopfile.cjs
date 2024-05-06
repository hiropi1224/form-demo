module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setGenerator("component", {
    description: "新しいコンポーネントを作成する",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "コンポーネントの種類",
        choices: [
          { name: "component", value: "component" },
          { name: 'component with "use client"', value: "client-component" },
          { name: 'component with "async"', value: "async-component" },
          { name: "page component", value: "page-component" },
          { name: "page", value: "page" },
        ],
      },
      {
        type: "input",
        name: "path",
        message:
          "どこにコンポーネントを作成するか。ルート、pageの場合はブランクでOK。",
      },
      {
        type: "input",
        name: "name",
        message: "ページ、コンポーネントの名前 例)button",
      },
    ],
    actions: (data) => {
      const actions = [];
      if (typeof data !== "undefined") {
        if (data.type === "async-component") {
          actions.push({
            type: "add",
            path: "components/{{path}}/{{name}}.tsx",
            templateFile: "generators/async-component.tsx.hbs",
          });
        } else if (data.type === "client-component") {
          actions.push({
            type: "add",
            path: "components/{{path}}/{{name}}.tsx",
            templateFile: "generators/client-component.tsx.hbs",
          });
        } else if (data.type === "component") {
          actions.push({
            type: "add",
            path: "components/{{path}}/{{name}}.tsx",
            templateFile: "generators/component.tsx.hbs",
          });
        } else if (data.type === "page") {
          actions.push({
            type: "add",
            path: "app/{{path}}/page.tsx",
            templateFile: "generators/page.tsx.hbs",
          });
        } else if (data.type === "page-component") {
          actions.push({
            type: "add",
            path: "app/{{path}}/_components/{{name}}.tsx",
            templateFile: "generators/component.tsx.hbs",
          });
        }
      }

      return actions;
    },
  });
};
