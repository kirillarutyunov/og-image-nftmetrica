import { readFileSync } from 'fs';
// import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

// const montserratBlack = readFileSync(`${__dirname}/../_fonts/Montserrat-Black.woff2`).toString('base64');
// const montserratBold = readFileSync(`${__dirname}/../_fonts/Montserrat-Bold.woff2`).toString('base64');
// const montserratMedium = readFileSync(`${__dirname}/../_fonts/Montserrat-Medium.woff2`).toString('base64');
// const montserratRegular = readFileSync(`${__dirname}/../_fonts/Montserrat-Regular.woff2`).toString('base64');
// const montserratSemiBold = readFileSync(`${__dirname}/../_fonts/Montserrat-SemiBold.woff2`).toString('base64');

// const inriaBold = readFileSync(`${__dirname}/../_fonts/InriaSans-Bold.ttf`).toString('base64');
// const inriaRegular = readFileSync(`${__dirname}/../_fonts/InriaSans-Regular.ttf`).toString('base64');
// const inriaLight = readFileSync(`${__dirname}/../_fonts/InriaSans-Light.ttf`).toString('base64');


function getCss() {
    return `
    body {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }
    
    .footer {
        margin-top: 30px;
        position: relative;
        z-index: 8;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .footer__logo img {
        width: 460px;
        margin-bottom: 15px;
    }
    
    .footer__logo,
    .footer__label {
        text-align: center;
    }
    
    .footer__label {
        font-size: 40px;
        font-family: 'Inria Sans';
        font-weight: 300;
        color: #000;
    }
    
    .card {
        width: 100%;
    }

    .post-data {
        margin-bottom: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        z-index: 10;
        width: 100%;
    }
    
    .post-data__main {
        width: 65%;
    }
    
    .post-data__title {
        padding-right: 30px;
    }
    
    .post-data__photo {
        width: 520px;
        flex: 0 0 470px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 520px;
        width: 520px;
    }
    
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 0;
    }
    
    .post-data__photo img {
        width: 720px;
        height: 400px;
        border-radius: 15px;
        object-fit: cover;
        filter: drop-shadow(0px -1px 4px rgba(0, 0, 0, 0.05)) drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1));
    }

    .logo-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        justify-items: center;
    }

    .logo {
        margin: 0 75px;
    }
 
    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 150px;
        width: 100%;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .post-data__preheader {
        color: #7209B7;
    }
    
    .post-data__preheader,
    .heading {
        font-family: 'Inria Sans';
        font-weight: bold;
        font-size: 90px;
        line-height: 1.1;
    }
    
    .heading > span {
        text-transform: uppercase;
    }
    
    .top-border {
        width: 100%;
        height: 30px;
        background: #7209B7;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .post-data__emojis {
        font-size: 94px;
        margin-bottom: 30px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { header, image } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inria+Sans:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="top-border"></div>
        <div class="spacer">
            <div class="card">
                <div class="post-data">
                    <div class="post-data__main">
                        <div class="post-data__preheader">NFT Collection</div>
                        <div class="post-data__title heading"><span>${emojify(sanitizeHtml(header))}</span> Price, Stats, and Review</div>
                    </div>
                    <div class="post-data__photo">${
        image ? `${getImage(image)}` : '&nbsp;'
    }</div>
                </div>
                <div class="footer">
                    <div class="footer__logo">
                        <img src="https://nftmetrica.com/wp-content/themes/nftmetrica/assets/images/nftmetrica-logo.png" alt="">
                        <div class="footer__label">NFTMetrica.com</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string, width = 'auto', height = '225') {
    return `<img
        class="post-image"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}