/**
 * # A simple transform function
 * Creating a compiler is not too many lines of code, but you may want to just get the corresponding JavaScript output given TypeScript sources. For this you can use ts.transpileModule to get a string => string transformation in two lines.
 */

/**
 * https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-simple-transform-function
 */

/**
 * command example:
 * `yarn run:simpleTransform > result/simpleTransform/result.txt`
 */

import * as ts from "typescript";
let source = "let x: string = 'string'";
let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
console.log(source);
console.log(JSON.stringify(result));

// Trying to make an irregular case.
source = "const x: string = 1";
result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});
console.log(source);
console.log(JSON.stringify(result));