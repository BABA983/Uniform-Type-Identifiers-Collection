const fs = require('fs/promises');
const { spawn } = require('child_process');

const extensions = [
  { extension: 'h', description: 'C header file' },
  { extension: 'c', description: 'C source code' },
  { extension: 'gitattributes', description: 'Git configuration file' },
  { extension: 'gitconfig', description: 'Git configuration file' },
  { extension: 'gitignore', description: 'Git configuration file' },
  { extension: 'asp', description: 'HTML template document' },
  { extension: 'aspx', description: 'HTML template document' },
  { extension: 'cshtml', description: 'HTML template document' },
  { extension: 'jshtm', description: 'HTML template document' },
  { extension: 'jsp', description: 'HTML template document' },
  { extension: 'phtml', description: 'HTML template document' },
  { extension: 'shtml', description: 'HTML template document' },
  { extension: 'bat', description: 'Windows command script' },
  { extension: 'cmd', description: 'Windows command script' },
  { extension: 'bowerrc', description: 'Bower' },
  { extension: 'config', description: 'Configuration file' },
  { extension: 'editorconfig', description: 'Configuration file' },
  { extension: 'ini', description: 'Configuration file' },
  { extension: 'cfg', description: 'Configuration file' },
  { extension: 'hh', description: 'C++ header file' },
  { extension: 'hpp', description: 'C++ header file' },
  { extension: 'hxx', description: 'C++ header file' },
  { extension: 'h++', description: 'C++ header file' },
  { extension: 'cc', description: 'C++ source code' },
  { extension: 'cpp', description: 'C++ source code' },
  { extension: 'cxx', description: 'C++ source code' },
  { extension: 'c++', description: 'C++ source code' },
  { extension: 'm', description: 'Objective-C source code' },
  { extension: 'mm', description: 'Objective-C++ source code' },
  { extension: 'cs', description: 'C# source code' },
  { extension: 'csx', description: 'C# source code' },
  { extension: 'css', description: 'CSS' },
  { extension: 'go', description: 'Go source code' },
  { extension: 'htm', description: 'HTML' },
  { extension: 'html', description: 'HTML' },
  { extension: 'xhtml', description: 'HTML' },
  { extension: 'jade', description: 'Jade' },
  { extension: 'jav', description: 'Java' },
  { extension: 'java', description: 'Java' },
  { extension: 'js', description: 'Javascript' },
  { extension: 'jscsrc', description: 'Javascript' },
  { extension: 'jshintrc', description: 'Javascript' },
  { extension: 'mjs', description: 'Javascript' },
  { extension: 'cjs', description: 'Javascript' },
  { extension: 'json', description: 'JSON' },
  { extension: 'less', description: 'Less' },
  { extension: 'markdown', description: 'Markdown' },
  { extension: 'md', description: 'Markdown' },
  { extension: 'mdoc', description: 'Markdown' },
  { extension: 'mdown', description: 'Markdown' },
  { extension: 'mdtext', description: 'Markdown' },
  { extension: 'mdtxt', description: 'Markdown' },
  { extension: 'mdwn', description: 'Markdown' },
  { extension: 'mkd', description: 'Markdown' },
  { extension: 'mkdn', description: 'Markdown' },
  { extension: 'php', description: 'PHP' },
  { extension: 'ps1', description: 'Powershell' },
  { extension: 'psd1', description: 'Powershell' },
  { extension: 'psm1', description: 'Powershell' },
  { extension: 'py', description: 'Python' },
  { extension: 'pyi', description: 'Python' },
  { extension: 'gemspec', description: 'Ruby' },
  { extension: 'rb', description: 'Ruby' },
  { extension: 'erb', description: 'Ruby' },
  { extension: 'scss', description: 'SASS' },
  { extension: 'sass', description: 'SASS' },
  { extension: 'sql', description: 'SQL' },
  { extension: 'ts', description: 'TypeScript' },
  { extension: 'tsx', description: 'React' },
  { extension: 'jsx', description: 'React' },
  { extension: 'vue', description: 'Vue' },
  { extension: 'ascx', description: 'XML' },
  { extension: 'csproj', description: 'XML' },
  { extension: 'dtd', description: 'XML' },
  { extension: 'plist', description: 'XML' },
  { extension: 'wxi', description: 'XML' },
  { extension: 'wxl', description: 'XML' },
  { extension: 'wxs', description: 'XML' },
  { extension: 'xml', description: 'XML' },
  { extension: 'xaml', description: 'XML' },
  { extension: 'eyaml', description: 'YAML' },
  { extension: 'eyml', description: 'YAML' },
  { extension: 'yaml', description: 'YAML' },
  { extension: 'yml', description: 'YAML' },
  { extension: 'bash', description: 'Shell' },
  { extension: 'bash_login', description: 'Shell' },
  { extension: 'bash_logout', description: 'Shell' },
  { extension: 'bash_profile', description: 'Shell' },
  { extension: 'bashrc', description: 'Shell' },
  { extension: 'profile', description: 'Shell' },
  { extension: 'rhistory', description: 'Shell' },
  { extension: 'rprofile', description: 'Shell' },
  { extension: 'sh', description: 'Shell' },
  { extension: 'zlogin', description: 'Shell' },
  { extension: 'zlogout', description: 'Shell' },
  { extension: 'zprofile', description: 'Shell' },
  { extension: 'zsh', description: 'Shell' },
  { extension: 'zshenv', description: 'Shell' },
  { extension: 'zshrc', description: 'Shell' },
  { extension: 'clj', description: 'Clojure source code' },
  { extension: 'cljs', description: 'Clojure source code' },
  { extension: 'cljx', description: 'Clojure source code' },
  { extension: 'clojure', description: 'Clojure source code' },
  { extension: 'code-workspace', description: 'VS Code workspace file' },
  { extension: 'coffee', description: 'CoffeeScript source code' },
  { extension: 'csv', description: 'Comma Separated Values' },
  { extension: 'cmake', description: 'CMake script' },
  { extension: 'dart', description: 'Dart script' },
  { extension: 'diff', description: 'Diff file' },
  { extension: 'dockerfile', description: 'Dockerfile' },
  { extension: 'gradle', description: 'Gradle file' },
  { extension: 'groovy', description: 'Groovy script' },
  { extension: 'makefile', description: 'Makefile' },
  { extension: 'mk', description: 'Makefile' },
  { extension: 'lua', description: 'Lua script' },
  { extension: 'pug', description: 'Pug document' },
  { extension: 'ipynb', description: 'Jupyter' },
  { extension: 'lock', description: 'Lockfile' },
  { extension: 'log', description: 'Log file' },
  { extension: 'txt', description: 'Plain Text File' },
  { extension: 'xcodeproj', description: 'Xcode project file' },
  { extension: 'xcworkspace', description: 'Xcode workspace file' },
  { extension: 'vb', description: 'Visual Basic script' },
  { extension: 'r', description: 'R source code' },
  { extension: 'rs', description: 'Rust source code' },
  { extension: 'rst', description: 'Restructured Text document' },
  { extension: 'tex', description: 'LaTeX document' },
  { extension: 'cls', description: 'LaTeX document' },
  { extension: 'fs', description: 'F# source code' },
  { extension: 'fsi', description: 'F# signature file' },
  { extension: 'fsx', description: 'F# script' },
  { extension: 'fsscript', description: 'F# script' },
  { extension: 'svg', description: 'SVG document' },
  { extension: 'svgz', description: 'SVG document' },
  { extension: 'toml', description: 'TOML document' },
  { extension: 'swift', description: 'Swift source code' },
  { extension: 'containerfile', description: 'Containerfile' },
  { extension: 'ctp', description: 'ctp document' },
  { extension: 'dot', description: 'dot document' },
  { extension: 'edn', description: 'edn document' },
  { extension: 'handlebars', description: 'handlebars document' },
  { extension: 'hbs', description: 'hbs document' },
  { extension: 'ml', description: 'ml document' },
  { extension: 'mli', description: 'mli document' },
  { extension: 'pl', description: 'pl document' },
  { extension: 'pl6', description: 'pl6 document' },
  { extension: 'pm', description: 'pm document' },
  { extension: 'pm6', description: 'pm6 document' },
  { extension: 'pod', description: 'pod document' },
  { extension: 'pp', description: 'pp document' },
  { extension: 'properties', description: 'properties document' },
  { extension: 'psgi', description: 'psgi document' },
  { extension: 'rt', description: 'rt document' },
  { extension: 't', description: 't document' },
];

const outputFile = 'UTIs.md';

const concurrencyLimit = 100;

async function createFileAndGetMetadata(extension, description) {
  const fileName = `fixtures/1.${extension}`;

  try {
    await fs.writeFile(fileName, '');

    // Wait a moment to let MacOS update the metadata
    await sleep(3000);

    const data = await new Promise((resolve, reject) => {
      const mdls = spawn('mdls', [
        '-name',
        'kMDItemContentType',
        '-name',
        'kMDItemContentTypeTree',
        '-name',
        'kMDItemKind',
        fileName,
      ]);

      let output = '';
      mdls.stdout.on('data', (chunk) => {
        output += chunk;
      });

      mdls.on('close', (code) => {
        if (code === 0) {
          resolve(output);
        } else {
          reject(new Error(`mdls process exited with code ${code}`));
        }
      });

      mdls.on('error', reject);
    });

    let output = `## .${extension} (${description})\n\n`;
    output += '```\n';
    output += data;
    output += '```\n\n';

    console.log(`Processed .${extension}`);
    return output;
  } catch (error) {
    console.error(`Error processing .${extension}: ${error}`);
    return `Error processing .${extension}: ${error}\n\n`;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processWithConcurrencyLimit(tasks, limit) {
  const results = new Array(tasks.length);
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
    const promise = Promise.resolve().then(() => task());
    results[index] = promise;
    executing.add(promise);
    const clean = () => executing.delete(promise);
    promise.then(clean).catch(clean);
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

async function main() {
  try {
    await fs.mkdir('fixtures', { recursive: true });
    await fs.writeFile(outputFile, '');

    const tasks = extensions.map(
      ({ extension, description }) =>
        () =>
          createFileAndGetMetadata(extension, description)
    );

    const results = await processWithConcurrencyLimit(tasks, concurrencyLimit);

    await fs.writeFile(outputFile, results.join(''));

    console.log('All extensions processed');
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();
