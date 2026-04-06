<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

use Akeeba\WPCLI\Command\Backup;
use Akeeba\WPCLI\Command\Filter;
use Akeeba\WPCLI\Command\Log;
use Akeeba\WPCLI\Command\NamespaceDescription;
use Akeeba\WPCLI\Command\Option;
use Akeeba\WPCLI\Command\Profile;
use Akeeba\WPCLI\Command\Sysconfig;

if (!defined('AKEEBA_BACKUP_ORIGIN'))
{
	define('AKEEBA_BACKUP_ORIGIN', 'cli');
}

try
{
	AkeebaBackupWP::bootApplication('boot_wpcli.php');

	WP_CLI::add_command('akeeba', NamespaceDescription::class);
	WP_CLI::add_command('akeeba backup', Backup::class);
	WP_CLI::add_command('akeeba filter', Filter::class);
	WP_CLI::add_command('akeeba log', Log::class);
	WP_CLI::add_command('akeeba option', Option::class);
	WP_CLI::add_command('akeeba profile', Profile::class);
	WP_CLI::add_command('akeeba sysconfig', Sysconfig::class);
}
catch (Exception $e)
{
	WP_CLI::error("Could not register Akeeba Backup commands for WP-CLI.");
	WP_CLI::error("Error message: {$e->getMessage()}");
}
