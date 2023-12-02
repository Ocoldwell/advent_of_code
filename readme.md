
# Advent of Code Solutions

This is a Typescript repo for my solutions to the challenges.

We can bootstrap a new solution using:
`npm run create-solution -- <year> <day>`
This will create a directory with a tsconfig.json,
package.json, template test file & solution.ts template.

This also will create a script in package.json so we can run the code:
`npm run <year>-<day>`

We can execute all code for a year with:
`npm run <year>-all`

We can also build all files into /dist files in their respective directories using build if necessary.
`npm run build`

Tests can be run:
 `npm run test`
This launches vitest to watch for files.
