import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Full Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Profile URL',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Profile Picture',
      options: {
        hotspot: true, // This allows the editor to center the crop on the face
      },
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Short Biography',
      rows: 3,
    }),
  ],
})