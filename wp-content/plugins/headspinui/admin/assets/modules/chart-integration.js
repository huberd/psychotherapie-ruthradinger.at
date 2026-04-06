document.addEventListener("headspinready", function () {

    function formatDataStep(fMin, fMax) {

        let d = [
            { "screenSize": 0, "count": fMin },
            { "screenSize": parseInt(Alpine.store("pd").minViewport, 10), "count": fMin },
            { "screenSize": parseInt(Alpine.store("pd").maxViewport, 10), "count": fMax },
            { "screenSize": (parseInt(Alpine.store("pd").maxViewport, 10) + 500), "count": fMax },

        ]
        return d;
    }
    function formatDataGroup(l, dMin, dMax) {
        dMin = parseInt(dMin, 10)
        dMax = parseInt(dMax, 10)
        let dt = {
            "label": l,
            "data": formatDataStep(dMin, dMax)
        }

        return dt;
    }
    function fluidTypographyChart(path) {
        let buffer = [];
        Alpine.store("project").getTokensPreview(path).forEach(t => {
            buffer.push(formatDataGroup(t.label, t.min, t.max));

        })
        return buffer;
    }
    function fluidMinMaxChart(min, max) {
        let buffer = [];
        buffer.push(formatDataGroup("Fluid Value", min, max));
        return buffer;
    }

    const datasetsDummy = [
        {
            label: 'Fluid demo',
            data: [
                { screenSize: 0, count: 30 },
                { screenSize: parseInt(Alpine.store("pd").minViewport, 10), count: 30 },
                { screenSize: parseInt(Alpine.store("pd").maxViewport, 10), count: 80 },
                { screenSize: (parseInt(Alpine.store("pd").maxViewport, 10) + 500), count: 80 },
            ],
            fill: true
        },
    ];


    function getConfig(datasets) {
        const minScreenSize = Math.min(...datasets.flatMap(dataset => dataset.data.map(item => item.screenSize)));
        const maxScreenSize = Math.max(...datasets.flatMap(dataset => dataset.data.map(item => item.screenSize)));

        const config = {
            type: 'line',
            data: {
                labels: datasets[0].data.map(item => item.screenSize),
                datasets: datasets.map(dataset => ({
                    label: dataset.label,
                    data: dataset.data.map(item => item.count),
                }))
            },
            options: {
                plugins: {
                    legend: {
                        display: false // This hides the legend
                    }
                },
                animation: {
                    duration: 0, // Disable initial load animation
                },
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        title: { display: true, text: 'Viewport width (px)' },
                        afterBuildTicks: function (axis) {
                            // Define custom tick values at 479 and 1366
                            axis.ticks = [
                                { value: 0, label: '0 px' },
                                { value: Alpine.store("pd").minViewport, label: 'Min. Viewport' },
                                { value: Alpine.store("pd").maxViewport, label: 'Max. Viewport' },
                                { value: (parseInt(Alpine.store("pd").maxViewport, 10)), label: `${(parseInt(Alpine.store("pd").maxViewport, 10))}` }
                            ];
                        },
                        ticks: {
                            callback: function (value) {
                                // Return the label as-is for the custom ticks
                                const tick = this.getLabelForValue(value);
                                return tick;
                            }
                        },
                        min: minScreenSize,
                        max: maxScreenSize,
                    },
                    y: {
                        title: { display: true, text: 'Fluid size (px)' },
                        beginAtZero: true,
                        afterDataLimits(scale) {
                            const max = Math.max(...scale.chart.data.datasets[0].data);
                            const min = Math.min(...scale.chart.data.datasets[0].data);
                            scale.max = max; // Adds 30 to the maximum data value
                        }
                    }
                }
            }
        };
        return config;
    }
    document.querySelectorAll(".chartjs-canvas-wrapper").forEach(c => {
        let source = c.getAttribute("data-chart-source");

        var datasets = null;
        var ds = null;
        switch (source) {
            case "--hfs-h": case "--hss-": case "--hsp-":
                datasets = fluidTypographyChart(source);
                ds = getConfig(datasets);
                break;
            case "fluid-min-max":
                datasets = fluidMinMaxChart(parseInt(c.getAttribute("data-fmin"), 10), parseInt(c.getAttribute("data-fmax"), 10))
                ds = getConfig(datasets);
                break;
            default:
                datasets = datasetsDummy;
                ds = getConfig(datasets);
                break;
        }
        const canvas = c.querySelector(".chartjs-canvas");
        const ctx = canvas.getContext("2d");
        const tooltip = c.querySelector('.chartjs-tooltip');
        const verticalLine = c.querySelector('.chartjs-vertical-line');
        let myChart = new Chart(ctx, ds);

        window.addEventListener("headspinChartRegenerate", function () {
            myChart.data.labels = [0, parseInt(Alpine.store("pd").minViewport, 10), parseInt(Alpine.store("pd").maxViewport, 10), (parseInt(Alpine.store("pd").maxViewport, 10) + 500)];
            myChart.config.options.scales.x.max = parseInt(Alpine.store("pd").maxViewport, 10) + 500;

            switch (source) {
                case "--hfs-h": case "--hss-": case "--hsp-":
                    datasets = fluidTypographyChart(source);
                    Alpine.store("project").getTokensPreview(source).forEach((t, i) => {
                        myChart.data.datasets[i].data = [parseInt(t.min, 10), parseInt(t.min, 10), parseInt(t.max, 10), parseInt(t.max, 10)]
                    })
                    break;
                case "fluid-min-max":
                    datasets = fluidMinMaxChart(parseInt(c.getAttribute("data-fmin"), 10), parseInt(c.getAttribute("data-fmax"), 10))
                    myChart.data.datasets[0].data = [parseInt(c.getAttribute("data-fmin"), 10), parseInt(c.getAttribute("data-fmin"), 10), parseInt(c.getAttribute("data-fmax"), 10), parseInt(c.getAttribute("data-fmax"), 10)]
                    break;

                default:
                    return;
                    break;
            }
            myChart.update();
        })


        canvas.addEventListener('mousemove', function (event) {
            const rect = canvas.getBoundingClientRect();
            const cursorX = event.clientX - rect.left; // Cursor position in pixels
            const cursorScreenSize = myChart.scales.x.getValueForPixel(cursorX); // Convert cursor pixel to Viewport width
            // Debug: Log cursor positions

            // Check for the closest points for each dataset to the cursorScreenSize
            let interpolatedValues = [];
            datasets.forEach(dataset => {
                let leftPoint = null;
                let rightPoint = null;

                for (let i = 0; i < dataset.data.length - 1; i++) {
                    if (dataset.data[i].screenSize <= cursorScreenSize && dataset.data[i + 1].screenSize >= cursorScreenSize) {
                        leftPoint = dataset.data[i];
                        rightPoint = dataset.data[i + 1];
                        break;
                    }
                }

                if (leftPoint && rightPoint) {
                    const percent = (cursorScreenSize - leftPoint.screenSize) / (rightPoint.screenSize - leftPoint.screenSize);
                    const interpolatedCount = leftPoint.count + percent * (rightPoint.count - leftPoint.count);
                    interpolatedValues.push({ label: dataset.label, interpolatedCount });
                }
            });

            // Update tooltip content
            if (interpolatedValues.length > 0) {
                tooltip.style.display = 'block';
                verticalLine.style.display = 'block'; // Show the line

                // Set tooltip position
                const tooltipWidth = tooltip.offsetWidth;
                const canvasWidth = canvas.width;

                // Position tooltip based on cursorX and check available space

                if (cursorX + tooltipWidth + 10 > (canvasWidth / 2)) {
                    // Not enough space on the right, move it to the left
                    tooltip.style.left = `${cursorX - tooltipWidth - 10}px`; // Place on left side of the line
                } else {

                    tooltip.style.left = `${cursorX + 10}px`; // Place on right side of the line
                }

                tooltip.style.top = `${event.clientY + 10}px`;

                tooltip.innerHTML = `<strong>Viewport width: ${cursorScreenSize.toFixed(2)} px</strong><br>`;
                interpolatedValues.forEach(value => {
                    tooltip.innerHTML += `${value.label}: ${value.interpolatedCount.toFixed(2)}<br>`;
                });
            } else {
                tooltip.style.display = 'none'; // Hide tooltip if no points found
                verticalLine.style.display = 'none'; // Hide the vertical line if no points found
            }

            // Update vertical line position
            verticalLine.style.left = `${cursorX}px`; // Set left position of the vertical line

        });

        // Hide the tooltip and vertical line when the mouse leaves the canvas
        canvas.addEventListener('mouseleave', function () {
            tooltip.style.display = 'none';
            verticalLine.style.display = 'none'; // Hide the vertical line
        });
        fluidChartsJS.push(myChart)
    })






});
