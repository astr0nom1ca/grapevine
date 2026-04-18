/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'my506u3w',
    dataset: 'production', 
  },
    deployment: {
    appId: 't0zqxsnyz1xriod3tr73mizi',
  },
})