import { DEFAULT_DEVELOPMENT_URL } from '@/configs/navigation'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.APP_URL || DEFAULT_DEVELOPMENT_URL
  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${url}orand`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}zkdatabase`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${url}blog`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
  ]
}
