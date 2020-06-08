export default (req, res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      res.setPreviewData({})
      res.end('Preview mode enabled')
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
