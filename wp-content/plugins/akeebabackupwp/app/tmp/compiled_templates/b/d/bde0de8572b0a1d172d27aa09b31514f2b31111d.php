<?php /* F:\wamp64\www\annapraxmarer.at\wp-content\plugins\akeebabackupwp\app\Solo\ViewTemplates\Sysconfig\oauth2.blade.php */ ?>
<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

use Akeeba\Engine\Platform;
use Awf\Uri\Uri;

defined('_AKEEBA') or die();

/** @var \Solo\View\Sysconfig\Html $this */

$router = $this->getContainer()->router;
$inCMS  = $this->getContainer()->segment->get('insideCMS', false);
?>

<?php @$this->repeatableMap['47f91793093ab003340c603e15ba6c12'] = function( $engine) { ?>
<?php
$config = $this->getContainer()->appConfig;
$uri    = new Uri(
	defined('WPINC')
		? admin_url('admin-ajax.php?action=akeebabackup_oauth2&engine=' . $engine . '&task=noop')
		: (rtrim(Platform::getInstance()->get_platform_configuration_option('siteurl', ''), '/') . '/index.php?view=oauth2&task=noop&format=raw&engine=' . $engine)
);

?>
<div class="akeeba-form-group">
    <label for="oauth2_client_<?php echo $engine; ?>">
        <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2_CLIENT_' . $engine . '_LABEL'); ?>
    </label>
    <div class="akeeba-toggle" id="oauth2_client_<?php echo $engine; ?>">
        <?php echo $this->getContainer()->html->get('fefselect.booleanList', 'oauth2_client_' . $engine, ['forToggle' => 1, 'colorBoolean' => 1], $config->get('oauth2_client_' . $engine, 0)); ?>
    </div>
    <p class="akeeba-help-text">
        <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2_CLIENT_' . $engine . '_DESC'); ?>
    </p>
</div>

<div class="akeeba-block--info" <?php echo $this->showOn('oauth2_client_' . $engine . ':1'); ?>>
    <p><?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2URLFIELD_YOU_WILL_NEED'); ?></p>
    <p>
        <strong><?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2URLFIELD_CALLBACK_URL'); ?></strong>:
        <br />
        <?php $uri->setVar('task', 'step2') ?>
        <code><?= $uri->toString() ?></code>
    </p>
    <p>
        <strong><?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2URLFIELD_HELPER_URL'); ?></strong>:
        <br />
	    <?php $uri->setVar('task', 'step1') ?>
        <code><?= $uri->toString() ?></code>
    </p>
    <p>
        <strong><?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2URLFIELD_REFRESH_URL'); ?></strong>:
        <br />
	    <?php $uri->setVar('task', 'refresh') ?>
        <code><?= $uri->toString() ?></code>
    </p>
</div>

<div class="akeeba-form-group" <?php echo $this->showOn('oauth2_client_' . $engine . ':1'); ?>>
    <label for="<?php echo $engine; ?>_client_id">
        <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_' . $engine . '_CLIENT_ID_LABEL'); ?>
    </label>
    <input type="text" name="<?php echo $engine; ?>_client_id" id="<?php echo $engine; ?>_client_id"
           value="<?php echo $config->get($engine . '_client_id'); ?>">
    <p class="akeeba-help-text">
        <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_' . $engine . '_CLIENT_ID_DESC'); ?>
    </p>
</div>

<div class="akeeba-form-group" <?php echo $this->showOn('oauth2_client_' . $engine . ':1'); ?>>
    <label for="<?php echo $engine; ?>_client_secret">
        <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_' . $engine . '_CLIENT_SECRET_LABEL'); ?>
    </label>
    <input type="password" name="<?php echo $engine; ?>_client_secret" id="<?php echo $engine; ?>_client_secret"
           value="<?php echo $config->get($engine . '_client_secret'); ?>">
    <p class="akeeba-help-text">
        <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_' . $engine . '_CLIENT_SECRET_DESC'); ?>
    </p>
</div>
<?php }; ?>

<div class="akeeba-block--info">
    <?php echo $this->getLanguage()->text('COM_AKEEBA_CONFIG_OAUTH2_HEADER_DESC'); ?>
</div>

<?php try { $this->repeatableMap['47f91793093ab003340c603e15ba6c12']( 'box'); } catch (\Throwable $e) { throw new \RuntimeException(sprintf('Error calling repeatable "%s"', 'oauth2Block'), 500, $e); } ?>
<hr />
<?php try { $this->repeatableMap['47f91793093ab003340c603e15ba6c12']( 'dropbox'); } catch (\Throwable $e) { throw new \RuntimeException(sprintf('Error calling repeatable "%s"', 'oauth2Block'), 500, $e); } ?>
<hr />
<?php try { $this->repeatableMap['47f91793093ab003340c603e15ba6c12']( 'googledrive'); } catch (\Throwable $e) { throw new \RuntimeException(sprintf('Error calling repeatable "%s"', 'oauth2Block'), 500, $e); } ?>
<hr />
<?php try { $this->repeatableMap['47f91793093ab003340c603e15ba6c12']( 'onedrivebusiness'); } catch (\Throwable $e) { throw new \RuntimeException(sprintf('Error calling repeatable "%s"', 'oauth2Block'), 500, $e); } ?>
