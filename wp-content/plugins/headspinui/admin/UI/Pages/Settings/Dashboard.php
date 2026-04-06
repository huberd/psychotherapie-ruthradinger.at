<?php if (!defined('ABSPATH')) exit;
function headspin_dahsboard_page_init()
{
?>
    <style>
        .license-status-badge {
            border-radius: 500px;
            padding: .25rem .66rem;
            font-size: .9rem;
            font-weight: bold;
            display: flex;
            gap: .33rem;
            align-items: center;
            text-transform: capitalize;
        }

        .license-status-badge[data-license="valid"] {
            color: var(--success-11);
            background-color: var(--success-3);
        }
        .license-status-badge[data-license="pro"]{
            color: var(--neutral-1);
            background-color: var(--neutral-12);
        }
        .license-status-badge .status-dot {
            display: block;
            height: 6px;
            width: 6px;
            border-radius: 500px;
            background-color: currentColor;
        }
        .video-link-list{
            border: 1px solid var(--neutral-6);
            border-radius: .5rem;
            overflow-y: auto;
            max-height: 320px;
        }
            .video-link-list-title{
            padding: 1rem;
            font-weight: bold;
        }
            .video-link-list-item{
            padding: .5rem 1rem;
            border-top: 1px solid var(--neutral-6);
            color: var(--neutral-11)
        }
            .video-link-list-item:hover{
            background-color: var(--brand-4);
            color: var(--brand-11)
        }
        .title-row{
            grid-column: 1 / -1; 
            flex-basis: 100%;
            font-size: 1.5rem;
        }
    </style>
    <header>
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-dashboard"></use>
        </svg>
        <span>Dashboard</span>
    </header>
    <section class="hs-card-section">
        <div class="hs-card">
            <div class="hs-card-icon-title">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-headspin-logo"></use>
                </svg>
                <div>Copilot</div>
            </div>
            <div style="display: flex; gap:.33rem; align-items: center">
                <span>Version:</span>
                <span x-bind:data-license="license.version" class="license-status-badge"><span class="status-dot"></span><span x-text="license.version"></span></span>
            </div>
        </div>
        <div class="hs-card">
            <div class="hs-card-icon-title">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-key"></use>
                </svg>
                <div>License</div>
            </div>
            <div style="display: flex; gap:.33rem; align-items: center">
                <span>Status:</span>
                <span x-bind:data-license="license.status" class="license-status-badge"><span class="status-dot"></span><span x-text="license.status"></span></span>
            </div>
        </div>
    </section>
    <div class="settings-spacer-1"></div>
    <section class="hs-card-section" style="display: grid; grid-template-columns: 1fr 1fr;">
        <h3 class="title-row">Video content</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/9FUdZGN3WmI?si=muSdRI_anTSzHHjB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <div class="video-link-list" style="display: flex;flex-direction:column;">
            <div class="video-link-list-title" style="display: flex; flex-direction: columns; align-items: center; gap: .5rem">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-youtube"></use>
                </svg>
                <div>Video library</div>
            </div>
            <template x-for="video in $store.dashboard.youtube">
                <a class="video-link-list-item" target="_blank" x-bind:href="video.link" style="display: flex; gap: .75rem; min-height: 40px; cursor: pointer">
                    <svg class="hs-icon hs-icon-large">
                        <use href="#ii-video"></use>
                    </svg>
                    <span x-text="video.title"></span>
                </a>
            </template>
        </div>
    </section>
    <div class="settings-spacer-1"></div>
    <section class="hs-card-section" href="https://headspinui.com/documentation/" target="_blank">
        <h3 class="title-row">Resources</h3>
        <a class="hs-card">
            <div class="hs-card-icon-title">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-clipboard"></use>
                </svg>
                <div>Documentation</div>
            </div>
            <div>
                <span> Learn how to configure and debug issues with our detailed documentation </span>
            </div>
        </a>
        <a class="hs-card" href="https://www.facebook.com/groups/1806471523156080" target="_blank">
            <div class="hs-card-icon-title">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-facebook"></use>
                </svg>
                <div>Facebook Community</div>
            </div>
            <div>
                <span>Get support and share tips with other users in our Facebook community </span>
            </div>
        </a>
        <a class="hs-card" href="https://discord.gg/4E6dg4bR8g" target="_blank">
            <div class="hs-card-icon-title">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-discord"></use>
                </svg>
                <div>Discord</div>
            </div>
            <div>
                <span>Get support and share tips in our Discord community</span>
            </div>
        </a>
    </section>
<?php
}
headspin_dahsboard_page_init();
