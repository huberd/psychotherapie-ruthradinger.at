<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/backup.blade.php */ ?>
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
<h2>
    <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_RUN_BACKUPS'); ?>
</h2>

<p>
    <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_HEADERINFO'); ?>
</p>

<?php /* CLI CRON jobs */ ?>
<?php echo $this->loadAnyTemplate('Schedule/backup_cli'); ?>

<?php /* Alternate CLI CRON jobs (using legacy front-end) */ ?>
<?php echo $this->loadAnyTemplate('Schedule/backup_altcli'); ?>

<?php /* Frontend backup */ ?>
<?php echo $this->loadAnyTemplate('Schedule/backup_frontend'); ?>

<?php /* JSON API */ ?>
<?php echo $this->loadAnyTemplate('Schedule/backup_json'); ?>
