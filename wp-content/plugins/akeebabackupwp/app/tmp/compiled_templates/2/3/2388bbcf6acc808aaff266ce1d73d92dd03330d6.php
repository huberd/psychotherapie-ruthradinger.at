<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/check_altcli.blade.php */ ?>
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
            <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_ALTCLICRON'); ?>
        </h3>
    </header>

    <?php if(!$this->checkinfo->info->legacyapi): ?>
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
            <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_GENERICUSECLI'); ?>
            <code>
                <?php echo $this->checkinfo->info->php_path; ?>

                <?php echo $this->checkinfo->altcli->path; ?>

            </code>
        </p>
        <?php if(!$this->checkinfo->info->php_accurate): ?>
        <p>
            <span class="akeeba-label--warning"><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_CLIGENERICIMPROTANTINFO'); ?></span>
            <?php echo $this->getLanguage()->sprintf('COM_AKEEBA_SCHEDULE_LBL_CLIGENERICINFO', $this->checkinfo->info->php_path); ?>; ?>
        </p>
        <?php endif; ?>
    <?php endif; ?>

</div>
