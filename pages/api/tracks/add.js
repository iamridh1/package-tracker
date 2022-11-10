import { Prisma } from '@prisma/client'
import { prisma } from '../../../db/prisma'

export default async function handle(req, res) {
	const body = req.body
	const { type, tracknum } = body
	
	// Both of these are required.
	if (!body.type || !body.tracknum) {
		res.json({
			success : false,
			message: 'Sender or receiver not found'
		})
	}

	let track = Prisma.UserCreateInput
	track = {
		type : type,
		trackNum : tracknum
	}

	try {
		// add new track number
		const addTracks = await prisma.track.create({
			data: track,
		})
		
		res.json({
			success : true,
			message: 'Tracking number has been added successfully',
			addTracks
		})
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			// The .code property can be accessed in a type-safe manner
			if (e.code === 'P2002') {
				// response = {
				// 	message: 'There is a unique constraint violation, a new tracking cannot be created with this tracking number'
				// }
				res.json({
					success : false,
					message: 'Tracking number already exit'
				})
			}
		}
	}
}