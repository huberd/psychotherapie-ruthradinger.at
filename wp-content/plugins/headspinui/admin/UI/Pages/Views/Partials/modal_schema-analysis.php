<?php
if (!defined('ABSPATH')) exit;
?>
<div class="hs-modal" x-data="modal(false)">
    <button x-ref="button" class="hs-button hs-subnav-button" @click="toggle('twp::colorAnalysis');" x-on:keydown.escape.prevent.stop="close()">
        <svg class="hs-icon hs-icon-large">
            <use href="#ii-chart-analysis"></use>
        </svg>
        <span>Analysis</span>
    </button>

    <div id="schema-edit-modal" class="hs-modal__wrapper" x-show="modalOpen" x-transition:enter>
        <div class="hs-modal__backdrop" @click="toggle()"></div>
        <div class="hs-modal__modal" x-ref="modal" style="width: 90vh;max-width: 1300px;" >
            <div class="hs-modal__header">
                <div style="display: flex; gap: .25rem; align-items: center;">
                    <h2> Color Analysis</h2>
                    <div class="token-group-button">
                        <button class="hs-button-gtoken active" @click="$store.appView.chartView = 'luminance'" x-bind:class="{'active': $store.appView.chartView == 'luminance'}">Luminance</button>
                        <button class="hs-button-gtoken" @click="$store.appView.chartView = 'oklch'" x-bind:class="{'active': $store.appView.chartView == 'oklch'}">OKLCH</button>
                        <button class="hs-button-gtoken" @click="$store.appView.chartView = 'temperature'" x-bind:class="{'active': $store.appView.chartView == 'temperature'}">Temperature</button>
                    </div>
                </div>
            </div>

            <div class="hs-modal__content" style="min-height: 30vh;">
                <section class="color-analysis-section" x-show="$store.appView.chartView === 'luminance'">
                    <h3 class="chart-js-section-title">Luminance Analysis</h3>
                    <div class="chart-grid">
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="lightLuminanceChart"></canvas>
                        </div>
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="darkLuminanceChart"></canvas>
                        </div>
                    </div>
                </section>
                <section class="color-analysis-section" x-show="$store.appView.chartView === 'temperature'">
                    <h3 class="chart-js-section-title">Temperature Analysis</h3>
                    <div class="chart-grid">
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="lightTemperatureChart"></canvas>
                        </div>
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="darkTemperatureChart"></canvas>
                        </div>
                    </div>
                </section>
                <section class="color-analysis-section" x-show="$store.appView.chartView === 'oklch'">
                    <h3 class="chart-js-section-title">L - oklab lightness</h3>
                    <div class="chart-grid">
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="light_oklab_L_Chart"></canvas>
                        </div>
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="dark_oklab_L_Chart"></canvas>
                        </div>
                    </div>

                    <h3 class="chart-js-section-title">C - oklab chroma</h3>
                    <div class="chart-grid">
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="light_oklab_C_Chart"></canvas>
                        </div>
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="dark_oklab_C_Chart"></canvas>
                        </div>
                    </div>

                    <h3 class="chart-js-section-title">H - oklab hue</h3>
                    <div class="chart-grid">
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="light_oklab_H_Chart"></canvas>
                        </div>
                        <div class="chartjs-canvas-wrapper2">
                            <canvas id="dark_oklab_H_Chart"></canvas>
                        </div>
                    </div>
                </section>


            </div>

        </div>

    </div>

</div>

<style>
    .hs-modal__content {
        width: 100%;
    }

    .chart-grid {
        display: flex;
        flex-direction: row;
        display: grid;
        grid-template-columns: 1fr 1fr;
        overflow: hidden;
    }

    .chart-grid xcanvas {
        max-width: 100%
    }

    xcanvas {
        width: 600px !important;
        /* Set your desired width */
        height: 400px !important;
        /* Set your desired height */
    }
</style>