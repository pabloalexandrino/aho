//default document.tsx
import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='manifest' href='/manifest.json' />
                    <link rel='apple-touch-icon' href='/icon-512x512.webp' />
                    {/* favicon */}
                    <link rel='icon' href='/icon-512x512.webp' />
                    <meta name='theme-color' content='#000000' />

                    <meta
                        name='description'
                        content='Como montar sua própria Agência de Viagens online e fazer 10, 20, 30 mil reais por mês!'
                    />
                    <meta name='robots' content='index, follow' />
                    <meta name='author' content='andrinno' />

                    <meta name='theme-color' content='#000000' />
                    <meta
                        name='keywords'
                        content='Agência de Viagens, Renda, Home Office, Agência Home Office, Luiz Gregatti'
                    />
                    <meta
                        property='og:title'
                        content='Agência Home Office - Sua Agência de Viagens Online'
                    />
                    <meta
                        property='og:url'
                        content={`${process.env.NEXT_PUBLIC_URL}`}
                    />
                    <meta property='og:type' content='website' />
                    <meta
                        property='og:description'
                        content='Como montar sua própria Agência de Viagens online e fazer 10, 20, 30 mil reais por mês!.'
                    />
                    <meta
                        property='og:image'
                        content={`${process.env.NEXT_PUBLIC_URL}/icon-512x512.webp`}
                    />

                    <Script id='google-analytics' strategy='afterInteractive'>
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
                        `}
                    </Script>

                    <link rel='preconnect' href='https://connect.facebook.net' />
                    <link rel='preconnect' href='https://cdn.converteai.net' />

                    <Script id='facebook-pixel' strategy='afterInteractive'>
                        {`
                            !function(f,b,e,v,n,t,s)
                            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                            n.queue=[];t=b.createElement(e);t.async=!0;
                            t.src=v;s=b.getElementsByTagName(e)[0];
                            s.parentNode.insertBefore(t,s)}(window, document,'script',
                            'https://connect.facebook.net/en_US/fbevents.js');
                        `}
                    </Script>
                </Head>
                <body className='bg-base-100 overflow-x-hidden'>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
