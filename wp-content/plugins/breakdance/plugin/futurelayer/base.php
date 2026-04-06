<?php

namespace Breakdance\FutureLayer;

include __DIR__ . "/control.php";

/**
 * @return bool
 */
function isFutureLayer()
{
    return \Breakdance\Data\get_global_option('isFutureLayer') === 'yes';
}
