import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'

export default function Generate() {
	// Handle the submit event on form submit.
	const handleSubmit = async (event) => {
		// Stop the form from submitting and refreshing the page.
		event.preventDefault()

		// Cast the event target to an html form
		const form = event.target

		// Get data from the form.
		const data = {
			type: form.type.value,
			sender: form.sender.value,
			receiver: form.receiver.value,
			size: form.size.value,
			weight: form.weight.value,
		}

		// Send the form data to our API and get a response.
		const response = await fetch('/api/generate', {
			// Body of the request is the JSON data we created above.
			body: JSON.stringify(data),
			// Tell the server we're sending JSON.
			headers: {
				'Content-Type': 'application/json',
			},
			// The method is POST because we are sending data.
			method: 'POST',
		})

		// Get the response data from server as JSON.
		// If server returns the name submitted, that means the form works.
		const result = await response.json()
		console.log(result)
		alert(`Is this your full name: ${result.data.sender}`)
	}

	const [type, setType] = useState('priority');
	const [size, setSize] = useState('4x6');

	const handleTypeChange = event => {
		console.log(event.target.value);
		setType(event.target.value);
	};
	
	const handleSizeChange = event => {
		console.log(event.target.value);
		setSize(event.target.value);
	};

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
						
						<div className="col-md-6">
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

										<div className="row">
											<div className="form-group col-md-6">
												<label htmlFor="sender" className="form-control-label">Sender <code>*</code></label>
												<textarea className="form-control h-auto" id="sender" rows="6" required></textarea>
											</div>
											<div className="form-group col-md-6">
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
												<div className="form-check form-check-inline">
													<input className="form-check-input" type="radio" id="8x11" value="8x11" 
													name="size" onChange={handleSizeChange} checked={size === '8x11'} />
													<label className="form-check-label" htmlFor="8x11">8 x 11</label>
												</div>
											</div>
										</div>

										<div className="form-group mt-3">
											<button className="btn btn-primary btn-block" type="submit">Preview</button>
										</div>
									</form>
								</div>
								<hr />
								<div className="card-body">
									<div className="form-group">
										<label>Upload CSV</label>
										<input type="file" class="form-control" />
									</div>
									<div className="form-group mt-3">
										<button className="btn btn-primary btn-block" type="submit">Preview</button>
									</div>
								</div>
							</div>
						</div>
						
						<div className="col-md-6">
							<div className="card">
								<div className="card-header">
									<h4>Preview</h4>
								</div>
								<div className="card-body">
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
