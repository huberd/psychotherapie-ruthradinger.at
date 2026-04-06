<?php /* F:\wamp64\www\annapraxmarer.at\wp-content\plugins\akeebabackupwp\app\Solo\ViewTemplates\CommonTemplates\ProfileName.blade.php */ ?>
<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

// Protect from unauthorized access
defined('_AKEEBA') or die();
?>
<div class="akeeba-block--info">
	<strong><?php echo $this->getLanguage()->text('COM_AKEEBA_CPANEL_PROFILE_TITLE'); ?></strong>:
	#<?php echo $this->escape((int)($this->profileid)); ?> <?php echo $this->escape($this->profilename); ?>

</div>
