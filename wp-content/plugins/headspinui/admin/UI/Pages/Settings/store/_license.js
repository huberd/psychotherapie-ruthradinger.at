
document.addEventListener( 'alpine:init', () => {
    Alpine.store('license_store',{
        key:  '',
        status: 'inactive',
        version: 'free',
        products:{
            copilot_free: 'invalid',
            copilot_pro: 'invalid',
        },
        onInit(){
            document.querySelector("html").setAttribute("data-theme", "light")
            this.key = HeadspinloadData.license;
            if( HeadspinloadData.access.copilot_free === 'valid' )     this.status =  'valid';
            if( HeadspinloadData.access.copilot_pro  === 'valid' )     this.version =  'pro';

            this.products.copilot_free = HeadspinloadData.access.copilot_free;
            this.products.copilot_pro = HeadspinloadData.access.copilot_pro;
        },
        
      
    })
});
jQuery(document).ready(function($) {

    jQuery('#headspin-activate-license').click(function() {
        var el = document.getElementById("headspin-activate-license");
        loading_button_ajax(el, true);
        jQuery.ajax( {
            url: HeadspinloadData.ajax_url,
            data: {
                action: 'headspin_license_activate_ajax',
                nonce: HeadspinloadData.nonce, // pass the nonce here
                license_store: Alpine.store("license_store").key,
            },
            method : 'POST', //Post method
            success : function( status ){ 
                if(status.error){
                    onActivationError(status.error);
                    loading_button_ajax(el, false);
                }
                if(status.success) {
                    
                    Alpine.store("license_store").status = status.license;
                    check_access();
                }
                //TODO: Throw some toast about status.error
             },
            error : function(error){ 
                onActivationError(error.error);
                loading_button_ajax(el, false);
            }
        } );

    });
    jQuery('#headspin-check-license').click(function() {

        check_access();
    });
    jQuery('#headspin-deactivate-license').click(function() {

        jQuery.ajax( {
            url: HeadspinloadData.ajax_url,
            data: {
                action: 'headspin_license_deactivate_ajax',
                nonce: HeadspinloadData.nonce, // pass the nonce here
            },
            method : 'POST', //Post method
            success : function( status ){ 
                Alpine.store("license_store").key = '';
                Alpine.store("license_store").status = 'deactivated';
                Alpine.store("license_store").version = "free"; 
             },
            error : function(error){ console.log(error) }
        } );

    });


    /******************* */
    function check_access() {
        jQuery.ajax( {
            url: HeadspinloadData.ajax_url,
            data: {
                action: 'headspin_license_check_ajax',
                nonce: HeadspinloadData.nonce, // pass the nonce here
                license_store: Alpine.store("license_store").key,
            },
            method : 'POST', //Post method
            success : function( status ){ 
                if(status.copilot_pro === 'valid') Alpine.store("license_store").version = "pro"
             },
            error : function(error){ 
                console.log(error);
            }
        } );
    }


    function onActivationError(key){
        console.log('onActivationError')
        var msg = ""
        switch (key) {
            case 'expired':
                msg = 'Your license key expired';
                break;
            case 'disabled':case 'revoked':
                msg = 'Your license key has been disabled.';
                break;
            case 'mssing':
            case 'site_inactive':
                msg = 'Invalid license.';
                break;
            case 'item_name_mismatch':
                    msg = 'This appears to be an invalid license key';
                    break;
            case 'no_activations_left':
                msg = __( 'Your license key has reached its activation limit.', 'headspinui' );
                break;
            default:
                msg = 'An error occurred, please try again.';
                break;
            
              
        }
    
        toast( `Unable to activate`, { type: "danger", description: msg } );
    }
    function loading_button_ajax(el, status){
     
        if(!el) return
        if(status) el.classList.add("loading-disable");
        if(!status){
            if (el.classList.contains("loading-disable"))  el.classList.remove("loading-disable");
        }

    }
});
