import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
	return (
		<div>
			<div className={styles.container}>
				<Head>
					<title>Package Tracker</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="description" content="Instantly generate your trackings and download in png." />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className={styles.main}>
					<h1 className={styles.title}>
						Welcome to &nbsp;
						<Link href="/">Package Tracker!</Link>
					</h1>

					<p className={styles.description}>
						Get started by tracking.
					</p>

					<div className={styles.grid}>
						<Link href="/tracks/usps/add" className={styles.card}>
							<h2>Add USPS Tracking Numbers &rarr;</h2>
							<p>Add tracking numbers for your USPS tracking labels.</p>
						</Link>

						<Link href="/tracks/ups/add" className={styles.card}>
							<h2>Add UPS Tracking Numbers &rarr;</h2>
							<p>Add tracking numbers for your UPS tracking labels.</p>
						</Link>

						<Link href="/labels/generate" className={styles.card}>
							<h2>Generate Tracking Label &rarr;</h2>
							<p>Instantly generate your tracking and download.</p>
						</Link>
					</div>
				</main>

				{/* <footer className={styles.footer}>
					<div>
						Developed by{' '}
						<span className={styles.logo}>
							<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
						</span>
					</div>
				</footer> */}
			</div>
		</div>
	)
}
