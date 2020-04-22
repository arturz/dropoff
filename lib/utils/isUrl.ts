import urlRegex from 'url-regex'

export default (path: string) =>
  urlRegex().test(path)