<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo;

use Solo\Cli\AltCheckFailedCli;

defined('AKEEBASOLO') || define('AKEEBASOLO', 1);

define('AKEEBA_CLI_APPLICATION_CLASS', AltCheckFailedCli::class);

require_once __DIR__ . '/../include.php';