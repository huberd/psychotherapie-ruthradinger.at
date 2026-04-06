<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo\View\Schedule;

use Akeeba\Engine\Platform;
use Awf\Mvc\View;
use Solo\Model\Schedule;

class Html extends View
{
	public $profileid;
	public $profileName;
	public $croninfo;
	public $checkinfo;

	/**
	 * URL to automatically enable the legacy frontend API (and set a Secret Key, if necessary)
	 *
	 * @var    string|null
	 * @since  7.8.2
	 */
	public $enableLegacyFrontendURL;

	/**
	 * URL to automatically enable the JSON API (and set a Secret Key, if necessary)
	 *
	 * @var    string|null
	 * @since  7.8.2
	 */
	public $enableJsonApiURL;

	/**
	 * URL to reset the secret word to something that actually works
	 *
	 * @var    string|null
	 * @since  7.8.2
	 */
	public $resetSecretWordURL;

	public function onBeforeMain()
	{
		// Get profile ID
		$this->profileid = Platform::getInstance()->get_active_profile();

		// Get profile name
		$this->profileName = $this->escape(Platform::getInstance()->get_profile_name($this->profileid));

		// Get the CRON paths
		/** @var Schedule $model */
		$model           = $this->getModel();
		$this->croninfo  = $model->getPaths();
		$this->checkinfo = $model->getCheckPaths();

		$this->enableLegacyFrontendURL = $this->container->router->route(sprintf(
			'index.php?view=schedule&&task=enableFrontend&%s=1',
			$this->container->session->getCsrfToken()->getValue()
		));

		$this->enableJsonApiURL = $this->container->router->route(sprintf(
			'index.php?view=schedule&&task=enableJsonApi&%s=1',
			$this->container->session->getCsrfToken()->getValue()
		));

		$this->resetSecretWordURL = $this->container->router->route(sprintf(
			'index.php?view=schedule&&task=resetSecretWord&%s=1',
			$this->container->session->getCsrfToken()->getValue()
		));

		return true;
	}
}
