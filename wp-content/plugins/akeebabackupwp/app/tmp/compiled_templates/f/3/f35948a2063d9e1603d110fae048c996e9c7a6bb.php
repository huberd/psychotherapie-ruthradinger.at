<?php /* F:\wamp64\www\annapraxmarer.at\wp-content\plugins\akeebabackupwp\app\Solo\ViewTemplates\Sysconfig\backuponupdate.blade.php */ ?>
<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

defined('_AKEEBA') or die();

/** @var \Solo\View\Sysconfig\Html $this */

$config = $this->getContainer()->appConfig;

?>
<div class="akeeba-form-group">
    <label for="backup-core-update">
        <?php echo $this->getLanguage()->text('SOLO_SETUP_LBL_BACKUPONUPDATE_CORE'); ?>
    </label>
    <div class="akeeba-toggle">
        <?php echo $this->getContainer()->html->get('fefselect.booleanList', 'options[backuponupdate_core_manual]', ['forToggle' => 1, 'colorBoolean' => 1], $config->get('options.backuponupdate_core_manual', 1)); ?>
    </div>
    <p class="akeeba-help-text">
        <?php echo $this->getLanguage()->text('SOLO_SETUP_LBL_BACKUPONUPDATE_CORE_DESC'); ?>
    </p>
</div>
<div class="akeeba-form-group">
    <label for="backup-core-update">
        <?php echo $this->getLanguage()->text('SOLO_SETUP_LBL_BACKUPONUPDATE_CORE_PROFILE'); ?>
    </label>
    <div class="akeeba-toggle">
        <?php echo $this->getContainer()->html->get('select.genericlist', $this->profileList, 'options[backuponupdate_core_manual_profile]', [], 'value', 'text', $config->get('options.backuponupdate_core_manual_profile', 1)); ?>
    </div>
    <p class="akeeba-help-text">
        <?php echo $this->getLanguage()->text('SOLO_SETUP_LBL_BACKUPONUPDATE_CORE_PROFILE_DESC'); ?>
    </p>
</div>
