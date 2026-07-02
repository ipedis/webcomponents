#!/usr/bin/env bash

PROJECT_NAME=$1

## check if jq is installed
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed.' >&2
  exit 1
fi

if [ -z "$PROJECT_NAME" ]; then
  echo "Please provide a project name as the first argument"
  exit 1
fi

if [ -d "packages/$PROJECT_NAME" ]; then
  echo "Project $PROJECT_NAME already exists"
  exit 1
fi

## generate boilerplate
nx g @nxext/stencil:lib $PROJECT_NAME --buildable --name=$PROJECT_NAME --style=scss --importPath=@ipedis/$PROJECT_NAME --component=true || exit 1

## remove unused files
rm -rf packages/$PROJECT_NAME/LICENSE

## copy linter config (ESLint v9 flat config; lint target is inferred by @nx/eslint/plugin)
cp bin/template/eslint.config.mjs packages/$PROJECT_NAME
cp bin/template/stencil.config.ts packages/$PROJECT_NAME

## change on stencil config the TEMPLATE_NAMESPACE
sed -i -e "s|TEMPLATE_NAMESPACE|${PROJECT_NAME}|g" "packages/${PROJECT_NAME}/stencil.config.ts" && rm "packages/${PROJECT_NAME}/stencil.config.ts-e"

## remove any generated lint target so the inferred @nx/eslint/plugin target is used
jq 'del(.targets.lint)' "packages/${PROJECT_NAME}/project.json" > tmp.$$.json && mv tmp.$$.json "packages/${PROJECT_NAME}/project.json"

## we update the package.json to add the homepage and issues url
jq '.homepage = "https://github.com/docaxess/webcomponents"' "packages/${PROJECT_NAME}/package.json" > tmp.$$.json && mv tmp.$$.json "packages/${PROJECT_NAME}/package.json"
jq '.bugs = {
    "url": "https://github.com/docaxess/webcomponents/issues",
    "email": "hi@docaxess.com"
}' "packages/${PROJECT_NAME}/package.json" > tmp.$$.json && mv tmp.$$.json "packages/${PROJECT_NAME}/package.json"

## update project.json to add th tags
jq '.tags = ["type:webcomponent"]' "packages/${PROJECT_NAME}/project.json" > tmp.$$.json && mv tmp.$$.json "packages/${PROJECT_NAME}/project.json"

echo "Project $PROJECT_NAME created"
echo "available commands:"
echo "  - nx build $PROJECT_NAME"
echo "  - nx lint $PROJECT_NAME"
echo "  - nx test $PROJECT_NAME"
echo "  - nx e2e $PROJECT_NAME"
echo "  - nx serve $PROJECT_NAME"
echo "Happy coding! 🚀"
