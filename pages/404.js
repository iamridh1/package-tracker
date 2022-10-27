import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function PageNotFound() {
	return (
		<div className="container">
			<Head>
				<title>Page Not Found - Package Tracker</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Instantly generate your trackings and download in png." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <section className="section">
                <div className="container mt-5">
                    <div className="page-error">
                        <div className="page-inner">
                            <h1>404</h1>
                            <div className="page-description">
                                The page you were looking for could not be found.
                            </div>
                            <div className="page-search">
                                <div className="mt-3">
                                    <Link href="/">
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="simple-footer mt-5">
                        Copyright &copy; Stisla 2018
                    </div> */}
                </div>
            </section>
		</div>
	)
}