# Investor Machine Application

### Installing dependencies

```shell
    $ npm install
```

### Running application

```shell
    $ npm run start
```

### Running Storybook

```shell
    $ npm run storybook
```

### Adding Environment variables

Following the file .env.example:

- On Development:
  Create a .env file with the variables

- On Staging or Production
  Inject the variables using Gitlab

## Notes

Using Visual Studio Code (https://code.visualstudio.com), please install the following extensions:

- Prettier - Code formatter
- Eslint
- SonarLint
- vscode-styled-components: Styled components extension
- GitLens - Git supercharged (Recommended)
- Material Icon Theme (Recommended)
- Better Comments (Recommended)

This application makes use of husky and pre-commit hooks. It will run tests and do a lint check (considering prettier, sonar and lint rules) before allowing commits. You might need to run the following commands to give permissions:

```shell
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

## Tech Stacks

- React Query: Manage and cache backend queries as states (https://www.npmjs.com/package/@tanstack/react-query)
- ContextAPI: Native React Api, avoid prop drilling and share a app internal state globally. (https://react.dev/reference/react/useContext)
- React-hook-form: Handle forms (https://react-hook-form.com)
- Yup: Forms validation (https://www.npmjs.com/package/yup)
- Storybook: Storybook is a frontend workshop for building UI components and pages in isolation. Thousands of teams use it for UI development, testing, and documentation. (https://storybook.js.org)
- Dayjs: Handle dates (https://day.js.org)
- React Router Dom: Manage routes. (https://reactrouter.com/en/main)
- Styled Components and Sass: Components styling. (https://styled-components.com)
- i18next: Manage app languages. (https://www.i18next.com)
- Typescript: Javascript typing. (https://www.typescriptlang.org/pt/docs/handbook/react.html)
- Phosphor: All icons from teh app comes from this service. It always have to been declared in constants and called using Icon component. (https://phosphoricons.com)

## Structure

```pre
- .husky => Pre-commit configuration, run codes to be checked before commit.
- .json-server => A fake-api to help development while awaiting for a backend task to be done
- .storybook => Storybook configurations
- node_modules => NPM modules to be installed (git ignored)
- public
  \__ index.html => HTML file that integrates with ReactJS
  \__ favicon.ico => icon that is display in the browser tab for the app
- src => Source Code
  \__ api => holds files that are related with external services and state management of that
        \__ queries => Queries from react queries, it might be reused within the app.
        \__ service => function declarations to handle HTTP service calls from the backend or other services.
  \__ assets => static files such as images, fonts
  \__ configs => global configurations shared within the application
  \__ locales => Manage all languages that the app supports, all strings renderer within the UI must be declared and exported from this folder.
  \__ router => App urls controller
  \__ start => Hooks that only runs when the app starts
  \__ stories => Storybook Documentation
  \__ styles => holds global styles file, custom styles must be declared for each component.
  \__ types => global types shared within the application
  \__ utils => functions, hooks, constants shared by the app
        \__ constants => global constants shared within the application
        \__ debug => debugging functionalities that only runs in development
        \__ errors => global error classes
        \__ events => global event function (trigger events)
        \__ helpers => helper functions (logic and algorithm that will be reused within the app)
        \__ hook => React hooks with component logic that will be used within the app
        \__ http => http model that must be used for any requests
  \__ views => directory with subdirectories that are responsible for html rendering
        \__ components => global components sharable within the application
        \__ dialogs => dialogs called from more than one component
        \__ layouts => Defines header, main and footer of the app
        \__ pages => Main page UI components, must be called by a route
  \__ App.tsx => Apps root component
  \__ index.tsx => Connects React components to HTML as a SPA
  \__ react-app-env.d.ts => React typescript declarations
  \__ setupTests.ts => React-testing-library configs
- .env => Environment variables (git ignored)
- .env_example => Example hot to set environment variables
- .eslintignore => Files and folders to be ignored by lint
- .estlintrc => Lint rules
- .gitignore => Files and folders to be ignored by git
- .prettierigore => Files and folders to be ignored by code formatter
- .prettierrc => Code formatter rules
- bitbucket-pipelines.yml => Bitbucket configurations for CI/CD
- package.json => NPM configurations and dependencies
- package-lock.json => Keeps package.json history
- README.md => This file
- tsconfig.json => Typescript configuration
```

## Patterns and Directives

### Variables

- Following javascript patterns, we may use camelCase for variables and functions, Capitalization for classes or React components, to create folders we use lowercase, instead of blank space we use "-". E.g. folder-name.
- For constants use UPPERCASE and underscore for blank spaces. MY_CONSTANT, global constants must be declared in "src/constants/imConstants.ts".
- For strings that will be rendered in the UI, we must make use of the internationalization. Declare that strings in "src/locale/languages" for each of the languages we support. - The objects have to be in alphabetical order, also its keys that are always in english and PascalCase, the values are in the intended language Eg.

```javascript
// enUS.ts

export const enUS = {
  AdminPanel: {
    Drawer: {
     Interface: "interface",
    	Parameters: "parametters"
    }
  }
  common: {
    TheInvestorMachine: 'Investor Machine'
  },
}

// esUS.ts

export const esUS = {
  AdminPanel: {
    Drawer: {
     Interface: "interfaz",
    	Parameters: "parametro"
    }
  }
  common: {
TheInvestorMachine: 'Investor Machine'
  },

}
```

- To access that string follows the code:

```javascript
import { useTranslation } from 'react-i18next';

function SomeComponent() {
  const { t } = useTranslation();

  return <div>{t('Common.TheInvestorMachine')}</div>;
}
```

### Backend

- The app uses IM Back-end: https://bitbucket.org/the-investor-machine/creation_holding/src/main/

### CMS

- For content management it uses Squidex: https://squidex.io/

### UI Support

#### Browser:

Application must work properly for Edge, Safari, Chrome and Firefox and for its mobile versions as well.

#### Resolutions

Breakpoints: - Large Screens: 1025px — 1800px - Desktop / Laptop: 769px — 1024px - Tablet: 481px — 768px - Mobile: 320px — 480px

#### JSX-Components

- Use functional components, don't use const, but function declaration.
- Use .tsx (typescript) for react components, the file should be named after the feature, capitalized. Eg. Button.tsx.
- For prop drilling that takes more than 3 levels, we must use Context.API.
- Use .ts (typescript) for styled components, the file should be named after the React file + . styled, e.g. Button.styled.ts. The function must be named as the pattern "StyledButton".
- Use .tsx (typescript) for testing files, the file should be named after the React file + .test. E.g. Button.test.tsx.
- Use .tsx (typescript) for stories files, the file should be named after the React file + .stories. E.g. Button.stories.tsx.
- For services, components, queries folders we will have an index.ts file that we import and export the components. This way we focus the components imports from the index file - instead of having lots of imports lines while needing more than one component.
- Components that are created exclusively for a Page or feature shouldn't go into "src/components" , but instead inside the feature/ page directory. E.g.:
- To avoid cents or even thousands of code in one file, is a good practice to break a component/ page in sub-components.

### Styling

- All CSS classes (className) should use this pattern: "im-feature-sub-feature-action" to make debugging easier. With the Investor Machine prefix, we will be able to easily identify components we created and the others from third party libraries.
- On declaring a styled-component, add a className to identify it, this library sets a hash as a className, when we add our own class, makes it easier for us to debug.
- All colors must be set on GlobalStyles.ts in "src/styles/GlobalStyles.ts". To use one variable, just use "var(--color-variable)".

```css
.my-class {
  color: var(--my-variable);
}
```

### Hooks and Helpers

In order to avoid code repetition and make coding even faster, recurrent functions or React Components logics we should create functions and react custom hooks respectively.

### Router

- All routes must be declared in useRoutes.tsx file. Each route can have:
- Declared Routes automatically renders to Dashboard Drawer and to Welcome page modules details

```js
    routeName: {
        path: 'dashboard',              // Path used for the url
        name: 'dashboard',              // Route identifier
        flag: true,                     // Flag to enable/disable route
        element: <Page />,              // React Element that renders in this route
        fallbackPath: '/',              // Where app will redirect if permission is denied
        permission: true,               // Permission logic to grant access
        data: {},                       // Any data that route may hold and can be called using useCurrentRoute hook
        children: {                     // Sub routes that may be rendered using Router Dom Outlet
          childrenRouteName: {          // Sub route
            path: 'children-path',
            name: 'children-name',
            fallbackPath: '/',
            permission: true,
            index: true,
            element: <ChildrenPage />,
            flag: true,
            data: {},
          },
        }
    }

```

### Permissions

- Components and Pages permissions will be located in its directory following the pattern Component.permissions.tsx.
- It will be an custom hook that loads the user context and it is tested for each permission
- Al permission logic must be in this layer, the component it self just calls this custom hook

### Debugging

It is recommended to download chrome's React DevTools extension to make debugging and test performance easier.
React query has its own debugger installed in the app for development environments. Click on React-query's icon on bottom-right to open (Available only on dev mode)

### Code Quality

- Eslint: Check for the rules we set and give an error or warning message, underlining the issue.
- Prettier: Format the code according to what was set.
- React test library: run the unit tests created for components.
- Storybook: A dynamic documentation of all global components.
- SonarJS: It can recognize code cognitive complexity and code smells.
- Husky and Pre-commit: When we command git to commit, it will format the code, run Eslint (Analyses Prettier, Sonar and Lint rules) and Tests, if some test fails or lint gives any warning or error, husky throws an error and commit fails. It will only pass after we command for a commit again and everything passes through lint and tests.
- For E2E tests use IM Project: https://bitbucket.org/the-investor-machine/im-application-e2e-tests/src/main/
