// Bootstrap
import '../styles/globals.css'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/app.css'
import '../styles/components.css'


import { useEffect } from 'react'

function MyApp({ Component, pageProps }) 
{
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, [])

	return <Component className="layout-3" {...pageProps} />
}

export default MyApp
