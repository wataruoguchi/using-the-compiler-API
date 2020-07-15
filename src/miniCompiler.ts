/**
 * # A minimal compiler
 * This example is a barebones compiler which takes a list of TypeScript files and compiles them to their corresponding JavaScript.
 *
 * We will need to create a Program, via createProgram - this will create a default CompilerHost which uses the file system to get files.
 */

/**
 * https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 */

/**
 * command example:
 * `yarn run:miniCompiler sample/person.ts > result/miniCompiler/person.txt`
 * `yarn run:miniCompiler sample/noType.ts > result/miniCompiler/noType.txt`
 */

import * as ts from "typescript";

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let emitResult = program.emit();
  // console.log('program', program);

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);
  console.log('LOG_getPreEmitDiagnostics', ts.getPreEmitDiagnostics(program));
  console.log('LOG_emitResult.diagnostics', emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    console.log('LOG_file', diagnostic.file);
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

compile(process.argv.slice(2), {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});