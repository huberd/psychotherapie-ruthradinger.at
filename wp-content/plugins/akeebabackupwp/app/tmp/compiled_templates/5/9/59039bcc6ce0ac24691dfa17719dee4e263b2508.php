<?php /* /var/home/annapraxmarer_at/www/wp-content/plugins/akeebabackupwp/app/Solo/ViewTemplates/Schedule/backup_json.blade.php */ ?>
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
        <h3><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPIBACKUP'); ?></h3>
    </header>

    <div class="akeeba-block--info">
        <p>
            <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPIBACKUP_INFO'); ?>
        </p>
    </div>

    <?php if(!$this->croninfo->info->jsonapi): ?>
        <div class="akeeba-block--failure">
            <p>
                <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_DISABLED'); ?>
            </p>
            <p>
                <a href="<?php echo $this->escape($this->enableJsonApiURL); ?>" class="akeeba-btn--teal">
                    <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_BTN_ENABLE_JSONAPI'); ?>
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
        <h4><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_ARCCLI'); ?></h4>
        <p>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_ARCCLI_INTRO'); ?>
        </p>
        <p>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_ARCCLI_DOCKER'); ?>
        </p>
        <p>
            <code><?php echo $this->escape(sprintf('docker run --rm ghcr.io/akeeba/remotecli backup --profile=%d --host="%s%s" --secret="%s"',
					\Akeeba\Engine\Platform::getInstance()->get_active_profile(),
					defined('WPINC') ? '' : $this->escape($this->croninfo->info->root_url . '/'),
					$this->escape($this->croninfo->json->path ),
					$this->escape($this->croninfo->info->secret )
			)); ?></code>
        </p>
        <p>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_ARCCLI_PHAR'); ?>
        </p>
        <p>
            <code><?php echo $this->escape(sprintf(
					'php remote.phar backup --profile=%d --host="%s%s" --secret="%s"',
					\Akeeba\Engine\Platform::getInstance()->get_active_profile(),
					defined('WPINC') ? '' : $this->escape($this->croninfo->info->root_url . '/'),
					$this->escape($this->croninfo->json->path ),
					$this->escape($this->croninfo->info->secret )
				)); ?></code>
        </p>

        <h4>
				<?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_OTHER'); ?>
        </h4>

        <p>
            <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_INTRO'); ?>
        </p>

        <table class="akeeba-table--striped">
            <tbody>
            <tr>
                <td><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_ENDPOINT'); ?></td>
                <td>
                    <code><?php if(!defined('WPINC')): ?><?php echo $this->escape($this->croninfo->info->root_url); ?>/<?php endif; ?><?php echo $this->escape($this->croninfo->json->path); ?></code>
                </td>
            </tr>
            <tr>
                <td><?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_SECRET'); ?></td>
                <td><?php echo $this->escape($this->croninfo->info->secret); ?></td>
            </tr>
            </tbody>
        </table>

        <p></p>
        <p>
            <small>
                <?php echo $this->getLanguage()->text('COM_AKEEBA_SCHEDULE_LBL_JSONAPI_DISCLAIMER'); ?>
            </small>
        </p>
    <?php endif; ?>
</div>