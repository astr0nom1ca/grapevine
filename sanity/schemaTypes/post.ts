import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // --- 1. THE BASICS ---
    defineField({
      name: 'title',
      type: 'string',
      title: 'Headline',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    // THE MISSING LINK: The Hero Image
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Main Hero Image',
      options: {
        hotspot: true, // Allows you to crop the image inside Sanity
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    // THE DATE: Reflects when the post was actually made
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      title: 'Show in Jumbotron?',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Content Category',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'News', value: 'news' },
          { title: 'List', value: 'list' },
          { title: 'Review', value: 'review' },
          { title: 'Interview', value: 'interview' },
          { title: 'Ranking', value: 'ranking' },
          { title: 'Opinion', value: 'opinion' },
          { title: 'Guide', value: 'guide' },
          { title: 'Explainer', value: 'explainer' },
        ],
      },
    }),

    // --- 2. THE ATTRIBUTION ---
    defineField({
      name: 'authors',
      title: 'Author(s)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),

    // --- TAGS ---
    defineField({
      name: 'tags',
      title: 'Topic Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),

    // --- 3. THE "LEGO" BODY (Portable Text) ---
    defineField({
      name: 'content',
      title: 'Story Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { 
          type: 'object', 
          name: 'videoEmbed', 
          title: 'Video', 
          fields: [{ name: 'url', type: 'url', title: 'YouTube/Vimeo Link'}] 
        },
        {
          type: 'object',
          name: 'audioFile',
          title: 'Audio Clip',
          fields: [
            {
              name: 'file',
              type: 'file',
              title: 'Upload MP3',
              options: { accept: 'audio/*' },
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Audio Caption',
            },
          ],
        },
      ],
    }),
  ],
})