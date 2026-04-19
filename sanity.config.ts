import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
// Import the types array. 
// NOTE: Make sure this is an array like [post, author] in the source file!
import { schema } from './sanity/schemaTypes' 

export default defineConfig({
  name: 'default',
  title: 'Purplebook',
  projectId: 'my506u3w', 
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
})