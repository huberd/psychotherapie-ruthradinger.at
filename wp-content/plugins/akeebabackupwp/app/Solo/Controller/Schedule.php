<?php
/**
 * @package   solo
 * @copyright Copyright (c)2014-2025 Nicholas K. Dionysopoulos / Akeeba Ltd
 * @license   GNU General Public License version 3, or later
 */

namespace Solo\Controller;

use Akeeba\Engine\Util\RandomValue;

class Schedule extends ControllerDefault
{
	public function enableFrontend()
	{
		// CSRF prevention
		$this->csrfProtection();

		$params = $this->container->appConfig;

		$params->set('options.legacyapi_enabled', 1);

		$secretWord = $params->get('options.frontend_secret_word', null);

		if (empty($secretWord))
		{
			$random    = new RandomValue();
			$newSecret = $random->generateString(32);
			$params->set('options.frontend_secret_word', $newSecret);
		}

		$params->saveConfiguration();

		$url = $this->container->router->route('index.php?view=Schedule');

		$this->setRedirect($url);
	}

	public function enableJsonApi()
	{
		// CSRF prevention
		$this->csrfProtection();

		$params = $this->container->appConfig;

		$params->set('options.jsonapi_enabled', 1);

		$secretWord = $params->get('options.frontend_secret_word', null);

		if (empty($secretWord))
		{
			$random    = new RandomValue();
			$newSecret = $random->generateString(32);
			$params->set('options.frontend_secret_word', $newSecret);
		}

		$params->saveConfiguration();

		$url = $this->container->router->route('index.php?view=Schedule');

		$this->setRedirect($url);
	}

	public function resetSecretWord(): void
	{
		// CSRF prevention
		$this->csrfProtection();

		$session   = $this->container->segment;

		$newSecret = $session->get('newSecretWord', null);

		if (empty($newSecret))
		{
			$random    = new RandomValue();
			$newSecret = $random->generateString(32);
		}

		$params = $this->container->appConfig;

		$params->set('options.frontend_secret_word', $newSecret);

		$params->saveConfiguration();

		$session->set('newSecretWord', null);

		$url = $this->container->router->route('index.php?view=Schedule');

		$this->setRedirect($url);
	}
} 
