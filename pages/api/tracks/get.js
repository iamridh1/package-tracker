import { Prisma } from '@prisma/client'
import { prisma } from '../../db/prisma'

export default async function handle(req, res) {
	try {
		// add new track number
		const track = await prisma.track.findFirst({
			where: {
                used: false
            }
		})
        
		res.json({
			success : true,
			track
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