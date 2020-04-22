const popped = (array: any[]) => {
  const _array = [...array]
  _array.pop()
  return _array
}

//removes ?#iefix and #... from url
export default (url: string) => {
  if(url.includes('?'))
    url = popped(url.split('?')).join('')
  if(url.includes('#'))
    url = popped(url.split('#')).join('')
  
  return url
}