import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// 1. Import the variable name you actually used
import { schema } from './sanity/schemaTypes' 

export default defineConfig({
  name: 'default',
  title: 'Purplebook',
  projectId: 'my506u3w', 
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    // 2. Map your 'schema' variable to the 'types' property
    types: schema, 
  },
})