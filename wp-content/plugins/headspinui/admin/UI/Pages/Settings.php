<?php
if (!defined('ABSPATH')) exit;
function headspin_settings_page_callback()
{

?>
<style>
    h3{
        margin: 0;
    }
    p{
        margin-top: .5rem;
        margin-bottom: .5rem;
    }
    input{
        max-width: 28rem;
    }
    aside{
        height: fit-content;
    }
    aside, main{
        box-shadow: 0 .125rem .25rem rgba(0,0,0,.075) !important
    }
    aside header{
        padding: .75rem .5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--neutral-6);
    }
    main header{
        padding: 1rem .5rem;
        margin-bottom: 1rem;
        border-bottom: 2px solid var(--neutral-6);
        display: flex;
        gap: .66rem;
        font-size: 1.5rem;
        color: var(--brand-11);
        display: flex;
        align-items: center;
        --hs-icon: currentColor;
    }
    .hs-button-action{
        --hs-icon: var(--brand-10);
        color: var(--brand-11);
        background-color: var(--brand-4);
        padding: .5rem .75rem;
        border: 1px solid transparent;
        border-radius: .25rem;
        display: flex;
        font-weight: bold;
        gap: .25rem;
        align-items: center;
    }
    .hs-button-action:hover{
        background-color: var(--brand-5);
    }
    .hs-button-action svg{
        width: 100%;
        height: 14px;
        max-width: 14px;
    }
    .headspin-admin-aside{
        font-size: 1rem;
        display: flex;
        flex-direction: column;
        gap: .33rem;
    }
    .headspin-admin-aside button{
        background-color: transparent;
        border: 1px solid transparent;
        display: flex;
        gap: .33rem;
        padding: .75rem .5rem;
        align-items: center;
        font-weight: bold;
        color: var(--neutral-11);
    }
 
    .headspin-admin-card{
        border-radius: .75rem;
        background-color: var(--neutral-3);
    }
    .headspin-admin-main{
        padding: 1.5rem 2rem;
    }
    .hs-card-section{
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
    }
    .hs-card-section + .hs-card-section{
        margin-top: 1.5rem;
    }
    .hs-card-section iframe{
       max-width: 100%;
       border-radius: .75rem;
    }
    .hs-card{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        border: 1px solid var(--neutral-6);
        border-radius: .75rem;
        flex: 1;
        min-height: 120px;
        justify-content: space-between;
        font-size: 1rem;
        color: var(--neutral-11);
    }
    a.hs-card{
        border: 1px solid var(--brand-6);
        background-color: var(--brand-3);
    }
    
    a.hs-card:hover{
        border-color: var(--brand-8);
        color: var(--brand-11);
        background-color: var(--brand-4);
        cursor: pointer;
    }
    a.hs-card:hover *{
        color: var(--brand-11);
        --hs-icon: var(--brand-11)
    }
    .hs-card-icon-title{
        display: flex;
        gap: .5rem;
        font-size: 1.25rem;
        font-weight: 600;
        align-items: center;
        letter-spacing: .05;
        color: var(--neutral-11);
    }
    .hs-card-icon-title svg{
        max-height: 1.25rem;
    }
    .hs-button-action.loading-disable{
        pointer-events: none;
        opacity: .5;
    }
    .loading-disable::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border: 4px solid transparent;
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: button-loading-spinner 1s ease infinite;
    }
    .settings-spacer-1{
        width: 100%;
        height: 1px;
        background-color: var(--neutral-6);
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
    @keyframes button-loading-spinner {
    from {
        transform: rotate(0turn);
    }

    to {
        transform: rotate(1turn);
    }
}
@media (max-width:1300px) {
  .hs-settings-canvas {
    display: flex !important;
    flex-direction: column;
  }
  .hs-settings-canvas aside,
  .hs-settings-canvas aside div
  {
    flex-direction: row !important;
    margin: 0;
    gap:0;
  }
   .hs-settings-canvas aside header,
  .hs-version
  {
  display: none !important;
  }
  .hs-tab.hs-tab{
    border-color:transparent;
    border-width: 0px;
    border-bottom-width: 2px;
  }
  .hs-tab.active{
    border-color: var(--brand-11);
  }
  .hs-tabs-container{
    padding-left: 1rem;
  }
}

</style>

 <div data-headspin="Icons Holder" style="display: none;">
            <?php require_once 'Icons.php'; ?>
</div>

<div class="hs-settings-canvas" data-theme="light" x-data="{ app :  $store.appSettings, license: $store.license_store }" style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; margin-top: 2rem; padding: 2rem; max-width: 1360px; ">
<?php require_once 'Views/Partials/sonner-toast.php'; ?>
    <aside class="headspin-admin-card headspin-admin-aside" style="display: flex; flex-direction: column;">
        <header style="display: flex; gap: 0.25rem; padding: 1rem">
            <span>
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-headspin-logo"></use>
                </svg>  
            </span>  
            <span>Headspin</span>
           
        </header>

        <div class="hs-tabs-container" style="display: flex;flex-direction: column;">
            <button class="hs-tab" x-bind:class="{ 'active': app.activeTab == 'dashboard' }" @click="app.activeTab = 'dashboard'">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-dashboard"></use>
                </svg>
                <span>Dashboard</span>  
            </button>
            <button class="hs-tab" x-bind:class="{ 'active': app.activeTab == 'license' }" @click="app.activeTab = 'license'">
                <svg class="hs-icon hs-icon-large">
                    <use href="#ii-key"></use>
                </svg>
                <span>License</span>  
            </button>
            <div class="hs-version" style="font-size: .85rem;display: flex; gap:.25rem;border-top: 1px solid var(--neutral-6); align-items: center; padding: .75rem .5rem">
                <span>Version:</span> 
                <span><?php echo esc_html_e(HSF_VERSION) ; ?></span>
            </div>
        </div>
    </aside>

    <main class="headspin-admin-card headspin-admin-main">
        <section x-show="app.activeTab == 'dashboard' " ><?php require_once 'Settings/Dashboard.php'; ?></section>
        <section x-show="app.activeTab == 'license' " ><?php require_once 'Settings/License.php'; ?></section>
    </main>

</div>

    
<?php
}
