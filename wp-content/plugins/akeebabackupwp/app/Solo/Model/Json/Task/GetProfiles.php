<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo\Model\Json\Task;

use Awf\Container\ContainerAwareInterface;
use Awf\Container\ContainerAwareTrait;
use Solo\Model\Json\TaskInterface;
use Solo\Model\Profiles;

/**
 * Get a list of known backup profiles
 */
class GetProfiles implements TaskInterface, ContainerAwareInterface
{
	use ContainerAwareTrait;

	/**
	 * Return the JSON API task's name ("method" name). Remote clients will use it to call us.
	 *
	 * @return  string
	 */
	public function getMethodName()
	{
		return 'getProfiles';
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
		/** @var Profiles $model */
		$model    = $this->getContainer()->mvcFactory->makeTempModel('Profiles');
		$profiles = $model->get(true);
		$ret      = array();

		if (count($profiles))
		{
			foreach ($profiles as $profile)
			{
				$temp       = new \stdClass();
				$temp->id   = $profile->id;
				$temp->name = $profile->description;
				$ret[]      = $temp;
			}
		}

		return $ret;
	}
}
