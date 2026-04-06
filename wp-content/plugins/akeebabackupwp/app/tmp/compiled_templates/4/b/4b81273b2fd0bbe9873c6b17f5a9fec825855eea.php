<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/backup_cli.blade.php */ ?>
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
        <h3><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CLICRON'); ?></h3>
    </header>

    <div class="akeeba-block--info">
        <p>
            <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CLICRON_INFO'); ?>
        </p>
        <p>
            <a class="akeeba-btn--teal"
               href="https://www.akeeba.com/documentation/akeeba-solo/native-cron-script.htm"
               target="_blank">
                <span class="akion-ios-book"></span>
                <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_GENERICREADDOC'); ?>
            </a>
        </p>
    </div>

    <p>
        <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_GENERICUSECLI'); ?>
        <code>
            <?php echo $this->escape($this->escape($this->croninfo->info->php_path)); ?>

            <?php echo $this->escape($this->escape($this->croninfo->cli->path)); ?>

        </code>
    </p>
    <?php if(!$this->croninfo->info->php_accurate): ?>
    <p>
        <span class="akeeba-label--warning"><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CLIGENERICIMPROTANTINFO'); ?></span>
        <?php echo $this->getLanguage()->sprintf('COM_AKEEBA_SCHEDULE_LBL_CLIGENERICINFO', $this->croninfo->info->php_path); ?>
    </p>
    <?php endif; ?>
</div>