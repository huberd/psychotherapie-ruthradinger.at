<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/check_cli.blade.php */ ?>
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
            <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CLICRON'); ?>
        </h3>
    </header>

    <p>
        <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_GENERICUSECLI'); ?>
        <code>
            <?php echo $this->checkinfo->info->php_path; ?>

            <?php echo $this->checkinfo->cli->path; ?>

        </code>
    </p>
    <?php if(!$this->checkinfo->info->php_accurate): ?>
    <p>
        <span class="akeeba-label--warning"><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CLIGENERICIMPROTANTINFO'); ?></span>
        <?php echo $this->getLanguage()->sprintf('COM_AKEEBA_SCHEDULE_LBL_CLIGENERICINFO', $this->croninfo->info->php_path); ?>; ?>
    </p>
    <?php endif; ?>
</div>
