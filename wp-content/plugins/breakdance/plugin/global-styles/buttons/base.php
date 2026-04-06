<?php

namespace Breakdance\GlobalSettings;

use function Breakdance\Elements\c;
use function Breakdance\Elements\control;
use function Breakdance\Elements\controlSection;
use function Breakdance\Elements\PresetSections\getPresetSection;
use function Breakdance\Elements\repeaterControl;

/**
 * @return Control
 */
function BUTTONS_SECTION()
{
    return controlSection(
        'buttons',
        'Buttons',
        [
            getPresetSection("EssentialElements\\AtomV1CustomButtonDesignNoResponsive", "Primary", "primary", ['type' => 'popout']),
            getPresetSection("EssentialElements\\AtomV1CustomButtonDesignNoResponsive", "Secondary", "secondary", ['type' => 'popout']),
            BUTTON_PRESETS()
        ]
    );
}

/**
 * @return Control
 * @throws \Exception
 */
function BUTTON_PRESETS()
{
    return controlSection(
        'button_presets',
        'Presets',
        [
            repeaterControl(
                'button_presets',
                'Button Presets',
                [
                    control(
                        'name',
                        'Preset Name',
                        ['type' => 'text', 'layout' => 'vertical']
                    ),
                    getPresetSection("EssentialElements\\AtomV1CustomButtonDesign", "Styles", "styles", ['type' => 'popout'])
                ],
                [
                    'repeaterOptions' => [
                        'noDuplicate' => true,
                        'titleTemplate' => '{name}',
                        'defaultTitle' => 'Preset',
                        'buttonName' => 'Add Preset',
                        'defaultNewValue' => [
                            'id' => '{uuid}',
                            'name' => 'Preset {count}',
                        ],
                        'deleteConfirm' => true,
                        'deleteText' => 'Are you sure you want to delete this preset?',
                    ],
                ]
            ),
        ],
        null,
        'popout'
    );
}

/**
 * @return string
 */
function BUTTONS_TEMPLATE()
{
    return (string) file_get_contents(dirname(__FILE__) . '/global-buttons.css.twig');
}
