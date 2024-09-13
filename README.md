# aubesee-admin - Backoffice

This is the backoffice, an internal facing tool to enable our teams to manage the data, permissions, funds etc of our merchants.

## Setup
### Install
```bash
bun i
```
Duplicate the `.env.example` to create your own `.env` file in the root of the project, then:
```bash
bun run build
```

### Run

Start a development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

### Build
To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

### Debugging

#### VSCode

#### Debug Sveltekit frontend
Use your browser's devtools for dev builds. 
This is an internal app, if we need to debug on prod we can enable sourcemaps for prod builds.

##### Chrome
1. F12 or cmd+I
2. Go to source tab
3. cmd+P and search for the .svelte file
4. Add breakpoints/logpoints

#### Debug Sveltekit server

1. With debug terminal
  a. Open command palette: `Debug: Javascript Debug Terminal`
  b. In debug terminal, `bun run dev`

2. Configure debugger launch profile and start debugger

Example launch.json
```jsonc
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "vite dev",
      "request": "launch",
      "runtimeExecutable": "npx",
      "runtimeArgs": [
        "vite",
      ],
      "type": "node",
      "args": [
        "dev"
      ],
    },
  ]
}
```

#### Deployment
1. preview
   - every push, PR of any branch to main branch will generate preview url
   - url will be generated automatically - click green checkmark  besides your commit
   
     e.g. https://github.com/triple-a/aubesee-admin/runs/27665482552

2. staging
   - url: https://aubesee-admin-stg.triple-a.rocks/
   - run `bun run tag:create:staging` to generate the tag, check your tag, then push the created tag
   - you can deploy to staging from any branch

3. sandbox
   - url: https://aubesee-admin-sandbox.triple-a.rocks/
   - run `bun run tag:create:sandbox` to generate the tag, check your tag, then push the created tag
   - you can deploy to sandbox ONLY from main branch
   - deployment to sandbox requires approval from the managers/dev-in-charge

4. production
   - url: https://aubesee-admin.triple-a.rocks/
   - run `bun run tag:create:production` to generate the tag, check your tag, then push the created tag
   - you can deploy to production ONLY from main branch
   - deployment to production requires approval from the managers/dev-in-charge


### Reference
- looking for high quality crypto assets logo? https://cryptologos.cc/
