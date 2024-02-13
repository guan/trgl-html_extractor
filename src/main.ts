import * as core from '@actions/core'
import { wait } from './wait'
import path from 'path';



/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const repoName: string = core.getInput('repo-name')

    core.info(`RepoName: ${repoName}`)

    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString())

    // // Set outputs for other workflow steps to use
    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export function getRepoName() {
  const repoName = core.getInput('repo-name')
  return repoName
}

export function getWebroot() {
  const repoName = getRepoName()
  return repoName.split('_')[0]
}