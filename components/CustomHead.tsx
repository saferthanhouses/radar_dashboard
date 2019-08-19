
import Head from 'next/head'
import * as Styles from "../styles";


/**
 * Create a custom head component with basic global styling - if this was any bigger
 * load the fonts and add some metadata
 */

const CustomHead = () => (
    <div>
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Radar - Product Engineer Homework</title>
            <meta name="author" content="Joe Oliver"/>
        </Head>
        <style jsx global>{`

                body {
                    color: ${Styles.textColorLight};
                    font-family: ${Styles.primaryFontFamily};
                    font-size: ${Styles.primaryFontSize};
                    padding: 0px;
                    margin: 0px;
                }

                p, h1, h2, h3, h4 {
                    margin: 0;
                    padding: 0;
                }

                .row {
                    display: flex;
                    flex-direction: row;
                }

                .column {
                    display: flex;
                    flex-direction: column;
                }

                .align-center {
                    align-items: center;
                }

                .icon {
                    width: 42px;
                    height: 42px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 50%;
                    background: white;
                }

                .icon svg {
                    height: 18px;
                    width: 18px;
                }

            `}
        </style>
    </div>
);

export default CustomHead;
