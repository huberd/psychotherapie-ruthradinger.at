<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/default.blade.php */ ?>
<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

use Awf\Text\Text;

defined('_AKEEBA') or die();

/** @var   \Solo\View\Schedule\Html  $this */
?>

<div class="akeeba-tabs">
    <label for="absTabRunBackups" class="active">
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_RUN_BACKUPS'); ?>
    </label>
    <section id="absTabRunBackups">
	    <?php echo $this->loadAnyTemplate('Schedule/backup'); ?>
    </section>

    <label for="absTabCheckBackups">
		<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CHECK_BACKUPS'); ?>
    </label>
    <section id="absTabCheckBackups">
	    <?php echo $this->loadAnyTemplate('Schedule/check'); ?>
    </section>
</div>

<p></p>
