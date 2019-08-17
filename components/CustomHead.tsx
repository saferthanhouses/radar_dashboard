
import Head from 'next/head'
import * as Styles from "../styles";


/**
 * Create a custom head component with global styling
 */

const CustomHead = () => (
    <div>
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <style jsx global>{`
                body {
                    color: ${Styles.textColorLight};
                    font-family: ${Styles.primaryFontFamily};
                    font-size: ${Styles.primaryFontSize};
                    padding: 0px;
                    margin: 0px;
                }
            `}
        </style>
    </div>
);

export default CustomHead;
