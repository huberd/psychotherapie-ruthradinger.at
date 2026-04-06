<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo\View\Regexfsfilters;


use Akeeba\Engine\Factory;
use Awf\Html\Select;
use Awf\Mvc\View;
use Awf\Text\Text;
use Awf\Utils\Template;
use Solo\View\ViewTraits\ProfileIdAndName;

class Html extends View
{
	use ProfileIdAndName;

	/**
	 * SELECT element for choosing a database root
	 *
	 * @var  string
	 */
	public $root_select = '';

	/**
	 * List of database roots
	 *
	 * @var  array
	 */
	public $roots = [];

	/**
	 * Execute before displaying the main and only page of the off-site files inclusion page
	 *
	 * @return  boolean
	 */
	public function onBeforeMain()
	{
		Template::addJs('media://js/solo/fsfilters.js', $this->container->application);
		Template::addJs('media://js/solo/regexfsfilters.js', $this->container->application);

		/** @var \Solo\Model\Regexfsfilters $model */
		$model = $this->getModel();

		// Get a JSON representation of the available roots
		$filters   = Factory::getFilters();
		$root_info = $filters->getInclusions('dir');
		$roots     = [];
		$options   = [];

		if (!empty($root_info))
		{
			// Loop all dir definitions
			foreach ($root_info as $dir_definition)
			{
				if (is_null($dir_definition[1]))
				{
					// Site root definition has a null element 1. It is always pushed on top of the stack.
					array_unshift($roots, $dir_definition[0]);
				}
				else
				{
					$roots[] = $dir_definition[0];
				}

				$options[] = $this->getContainer()->html->select->option( $dir_definition[0], $dir_definition[0]);
			}
		}

		$site_root         = $roots[0];
		$this->root_select = $this->getContainer()->html->select->genericList($options, 'root', [
			'list.select' => $site_root,
			'id'          => 'active_root',
		]);
		$this->roots       = $roots;

		// Pass script options
		$router = $this->getContainer()->router;

		$document = $this->container->application->getDocument();
		$document->addScriptOptions('akeeba.System.params.AjaxURL', $router->route('index.php?view=regexfsfilters&task=ajax&format=raw'));
		$document->addScriptOptions('akeeba.RegExFileFilter.guiData', [
			'list' => $model->get_regex_filters($site_root)
		]);

		$this->getProfileIdAndName();

		// Push translations
		$doc = $this->container->application->getDocument();
		$doc->lang('COM_AKEEBA_FILEFILTERS_UIROOT');
		$doc->lang('COM_AKEEBA_FILEFILTERS_LABEL_UIERRORFILTER');
		$doc->lang('COM_AKEEBA_FILEFILTERS_TYPE_DIRECTORIES');
		$doc->lang('COM_AKEEBA_FILEFILTERS_TYPE_SKIPFILES');
		$doc->lang('COM_AKEEBA_FILEFILTERS_TYPE_SKIPDIRS');
		$doc->lang('COM_AKEEBA_FILEFILTERS_TYPE_FILES');

		return true;
	}

} 
