document.addEventListener( 'alpine:init', () => {
    Alpine.store('appSettings',{
        activeTab: 'dashboard',
    })
    jQuery(document).ready(function($) {
        $('#add-email-field').click(function() {
            var newField = '<input type="email" name="employee_emails[]" class="regular-text" /><br />';
            $('#employee-emails-container').append(newField);
        });
    });
});