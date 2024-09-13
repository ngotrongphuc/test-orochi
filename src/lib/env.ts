function getEnv() {
  const ENV = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OROCHI_SPIDER_SERVICE_URL: process.env.OROCHI_SPIDER_SERVICE_URL,
  }

  Object.keys(ENV).forEach((key) => {
    if (!ENV[key as keyof typeof ENV]) {
      throw new Error(`Missing env: ${key}`)
    }
  })

  return ENV
}

export const ENV = getEnv()
