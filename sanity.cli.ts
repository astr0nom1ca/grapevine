import { defineCliConfig } from 'sanity/cli'

// This ensures the CLI uses your env variables if they exist, 
// but falls back to your hardcoded strings as a safety net.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'my506u3w'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: {
    // This ID is specific to your Sanity hosting slot
    appId: 't0zqxsnyz1xriod3tr73mizi',
  },
})