/* 
// Generate package tracking.
*/
import DOMParser from 'react-dom'

export default async function generateTracking(req, res) {
	const API_URL = "https://secure.shippingapis.com/ShippingAPI.dll?API="
	const VERIFY_API = "Verify"
	const USPS_USER_ID = "360DEDON0513"

	const body = req.body
	// console.log('body: ', body)
	const { type, sender, receiver, weight, size } = body
	const sender_info = sender.split('\n')
	const sender_name = sender_info[0]
	const sender_street1 = sender_info.length == 3 ? sender_info[1] : null
	const sender_street2 = sender_info.length == 4 ? sender_info[1] : null
	const sender_address = sender_info[sender_info.length - 1].split(',').map(element => element.trim())
	const [ city, state_zip ] = sender_address
	const [ state, zipcode ] = state_zip.split(' ')
	const [ zip5, zip4 ] = zipcode.length > 5 ? zipcode.split('-') : [zipcode, null]
	const URL_PARAM = `<AddressValidateRequest USERID="${USPS_USER_ID}"><Revision>1</Revision><Address ID="0"><Address1>${sender_street1}</Address1><Address2>${sender_street2}</Address2><City>${city}</City><State>${state}</State><Zip5>${zip5}</Zip5><Zip4>${zip4}</Zip4></Address></AddressValidateRequest>`
	
	const uri = `${API_URL}${VERIFY_API}&XML=${URL_PARAM}`
	const encoded = encodeURI(uri);
	const response = await fetch(encoded, {
		// Tell the server we're sending JSON.
		headers: {
			'Content-Type': 'text/xml',
		},
		// The method is POST because we are sending data.
		method: 'GET',
	})
	const data = await response.text()

	console.log({ encoded, data })

	// Both of these are required.
	if (!body.sender || !body.receiver) {
		return res.json({
			data: 'Sender or receiver not found'
		})
	}

	// Found the name.
	// res.json({ data: `${body.sender} ${body.receiver}` })
	res.json({
		data: body
	})
}
