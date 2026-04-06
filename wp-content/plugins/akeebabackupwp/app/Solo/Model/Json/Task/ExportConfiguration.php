<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo\Model\Json\Task;

use Akeeba\Engine\Factory;
use Awf\Container\ContainerAwareInterface;
use Awf\Container\ContainerAwareTrait;
use Solo\Application;
use Solo\Model\Json\TaskInterface;
use Solo\Model\Profiles;

/**
 * Export the profile's configuration
 */
class ExportConfiguration implements TaskInterface, ContainerAwareInterface
{
	use ContainerAwareTrait;

	/**
	 * Return the JSON API task's name ("method" name). Remote clients will use it to call us.
	 *
	 * @return  string
	 */
	public function getMethodName()
	{
		return 'exportConfiguration';
	}

	/**
	 * Execute the JSON API task
	 *
	 * @param   array $parameters The parameters to this task
	 *
	 * @return  mixed
	 *
	 * @throws  \RuntimeException  In case of an error
	 */
	public function execute(array $parameters = array())
	{
		// Get the passed configuration values
		$defConfig = array(
			'profile' => 0,
		);

		$defConfig = array_merge($defConfig, $parameters);

		$profile_id = (int)$defConfig['profile'];

		if ($profile_id <= 0)
		{
			$profile_id = 1;
		}

		/** @var Profiles $profile */
		$profile = $this->getContainer()->mvcFactory->makeTempModel('Profiles');

		$data = $profile->findOrFail($profile_id)->getData();

		if (substr($data['configuration'], 0, 12) == '###AES128###')
		{
			$key = Factory::getSecureSettings()->getKey();

			$data['configuration'] = Factory::getSecureSettings()->decryptSettings($data['configuration'], $key);
		}

		return array(
			'description'   => $data['description'],
			'configuration' => $data['configuration'],
			'filters'       => $data['filters'],
		);
	}
}
