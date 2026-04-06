<?php
// Avoid loading the full theme layout to make it iframe-friendly
// No header/footer for a clean embedded view
if (!current_user_can('activate_plugins')) {
    status_header(403);
    exit('Access denied');
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iframe Admin View</title>
    <link rel="stylesheet" id="headspin-ds-styles-css" type="text/css" href="<?php echo esc_url(wp_upload_dir()['baseurl'] . '/headspin-assets/headspin-base.css'); ?>">
    <style>
        body {
            font-family: system-ui, sans-serif;
            margin: 0;
            padding: 0;
            background: var(--hsx-site-background);
            color: var(--hsx-body-text-color);
        }
        section[data-hsx]{
            background: var(--hcl-neutral-1);
        }
        * {
            font-size: var(--hfs-text-m);
            color: inherit;
        }

        h1 {
            font-size: var(--hfs-h1)
        }

        h2 {
            font-size: var(--hfs-h2)
        }

        h3 {
            font-size: var(--hfs-h3)
        }

        h4 {
            font-size: var(--hfs-h4)
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
            margin: 0;
            color: var(--hsx-text-color, var(--hcl-neutral-12));
        }

        

        .bento-preview {
            display: grid !important;
            gap: 12px !important;
            grid-template-columns: 1fr 1fr 1fr 2fr 2fr .25fr;
            grid-template-rows: .8fr 2fr 2fr 1fr 1fr 1fr;
            max-width: 600px;
            overflow: hidden;

        }

        .bento-preview>div {
            grid-column: span 1;
            background: var(--hcl-neutral-3);
            border-radius: var(--hrd-m);
        }

        .bento-preview>div {
            grid-column: span 1;
            background: var(--hcl-neutral-3);
            border-radius: var(--hrd-m);
        }

        .bento-preview>div:nth-child(1) {
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }

        .bento-preview>div:nth-child(2) {
            grid-column: -2 / -3;
            grid-row: 1 / 2;
            background: var(--hcl-secondary-9, var(--hcl-brand-11));
        }

        .bento-preview>div:nth-child(3) {
            grid-column: -1 / -2;
            grid-row: 1 / -1;
        }

        .bento-preview>div:nth-child(4) {
            grid-column: 2 / 5;
            grid-row: 2 / 4;
            background: var(--hcl-primary-9, var(--hcl-brand-9));
        }

        .bento-preview>div:nth-child(5) {
            grid-column: 5 / 6;
            grid-row: 2 / 4;
            background: var(--hcl-secondary-9, var(--hcl-brand-10));
        }

        .bento-preview>div:nth-child(6) {
            grid-column: 1 / 2;
            grid-row: 3 / 5;
        }

        .bento-preview>div:nth-child(7) {
            grid-column: 2 / 4;
            grid-row: 4 / 6;
            background: var(--hcl-neutral-12);
        }

        .bento-preview>div:nth-child(8) {
            grid-column: 4 / 5;
            grid-row: 4 / 5;
        }

        .bento-preview>div:nth-child(9) {
            grid-column: 5 / 6;
            grid-row: 4 / 5;
            background: var(--hcl-primary-5, var(--hcl-brand-5))
        }

        .bento-preview>div:nth-child(10) {
            grid-column: 1 / 2;
            grid-row: -1 / -3;
            background: var(--hcl-secondary-9, var(--hcl-brand-8) )
        }

        .bento-preview>div:nth-child(11) {
            grid-column: 4 / 5;
            grid-row: -2 / -3;
            background: var(--hcl-neutral-12)
        }

        .bento-preview>div:nth-child(12) {
            grid-column: 5 / 6;
            grid-row: -1 / -3;
            background: var(--hcl-tertiary-9, var(--hcl-brand-6))
        }
        .card p{
            text-align: center 
        }

        #why-playground h3 {
            position: relative;
            z-index: 25;
        }

        #why-playground h3:before {
            content: "";
            height: 10%;
            width: 100%;
            display: block;
            z-index: -1;
            position: absolute;
            transition: all .3s ease;
            background: var(--hcl-brand-5);
            bottom: 0;
        }

        #why-playground .card:hover h3::before {
            height: 40%;
        }

        section {
            display: flex;
            flex-direction: column;
            padding-top: var(--hss-m);
            padding-bottom: var(--hss-m);
            padding-inline: var(--hsx-min-offset);
        }

        section .inner {
            display: flex;
            flex-direction: column;
            max-width: var(--hsx-page-width);
            margin-inline: auto;
            gap: var(--hss-s);
            width: 100%;
        }

        button {
            all: unset;
            background: var(--hcl-brand-9);
            color: var(--hcl-on-brand);
            border: 1px solid var(--hcl-brand-9);
            padding: var(--hsp-xxs) var(--hsp-xs);
            border-radius: var(--hrd-atom);
            font-size: 1.15rem;
        }

        .button-neutral {
            background-color: var(--hcl-neutral-1);
            border: 1px solid var(--hcl-neutral-6);
            color: var(--hcl-neutral-12);
        }

        .button-neutral:hover {
            background-color: var(--hcl-neutral-3);
            border: 1px solid var(--hcl-neutral-7);
            color: var(--hcl-neutral-12);
        }

        .columns-2 {
            display: flex;
            flex-direction: row !important;
            flex-wrap: wrap;
        }

        .columns-2>* {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--hsp-l);
        }

        .columns-3 {
            display: flex;
            flex-direction: row;
            gap: var(--hsp-m);
            flex-wrap: wrap;
        }

        .columns-3 .card {
            flex: 1;
        }

        .card {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--hsp-m);
            border: 1px solid var(--hcl-neutral-6);
            border-radius: var(--hrd-m);
            padding: var(--hsp-l);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            align-items: center;
        }

        .duotone-icon {
            fill: var(--hcl-brand-9);
            max-width: 120px;
            height: 120px;
        }

        .duotone-icon path:nth-child(2) {
            fill: var(--hcl-primary-11);
        }

        .btn-group {
            display: flex;
            gap: var(--hsp-xs);
        }


        #why-playground .inner {
            align-items: center;
        }

        em {
            position: relative;
            font-size: inherit;
            color: var(--hcl-brand-11);
        }

        ems::before {
            background-color: var(--hcl-brand-9);
            opacity: .8;
            content: "";
            display: block;
            position: absolute;
            width: calc(100% + 0.2em);
            height: 60%;
            border-radius: 1em;
            left: 0;
            bottom: .05em;
            z-index: -1;
            transform: rotate(-1.5deg);
        }
    </style>
</head>

<body>

    <section class="" data-hsx-brand="primary">
        <div class="inner columns-2">
            <div style="max-width: 33rem">
                <h1>Turn Your <em>Colors</em> & Fonts Into a Living Website</h1>
                <p>Choosing colors or typography for your website?
                    Use the Toolbar below to realize your choices.
                </p>
                <div class="btn-group">
                    <button class="button-neutral">How does it work?</button>
                    <button>Get started</button>
                </div>
            </div>
            <div class="bento-preview">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </section>
    <section id="why-playground" data-hsx-brand="secondary" >
        <div class="inner">
            <h2>Why Playground?</h2>
            <div class="columns-3">
                <div class="card iframe-box">
                    <svg class="duotone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.-->
                        <path opacity=".8" d="M32 336C32 468.5 139.5 576 272 576C293.6 576 314.5 573.1 334.4 567.8C315.1 537.9 304 502.2 304 464C304 422.2 317.4 383.5 340 352L280 352C266.7 352 256 341.3 256 328L256 130.7C256 112.2 240.3 97.4 222.2 101.2C113.5 124.1 32 220.5 32 336zM304 96L304 272C304 289.7 318.3 304 336 304L389.8 304C420.2 283.8 456.7 272 496 272C511.9 272 527.3 273.9 542.1 277.6C542.2 275.8 542.2 274 541.9 272.1C527.7 165.1 442.9 80.4 335.9 66.1C318.4 63.8 304 78.3 304 96z" />
                        <path d="M496 608C575.5 608 640 543.5 640 464C640 384.5 575.5 320 496 320C416.5 320 352 384.5 352 464C352 543.5 416.5 608 496 608zM496 368C504.8 368 512 375.2 512 384L512 392L528 392C536.8 392 544 399.2 544 408C544 416.8 536.8 424 528 424L482.2 424C476.6 424 472 428.6 472 434.2C472 439.1 475.5 443.3 480.3 444.2L525.3 452.4C545.3 456 559.9 473.5 559.9 493.9C559.9 517.2 541 536.1 517.7 536.1L511.9 536.1L511.9 544.1C511.9 552.9 504.7 560.1 495.9 560.1C487.1 560.1 479.9 552.9 479.9 544.1L479.9 536.1L463.9 536.1C455.1 536.1 447.9 528.9 447.9 520.1C447.9 511.3 455.1 504.1 463.9 504.1L517.7 504.1C523.3 504.1 527.9 499.5 527.9 493.9C527.9 489 524.4 484.8 519.6 483.9L474.6 475.7C454.6 472.1 440 454.6 440 434.2C440 411.6 457.7 393.2 480 392.1L480 384C480 375.2 487.2 368 496 368z" />
                    </svg>
                    <h3>Saves time</h3>
                    <p>No need to spend hours implementing different variations of colors. Decide right away!</p>
                </div>
                <div class="card iframe-box">
                    <svg class="duotone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path opacity=".4" d="M64 128L64 464C64 508.2 99.8 544 144 544L544 544C561.7 544 576 529.7 576 512C576 494.3 561.7 480 544 480L144 480C135.2 480 128 472.8 128 464L128 128C128 110.3 113.7 96 96 96C78.3 96 64 110.3 64 128z"/><path d="M321.7 167.8C317.2 162.8 310.7 160 304 160C297.3 160 290.9 162.8 286.3 167.8L198.3 263.8C194.2 268.2 192 274 192 280L192 392C192 405.3 202.7 416 216 416L520 416C533.3 416 544 405.3 544 392L544 280C544 273.6 541.5 267.5 537 263L473 199C463.6 189.6 448.4 189.6 439.1 199L392.8 245.3L321.7 167.8z"/></svg>
                    <h3>Consistency</h3>
                    <p>Maintain a uniform look and feel across all components and pages with centralized theme settings.</p>
                </div>
                <div class="card iframe-box">
                    <svg class="duotone-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path opacity=".4" d="M112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320zM193.9 246.5C199.1 234.3 213.2 228.7 225.4 233.9L237.3 239C263.4 250.2 291.5 256 320 256C348.5 256 376.5 250.2 402.7 239L414.6 233.9C426.8 228.7 440.9 234.3 446.1 246.5C451.3 258.7 445.7 272.8 433.5 278L421.6 283.1C404.3 290.5 386.4 296 368 299.4L368 349.5C368 353.8 368.7 358.1 370.1 362.1L398.8 448.2C403 460.8 396.2 474.4 383.6 478.6C371 482.8 357.4 476 353.2 463.4L328.8 390.2C327.5 386.4 324 383.8 320 383.8C316 383.8 312.4 386.4 311.2 390.2L286.8 463.4C282.6 476 269 482.8 256.4 478.6C243.8 474.4 237 461 241.2 448.4L269.9 362.3C271.3 358.2 272 354 272 349.7L272 299.6C253.6 296.1 235.7 290.7 218.4 283.3L206.5 278.2C194.3 273 188.7 258.9 193.9 246.7zM360 184C360 206.1 342.1 224 320 224C297.9 224 280 206.1 280 184C280 161.9 297.9 144 320 144C342.1 144 360 161.9 360 184z"/><path d="M528 320C528 205.1 434.9 112 320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM225.5 233.9L237.4 239C263.5 250.2 291.6 256 320.1 256C348.6 256 376.6 250.2 402.8 239L414.7 233.9C426.9 228.7 441 234.3 446.2 246.5C451.4 258.7 445.8 272.8 433.6 278L421.7 283.1C404.4 290.5 386.5 296 368.1 299.4L368.1 349.5C368.1 353.8 368.8 358.1 370.2 362.1L398.9 448.2C403.1 460.8 396.3 474.4 383.7 478.6C371.1 482.8 357.5 476 353.3 463.4L328.9 390.2C327.6 386.4 324.1 383.8 320.1 383.8C316.1 383.8 312.5 386.4 311.3 390.2L286.9 463.4C282.7 476 269.1 482.8 256.5 478.6C243.9 474.4 237 461 241.2 448.4L269.9 362.3C271.3 358.2 272 354 272 349.7L272 299.6C253.6 296.1 235.7 290.7 218.4 283.3L206.5 278.2C194.3 273 188.7 258.9 193.9 246.7C199.1 234.5 213.2 228.9 225.4 234.1zM320 144C342.1 144 360 161.9 360 184C360 206.1 342.1 224 320 224C297.9 224 280 206.1 280 184C280 161.9 297.9 144 320 144z"/></svg>
                    <h3>Usability</h3>
                    <p>Easily test font sizes and color contrasts in real-time to meet accessibility standards and improve UX.</p>
                </div>
            </div>
        </div>
    </section>
    <section></section>
    <section></section>


</body>

</html>