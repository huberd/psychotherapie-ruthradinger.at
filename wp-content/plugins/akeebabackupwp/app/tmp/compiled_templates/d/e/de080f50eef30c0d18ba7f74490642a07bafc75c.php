<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/backup_frontend.blade.php */ ?>
<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

/** @var \Solo\View\Schedule\Html $this */

// Protect from unauthorized access
defined('_AKEEBA') or die();

?>
<div class="akeeba-panel--information">
    <header class="akeeba-block-header">
        <h3>
			<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP'); ?>
        </h3>
    </header>

    <div class="akeeba-block--info">
        <p>
			<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_INFO'); ?>
        </p>
        <p>
            <a class="akeeba-btn--info" href="https://www.akeeba.com/documentation/akeeba-solo/automating-your-backup.html#frontend-backup" target="_blank">
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_GENERICREADDOC'); ?>
            </a>
        </p>
    </div>
	<?php if(!$this->croninfo->info->legacyapi): ?>
    <div class="akeeba-block--failure">
        <p>
			<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_LEGACYAPI_DISABLED'); ?>
        </p>
        <p>
            <a href="<?php echo $this->escape($this->enableLegacyFrontendURL); ?>" class="akeeba-btn--teal">
                <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_BTN_ENABLE_LEGACYAPI'); ?>
            </a>
        </p>
    </div>
	<?php elseif(!trim($this->croninfo->info->secret)): ?>
    <div class="akeeba-block--failure">
        <p>
			<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_SECRET'); ?>
        </p>
        <p>
            <a href="<?php echo $this->escape($this->resetSecretWordURL); ?>" class="akeeba-btn--teal">
                <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_BTN_RESET_SECRETWORD'); ?>
            </a>
        </p>
    </div>
	<?php else: ?>
    <p>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_MANYMETHODS'); ?>
    </p>

    <h4>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_TAB_WEBCRON'); ?>
    </h4>


    <p>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON'); ?>
    </p>

    <table class="akeeba-table--striped" width="100%">
        <tr>
            <td></td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_NAME'); ?>
            </td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_NAME_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_TIMEOUT'); ?>
            </td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_TIMEOUT_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_URL'); ?>
            </td>
            <td>
                <?php echo defined('WPINC') ? '' : $this->croninfo->info->root_url.'/'; ?><?php echo $this->croninfo->frontend->path; ?>

            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_LOGIN'); ?>
            </td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_LOGINPASSWORD_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_PASSWORD'); ?>
            </td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_LOGINPASSWORD_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_EXECUTIONTIME'); ?>
            </td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_EXECUTIONTIME_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_ALERTS'); ?>
            </td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_ALERTS_INFO'); ?>
            </td>
        </tr>
        <tr>
            <td></td>
            <td>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WEBCRON_THENCLICKSUBMIT'); ?>
            </td>
        </tr>
    </table>

    <h4>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_TAB_WGET'); ?>
    </h4>

    <p>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_WGET'); ?>
        <code>
            wget --max-redirect=10000 "<?php echo defined('WPINC') ? '' : $this->croninfo->info->root_url.'/'; ?><?php echo $this->croninfo->frontend->path; ?>" -O - 1>/dev/null 2>/dev/null
        </code>
    </p>

    <h4>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_TAB_CURL'); ?>
    </h4>

    <p>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_CURL'); ?>
        <code>
            curl -L --max-redirs 1000 -v "<?php echo defined('WPINC') ? '' : $this->croninfo->info->root_url.'/'; ?><?php echo $this->croninfo->frontend->path; ?>" 1>/dev/null 2>/dev/null
        </code>
    </p>

    <h4>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_TAB_SCRIPT'); ?>
    </h4>

    <p>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_CUSTOMSCRIPT'); ?>
    </p>

    <pre>
<?php echo '&lt;?php'; ?>


$curl_handle=curl_init();
curl_setopt($curl_handle, CURLOPT_URL, '<?php echo defined('WPINC') ? '' : $this->croninfo->info->root_url.'/'; ?><?php echo $this->croninfo->frontend->path; ?>');
curl_setopt($curl_handle,CURLOPT_FOLLOWLOCATION, TRUE);
curl_setopt($curl_handle,CURLOPT_MAXREDIRS, 10000);
curl_setopt($curl_handle,CURLOPT_RETURNTRANSFER, 1);
$buffer = curl_exec($curl_handle);
curl_close($curl_handle);
if (empty($buffer))
    echo "Sorry, the backup didn't work.";
else
    echo $buffer;
<?php echo '?&gt;'; ?>

        </pre>

    <h4>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTENDBACKUP_TAB_URL'); ?>
    </h4>

    <p>
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_FRONTEND_RAWURL'); ?>
        <code>
            <?php echo defined('WPINC') ? '' : $this->croninfo->info->root_url.'/'; ?><?php echo $this->croninfo->frontend->path; ?>

        </code>
    </p>
	<?php endif; ?>
</div>
