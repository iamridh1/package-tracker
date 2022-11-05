/* 
// Generate package tracking.
*/
import { XMLParser } from 'fast-xml-parser'

export default async function generateTrackingLabel(req, res) {
	// Get data from request
	const body = req.body
	const { type, sender, receiver, weight, size } = body
	
	// Both of these are required.
	if (!body.sender || !body.receiver) {
		return res.json({
			success : false,
			message: 'Sender or receiver not found'
		})
	}
	
	// Validate sender and receiver address return
	const sender_data = await validateAddress(sender)
	const receiver_data = await validateAddress(receiver)
	
	const current = new Date()
	const date = `${current.getDate()}/${current.getMonth()+1}/${current.getYear()}`

	var result_data
	if ( sender_data.success && receiver_data.success) {
		result_data = {
			success : true,
			sender_data : sender_data.data,
			receiver_data : receiver_data.data,
			type, weight, size, date
		}
	} else {
		result_data = {
			success : false,
			message : "invalid address"
		}
	}
	
	res.json({
		result_data
	})
}

async function validateAddress(param) {
    const API_URL = "https://secure.shippingapis.com/ShippingAPI.dll?API="
	const VERIFY_API = "Verify"
	const USPS_USER_ID = "360DEDON0513"

	const info = param.split('\n')
	const name = info[0]
	const street1 = (info.length == 3 || info.length == 4) ? info[1] : null
	const street2 = info.length == 4 ? info[2] : null
	const add = info[info.length - 1].split(',').map(element => element.trim())
	const [ city, state_zip ] = add
	const [ state, zipcode ] = state_zip.split(' ')
	const [ zip5, zip4 ] = zipcode.length > 5 ? zipcode.split('-') : [zipcode, null]
	const URL_PARAM = `<AddressValidateRequest USERID="${USPS_USER_ID}"><Revision>1</Revision><Address ID="0"><Address1>${street1}</Address1><Address2>${street2}</Address2><City>${city}</City><State>${state}</State><Zip5>${zip5}</Zip5><Zip4>${zip4}</Zip4></Address></AddressValidateRequest>`
	
	const uri = `${API_URL}${VERIFY_API}&XML=${URL_PARAM}`
	const encoded = encodeURI(uri)
	const response = await fetch(encoded, {
		headers: {
			'Content-Type': 'text/xml',
		},
		method: 'GET',
	})
	const xmldata = await response.text()
	const options = { ignoreDeclaration: true, ignorePiTags: true, }
	const parser = new XMLParser(options)
	const result = parser.parse(xmldata)
	// console.log(result)

	var success = false
	var data = { message : "invalid address" }
	
	if (! result.AddressValidateResponse.Address.Error) {
		success = true
		data = {
			name : name,
			street1 : result.AddressValidateResponse.Address.Address2,
			street2 : result.AddressValidateResponse.Address.Address1,
			city : result.AddressValidateResponse.Address.City,
			state : result.AddressValidateResponse.Address.State,
			zip5 : result.AddressValidateResponse.Address.Zip5,
			zip4 : result.AddressValidateResponse.Address.Zip4,
		}
	}

	return {success, data}
}