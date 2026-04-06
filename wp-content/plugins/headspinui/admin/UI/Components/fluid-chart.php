<?php
namespace Headspin\Components;
if (!defined('ABSPATH')) exit;

function fluid_line_chartjs($source)
{
?>
<div class="chartjs-canvas-wrapper" style="position: relative;" data-chart-source="<?php echo esc_attr($source); ?>">
    <canvas class="chartjs-canvas" width="800" height="400"></canvas>
    <div class="chartjs-tooltip"></div>
    <div class="chartjs-vertical-line"></div>
</div>

<?php
}

function fluid_line_chartjs_static($source)
{
?>
<div class="chartjs-canvas-wrapper" style="position: relative;" data-fmin="30" data-fmax="70" data-chart-source="<?php echo esc_attr($source); ?>">
    <canvas class="chartjs-canvas" width="800" height="400"></canvas>
    <div class="chartjs-tooltip"></div>
    <div class="chartjs-vertical-line"></div>
</div>

<?php
}
function fluid_line_chartjs_minmax($source)
{
?>
<div class="chartjs-canvas-wrapper" style="position: relative;" data-fmin="3" data-fmax="70" data-chart-source="<?php echo esc_attr($source); ?>">
    <canvas class="chartjs-canvas" width="800" height="400"></canvas>
    <div class="chartjs-tooltip"></div>
    <div class="chartjs-vertical-line"></div>
</div>

<?php
}

