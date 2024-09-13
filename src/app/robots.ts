import { DEFAULT_DEVELOPMENT_URL } from '@/configs/navigation'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const url = process.env.APP_URL || DEFAULT_DEVELOPMENT_URL
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: url + 'sitemap.xml',
  }
}
