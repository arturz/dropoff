import SVGO from 'svgo'

const svgo = new SVGO

export default async (base64: string) => {
  const { data } = await svgo.optimize(base64)
  return data
}