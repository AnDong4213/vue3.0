export function xhr(config) {
  return new Promise(resolve => {
    const response = {
      data: config,
      status: 'request.status',
      age: config.a
    }
    resolve(response)
  })
}