import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function Track() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Package Tracker</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Instantly generate your trackings and download in png." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					<Link href="/">
						Package Tracker!
					</Link>
				</h1>

				<p className={styles.description}>
					Get started by tracking.
				</p>

				<div className={styles.grid}>
					<a href="/tracks/generate" className={styles.card}>
						<h2>Generate Tracking &rarr;</h2>
						<p>Instantly generate your tracking and download in png.</p>
					</a>
				</div>
			</main>

			<footer className={styles.footer}>
				<div>
					Developed by{' '}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</div>
			</footer>
		</div>
	)
}
