/* 
// Generate package tracking.
*/

export default function handler(req, res) {
  const body = req.body
  console.log('body: ', body)

  // Both of these are required.
  if (!body.sender || !body.receiver) {
    return res.json({ data: 'Sender or receiver not found' })
  }

  // Found the name.
  // res.json({ data: `${body.sender} ${body.receiver}` })
  res.json({ data: body })
}
