import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import bwipjs from 'bwip-js'

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
						Welcome to 
						<Link href="/">Package Tracker!</Link>
					</h1>

					<p className={styles.description}>
						Get started by tracking.
					</p>

					<div className={styles.grid}>
						<Link href="/tracks/add" className={styles.card}>
							<h2>Add Tracking Numbers &rarr;</h2>
							<p>Add tracking numbers for your tracking label generation.</p>
						</Link>

						<Link href="/labels/generate" className={styles.card}>
							<h2>Generate Tracking Label &rarr;</h2>
							<p>Instantly generate your tracking and download in png.</p>
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
