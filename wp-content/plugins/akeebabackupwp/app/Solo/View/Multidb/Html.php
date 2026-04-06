<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo\View\Multidb;

use Awf\Mvc\View;
use Awf\Text\Text;
use Awf\Uri\Uri;
use Awf\Utils\Template;
use Solo\Helper\Escape;
use Solo\Model\Multidb;
use Solo\View\ViewTraits\ProfileIdAndName;

class Html extends View
{
	use ProfileIdAndName;

	public function onBeforeMain()
	{
		Template::addJs('media://js/solo/fsfilters.js', $this->container->application);
		Template::addJs('media://js/solo/multidb.js', $this->container->application);

		// Get a JSON representation of the database connection data
		/** @var Multidb $model */
		$model = $this->getModel();

		$this->getProfileIdAndName();

		// Push translations
		$doc = $this->container->application->getDocument();
		$doc->lang('COM_AKEEBA_FILEFILTERS_UIROOT');
		$doc->lang('COM_AKEEBA_FILEFILTERS_LABEL_UIERRORFILTER');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_HOST');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_PORT');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_USERNAME');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_PASSWORD');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_DATABASE');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_PREFIX');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_TEST');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_SAVE');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_CANCEL');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_LOADING');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_CONNECTOK');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_CONNECTFAIL');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_SAVEFAIL');
		$doc->lang('COM_AKEEBA_MULTIDB_GUI_LBL_DRIVER');

		$document = $this->container->application->getDocument();
		$router   = $this->container->router;

		$document->addScriptOptions('akeeba.System.params.AjaxURL', $router->route('index.php?view=Multidb&task=ajax'));
		$document->addScriptOptions('akeeba.Multidb.loadingGif', Template::parsePath('media://image/loading.gif', false, $this->getContainer()->application));
		$document->addScriptOptions('akeeba.Multidb.guiData', $model->get_databases());


		return true;
	}
} 
