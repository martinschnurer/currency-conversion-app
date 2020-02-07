const { cp } = require("shelljs");


// -> typescript can't handle other assets as modules (only ts/tsx)
cp("src/schema.graphql", "build/");