import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

export default function Track() {
    const [ type, setType ] = useState('priority')
	
	// Handle label type change
	const handleTypeChange = event => {
		setType(event.target.value)
	}

	const [ alert, setAlert ] = useState({ status : false })

	// useEffect(() => {
	// 	console.log('first')
	// 	setTimeout(() => {
	// 		setAlert({ status : false })
	// 	}, 3000)
	// }, [])

    // Handle
	const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
		event.preventDefault()
        
        const form = event.target

		// Get data from the form
		const data = {
			type: form.type.value,
			tracknum: form.track_num.value,
		}

		const response = await fetch('/api/tracks/add', {
			// Body of the request is the JSON data we created above.
			body: JSON.stringify(data),
			// Tell the server we're sending JSON.
			headers: {
				'Content-Type': 'application/json',
			},
			// The method is POST because we are sending data.
			method: 'POST',
		})

		const result = await response.json()

		console.log(result)
		if (! result.success) {
			setAlert({
				status : true,
				variant : 'danger',
				message : result.message
			})
		} else if (result.success) {
			setAlert({
				status : true,
				variant : 'success',
				message : result.message
			})

			document.getElementById("add-track").reset()
		}

		setTimeout(() => {
			setAlert({ status : false })
		}, 3000)
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Package Tracker</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Instantly generate your trackings and download in png." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="section">
				<div className="section-header mt-2">
					<h1 className={styles.title}>
						<Link href="/">
							Package Tracker
						</Link>
					</h1>
				</div>
				<div className="section-body">
					<h2 className="section-title">Get started by generating tracking label.</h2>

					<div className="row">
						
						<div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-8 offset-sm-2">
							<div className="card">
								<div className="card-header">
									<h4>Generate Tracking Label</h4>
								</div>
								<div className="card-body">
									<form id="add-track" onSubmit={handleSubmit}>
										{ alert.status && <div className={`alert alert-${alert.variant} alert-dismissible`}>
											{ alert.message }
										</div> }

										<div className="form-group">
											<label className="form-control-label">Type <code>*</code></label>
											<div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="priority" value="priority" 
													name="type" onChange={handleTypeChange} checked={type === 'priority'} />
													<label className="form-check-label" htmlFor="priority">Priority</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="express" value="express" 
													name="type" onChange={handleTypeChange} checked={type === 'express'} />
													<label className="form-check-label" htmlFor="express">Mail Express</label>
												</div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="signature" value="signature" 
													name="type" onChange={handleTypeChange} checked={type === 'signature'} />
													<label className="form-check-label" htmlFor="signature">Signature</label>
												</div>
											</div>
										</div>

										<div className="form-group">
											<label className="form-control-label">Track Number <code>*</code></label>
											<input className="form-control" type="text" name="track_num" id="track_num" required />
										</div>
										
										<div className="form-group mt-3">
											<button className="btn btn-primary btn-block" type="submit">Add Tracker</button>
										</div>
									</form>
								</div>
								{/* <hr />
								<div className="card-body">
									<div className="form-group">
										<label>Upload CSV</label>
										<input type="file" className="form-control" />
									</div>
									<div className="form-group mt-3">
										<button className="btn btn-primary btn-block" type="submit">Add Tracker</button>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
