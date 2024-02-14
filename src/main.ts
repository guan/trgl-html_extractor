import * as core from '@actions/core'
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export function run(): void {
  try {
    const repoName: string = core.getInput('repo-name')
    const webRoot = getWebroot()

    const htmlFiles = findHtmlFiles(webRoot)

    for (const file of htmlFiles) {
      const $ = loadHtmlFile(file)
      const body = $('body').html()

      const scriptSrcElements = getScriptSrcElements($)
      const scriptElementsWithoutSrc = getScriptElements($)
      const pureBody = getPureBodyHtml($)

      console.log(scriptElementsWithoutSrc.length)
      console.log(pureBody)
      // core.info(`body: ${body}`)
    }

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export function getRepoName(): string {
  const repoName = core.getInput('repo_name')
  return repoName
}

export function getWebroot(): string {
  const repoName = getRepoName()
  return repoName.split('_')[0]
}

function findHtmlFiles(dir: string): string[] {
  let htmlFiles: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      htmlFiles = htmlFiles.concat(findHtmlFiles(filePath));
    } else if (path.extname(filePath) === '.html' && !filePath.includes('/include/')) {
      htmlFiles.push(filePath);
    }
  }

  return htmlFiles;
}

function loadHtmlFile(filePath: string) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  return $;
}

function getScriptSrcElements($: cheerio.CheerioAPI) {
  return $('script[src]');
}

function getScriptElements($: cheerio.CheerioAPI) {
  return $('script:not([src])');
}

function getPureBodyHtml($: cheerio.CheerioAPI) {
  const $clone = $.load($.html());
  $clone('body script').remove()

  let bodyHtml = $clone('body').html() || '';

  // remove comments
  bodyHtml = bodyHtml.replace(/<!--[\s\S]*?-->/g, '');

  return bodyHtml
}