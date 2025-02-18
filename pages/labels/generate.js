/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import bwipjs from 'bwip-js'
import * as htmlToImage from 'html-to-image'
import StringMask from 'string-mask'
import styles from '../../styles/Home.module.css'
/* import axios from 'axios' */

export default function GenerateLabel() {
	const [ preview, setPreview ] = useState({
		success : false
	})

	// Handle the submit event on form submit.
	const handleSubmit = async (event) => {
		// Stop the form from submitting and refreshing the page.
		event.preventDefault()

		const form = event.target

		// Get data from the form
		const data = {
			type: form.type.value,
			sender: form.sender.value,
			receiver: form.receiver.value,
			size: form.size.value,
			weight: form.weight.value,
		}

		// Send the form data to our API and get a response.
		const response = await fetch('/api/generate', {
			body: JSON.stringify(data),	// Body of the request is the JSON data we created above.
			headers: { 'Content-Type': 'application/json' },	// Tell the server we're sending JSON.
			method: 'POST',	// The method is POST because we are sending data.
		})
		// axios.post('/api/generate', data, {
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	}
		// }).then(data => {
		// 	console.log(data)
		// })

		// Get the response data from server as JSON.
		const result = await response.json()
		const preview = result.result_data
		// console.log(preview)
		
		if (preview.success == false) {
			setPreview({
				success : false,
				status : 'Invalid address! Check your addresses.'
			})
		} else {
			const resp = await fetch('/api/tracks/get', {
				headers: { 'Content-Type': 'application/json' },
				method: 'GET',
			})
			const res = await resp.json()
			const track = res.track
	
			let char = '\u001D'
			console.log(char)
			let ai = 420
			let zip5 = preview.receiver_data.zip5
			let barcode = `${char}${ai}${zip5}${char}${track.trackNum}`
			
			let formatter = new StringMask('#### #### #### #### #### #### ##')
			let tracknum = formatter.apply(track.trackNum)
	
			preview.barcode = barcode
			preview.track = tracknum
			console.log(preview)
			setPreview(preview)
		}
	}

	const [ type, setType ] = useState('priority')
	const [ size, setSize ] = useState('4x6')

	// Handle label type change
	const handleTypeChange = event => {
		console.log(event.target.value)
		setType(event.target.value)
	}
	
	// Handle page size change
	const handleSizeChange = event => {
		console.log(event.target.value)
		setSize(event.target.value)
	}

	const handleLabelDownload = event => {
		let label = document.getElementById('my-label')
		htmlToImage.toPng(label)
		.then(function (dataUrl) {
			var link = document.createElement('a')
			link.download = 'label-4x6in.png'
			link.href = dataUrl
			link.click()
		})
	}

	const handleLabelDownloadAs8By11 = event => {
		let label = document.getElementById('my-label')
		label.style.width = '8in'
		label.style.height = '11in'
		label.style.fontSize = '18px'
		
		htmlToImage.toPng(label)
		.then(function (dataUrl) {
			var link = document.createElement('a')
			link.download = 'label-8x11in.png'
			link.href = dataUrl
			link.click()
			label.style.width = '4in'
			label.style.height = '6in'
			label.style.fontSize = '12px'
		})
	}

	useEffect(() => {
		try {
			// The return value is the canvas element
			let canvas = bwipjs.toCanvas('mycanvas', {
				bcid: 'code128', // Barcode type
				text: preview.barcode, // Text to encode
				scale: 2, // 3x scaling factor
				height: 22, // Bar height, in millimeters
				includetext: false, // Show human-readable text
				textxalign: 'center', // Always good to set this
			});
		} catch (e) {
			// `e` may be a string or Error object
			console.log(e)
		}
	})

	return (
		<div className="container">
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
						
						<div className="col-12">
							<div className="card">
								<div className="card-header">
									<h4>Generate Tracking Label</h4>
								</div>
								<div className="card-body">
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<label className="form-control-label">Type <code>*</code></label>
											<div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="priority" value="priority" 
													name="type" onChange={handleTypeChange} checked={type === 'priority'} />
													<label className="form-check-label" htmlFor="priority">Priority</label>
												</div>
												{/* <div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="express" value="express" 
													name="type" onChange={handleTypeChange} checked={type === 'express'} />
													<label className="form-check-label" htmlFor="express">Mail Express</label>
												</div> */}
												{/* <div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="signature" value="signature" 
													name="type" onChange={handleTypeChange} checked={type === 'signature'} />
													<label className="form-check-label" htmlFor="signature">Signature</label>
												</div> */}
											</div>
										</div>

										<div className="row">
											<div className="form-group col-lg-6">
												<label htmlFor="sender" className="form-control-label">Sender <code>*</code></label>
												<textarea className="form-control h-auto" id="sender" rows="6" required></textarea>
											</div>
											<div className="form-group col-lg-6">
												<label htmlFor="receiver" className="form-control-label">Receiver <code>*</code></label>
												<textarea className="form-control h-auto" id="receiver" rows="6" required></textarea>
											</div>
										</div>

										<div className="form-group">
											<label className="form-control-label">Package Weight (lb) <code>*</code></label>
											<input className="form-control" type="number" name="weight" id="weight" required />
										</div>
										
										<div className="form-group">
											<label className="form-control-label">Label Size <code>*</code></label>
											<div>
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="4x6" value="4x6" 
													name="size" onChange={handleSizeChange} checked={size === '4x6'} />
													<label className="form-check-label" htmlFor="4x6">4 x 6</label>
												</div>
												{/* <div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="8x11" value="8x11" 
													name="size" onChange={handleSizeChange} checked={size === '8x11'} />
													<label className="form-check-label" htmlFor="8x11">8 x 11</label>
												</div> */}
											</div>
										</div>

										<div className="form-group mt-3">
											<button className="btn btn-primary btn-block" type="submit">Preview</button>
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
										<button className="btn btn-primary btn-block" type="submit">Preview</button>
									</div>
								</div> */}
							</div>
						</div>
						
						<div className="col-12">
							<div className="card">
								<div className="card-header">
									<h4>Preview</h4>
								</div>
								<div className="card-body">
									{ preview.success 
									? <div style={{ overflow: 'auto' }}>
										<div className="mb-2">
											<button className="btn btn-primary btn-block me-3" type="button" onClick={handleLabelDownload}>Download</button>
											<button className="btn btn-primary btn-block" type="button" onClick={handleLabelDownloadAs8By11}>Download As 8x11</button>
										</div>

										<div id="my-label" className="bg-white text-dark p-0" style={{ border: '2px solid #000', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: '500', width: '4in', height: '6in' }}>
											<div className="w-100">
												<img src="/print-images/priority.jpg" alt="Logo" width="100%" 
												style={{ borderBottom: '4px solid black', margin: '0px' }} />
											</div>
											<div className="w-100">
												<img src="/print-images/priority2.png" alt="Logo" width="100%" 
												style={{ borderBottom: '4px solid black', margin: '0px' }} />
											</div>
											<div className="row" style={{ padding: '.5rem' }}>
												<div className="col-7">
													<address style={{ height: '100px' }}>
														{ (!preview.sender_data.name || preview.sender_data.name == 'NULL') ? null : preview.sender_data.name.toUpperCase() }<br/>
														{ (!preview.sender_data.street1 || preview.sender_data.street1 == 'NULL') ? null : preview.sender_data.street1 }
														{ (!preview.sender_data.street2 || preview.sender_data.street2 == 'NULL') ? null : ' '+preview.sender_data.street2 }<br/>
														{ (!preview.sender_data.city || preview.sender_data.city == 'NULL') ? null : ' '+preview.sender_data.city }
														{ (!preview.sender_data.state || preview.sender_data.state == 'NULL') ? null : ' '+preview.sender_data.state }
														{ (!preview.sender_data.zip5 || preview.sender_data.zip5 == 'NULL') ? null : ' '+preview.sender_data.zip5 }
														{/* { (!preview.sender_data.zip4 || preview.sender_data.zip4 == 'NULL') ? null : '-'+preview.sender_data.zip4 } */}
													</address>
													<div style={{ height: '25px' }}>
														{ (!preview.type == 'NULL') ? '<span>SIGNATURE WAIVED</span>' : null }
													</div>
												</div>
												<div className="col-5">
													<address className="text-end float-end" style={{ textTransform: 'capitalize', lineHeight: '1.5rem' }}>
														Ship Date: { preview.date }<br/>
														Weight: { preview.weight +' lb' }<br/>
													</address>
												</div>
											</div>
											<div className="col-8 offset-2 d-flex align-items-center justify-items-center">
												<address style={{ fontSize: '0.85rem', height: '80px' }}>
													{ (!preview.receiver_data.name || preview.receiver_data.name == 'NULL') ? null : preview.receiver_data.name.toUpperCase() }<br/>
													{ (!preview.receiver_data.street1 || preview.receiver_data.street1 == 'NULL') ? null : preview.receiver_data.street1 }
													{ (!preview.receiver_data.street2 || preview.receiver_data.street2 == 'NULL') ? null : ' '+preview.receiver_data.street2 }<br/>
													{ (!preview.receiver_data.city || preview.receiver_data.city == 'NULL') ? null : ' '+preview.receiver_data.city }
													{ (!preview.receiver_data.state || preview.receiver_data.state == 'NULL') ? null : ' '+preview.receiver_data.state }
													{ (!preview.receiver_data.zip5 || preview.receiver_data.zip5 == 'NULL') ? null : ' '+preview.receiver_data.zip5 }
													{ (!preview.receiver_data.zip4 || preview.receiver_data.zip4 == 'NULL') ? null : '-'+preview.receiver_data.zip4 }
												</address>
											</div>
											<div className="col-12 text-center">
												<div id="barcode" className="p-0 m-0 row" style={{ borderTop: '4px solid black' }}>
													<span className="fw-bold m-0 p-0">USPS TRACKING #EP</span>
													<canvas id="mycanvas"></canvas>
													<span className="fw-bold m-0 p-0">{ preview.track }</span>
												</div>
											</div>
											<div className="col-12 text-center">
												<div style={{ borderTop: '4px solid black', margin: '0px', height: 'auto', padding: '0px' }}>
													<img src="/print-images/shippo.jpg" alt="Logo" style={{ height: '40px', width: 'auto' }} />
												</div>
											</div>
										</div>
									</div>
									: <div className="page-error">
										<div className="page-inner">
											{ preview.status 
											? <div>
												<div className="page-description mb-5 pb-5">
													<span className="alert alert-danger">
														{ preview.status }
													</span>
												</div>
											</div>
											: <div>
												<h3 className="text-primary mb-5 pb-5">Nothing to preview!</h3> 
											</div>
											}
										</div>
									</div>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
