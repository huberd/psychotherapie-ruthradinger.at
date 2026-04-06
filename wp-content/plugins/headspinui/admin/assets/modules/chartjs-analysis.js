// Wait for Alpine to be ready before accessing the store
document.addEventListener("alpine:init", () => {
  const colorSchemas = Alpine.store('pd').colorSchemas;

  function getLuminance(hex) {
    return chroma(hex).luminance();
  }

  function getOklabL(hex) {
    // Extract the L component from OKLab color space
    const oklabColor = chroma(hex).oklab();
    return oklabColor[0]; // The L component is the first value in the array
  }

  function getOklabC(hex) {
    // Extract the C (Chroma) component from OKLab color space
    const oklabColor = chroma(hex).oklab();
    // Calculate chroma (C) as the Euclidean distance in the a-b plane
    return Math.sqrt(Math.pow(oklabColor[1], 2) + Math.pow(oklabColor[2], 2));
  }

  function getOklabH(hex) {
    // Extract the H (Hue) component from OKLab color space
    const oklabColor = chroma(hex).oklab();
    // Calculate hue (H) as the angle in the a-b plane (in degrees)
    return (Math.atan2(oklabColor[2], oklabColor[1]) * 180 / Math.PI + 360) % 360;
  }

  function getColorTemperature(hex) {
    // Get temperature in Kelvin using chroma.js
    return chroma(hex).temperature();
  }

  function createChart(id, label, datasets) {

    if (!datasets || datasets.length === 0) {
      console.warn('No datasets available for chart', id);
      return; // Exit if no datasets are available
    }

    const ctx = document.getElementById(id).getContext("2d");

    // Destroy any existing chart on this canvas
    const existingChart = Chart.getChart(id);
    if (existingChart) {
      existingChart.destroy();
    }

    // Convert datasets for line chart format (add line properties)
    const lineDatasets = datasets.map(dataset => {
      // Use step 9 (index 8) color for the line color
      const lineColor = dataset.backgroundColor[8] || dataset.backgroundColor[0];

      return {
        ...dataset,
        borderColor: lineColor, // Using step 9 color for the line instead of each point's color
        borderWidth: 2,
        pointBackgroundColor: dataset.backgroundColor, // Keep individual points with their original colors
        fill: false,
        tension: 0.1 // Adds a slight curve to the lines
      };
    });

    new Chart(ctx, {
      type: "line",
      data: { labels: Array.from({ length: 12 }, (_, i) => `Step ${i + 1}`), datasets: lineDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: id.includes("Temperature") ? "Temperature (Kelvin)" :
                id.includes("oklab_L") ? "OKLab L Value" :
                  id.includes("oklab_C") ? "OKLab C Value" :
                    id.includes("oklab_H") ? "OKLab H Value (degrees)" : "Luminance"
            }
          },
          x: { title: { display: true, text: "Color Steps" } }
        }
      }
    });
  }

  const lightDatasets = colorSchemas.map(schema => {
    return {
      label: `${schema.name} Light`,
      data: schema.data.light.map(step => getLuminance(step.output)),
      backgroundColor: schema.data.light.map(step => step.output)
    };
  });

  const darkDatasets = colorSchemas.map(schema => ({
    label: `${schema.name} Dark`,
    data: schema.data.dark.map(step => getLuminance(step.output)),
    backgroundColor: schema.data.dark.map(step => step.output)
  }));

  // Move this inside the Alpine init event
  document.addEventListener("twp::colorAnalysis", () => {
    // Make sure Alpine is initialized
    if (typeof Alpine !== 'undefined') {
      Alpine.store('project').regenratePaletteOutput()


      // Refresh datasets if they're empty
      if (!lightDatasets.length || !darkDatasets.length) {
        console.error('Maybe error')
        const freshColorSchemas = Alpine.store('pd').colorSchemas;

        const refreshedLightDatasets = freshColorSchemas.map(schema => {
          return {
            label: `${schema.name} Light`,
            data: schema.data.light.map(step => getLuminance(step.output)),
            backgroundColor: schema.data.light.map(step => step.output)
          };
        });

        const refreshedDarkDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getLuminance(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create OKLab L datasets for light theme
        const lightOklabLDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getOklabL(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create OKLab L datasets for dark theme
        const darkOklabLDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getOklabL(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create OKLab C datasets for light theme
        const lightOklabCDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getOklabC(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create OKLab C datasets for dark theme
        const darkOklabCDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getOklabC(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create OKLab H datasets for light theme
        const lightOklabHDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getOklabH(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create OKLab H datasets for dark theme
        const darkOklabHDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getOklabH(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create temperature datasets for light theme
        const lightTemperatureDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getColorTemperature(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create temperature datasets for dark theme
        const darkTemperatureDatasets = freshColorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getColorTemperature(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Add brand color schema if available
        const brandColorSchema = Alpine.store('pd').brandColorSchema;
        if (brandColorSchema && brandColorSchema.data) {
          // Create brand dataset for light chart
          if (brandColorSchema.data.light) {
            const brandLightDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getLuminance(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            refreshedLightDatasets.push(brandLightDataset);
          }

          // Create brand dataset for dark chart
          if (brandColorSchema.data.dark) {
            const brandDarkDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getLuminance(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            refreshedDarkDatasets.push(brandDarkDataset);
          }

          // Add brand to OKLab L datasets
          if (brandColorSchema.data.light) {
            const brandLightOklabLDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getOklabL(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightOklabLDatasets.push(brandLightOklabLDataset);
          }

          if (brandColorSchema.data.dark) {
            const brandDarkOklabLDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getOklabL(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkOklabLDatasets.push(brandDarkOklabLDataset);
          }

          // Add brand to OKLab C datasets
          if (brandColorSchema.data.light) {
            const brandLightOklabCDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getOklabC(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightOklabCDatasets.push(brandLightOklabCDataset);
          }

          if (brandColorSchema.data.dark) {
            const brandDarkOklabCDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getOklabC(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkOklabCDatasets.push(brandDarkOklabCDataset);
          }

          // Add brand to OKLab H datasets
          if (brandColorSchema.data.light) {
            const brandLightOklabHDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getOklabH(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightOklabHDatasets.push(brandLightOklabHDataset);
          }

          if (brandColorSchema.data.dark) {
            const brandDarkOklabHDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getOklabH(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkOklabHDatasets.push(brandDarkOklabHDataset);
          }

          // Add brand to temperature datasets
          if (brandColorSchema.data.light) {
            const brandLightTemperatureDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getColorTemperature(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightTemperatureDatasets.push(brandLightTemperatureDataset);
          }

          if (brandColorSchema.data.dark) {
            const brandDarkTemperatureDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getColorTemperature(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkTemperatureDatasets.push(brandDarkTemperatureDataset);
          }
        }

        // Create all charts
        createChart("lightLuminanceChart", "Light Theme Luminance", refreshedLightDatasets);
        createChart("darkLuminanceChart", "Dark Theme Luminance", refreshedDarkDatasets);
        createChart("light_oklab_L_Chart", "Light Theme OKLab L Component", lightOklabLDatasets);
        createChart("dark_oklab_L_Chart", "Dark Theme OKLab L Component", darkOklabLDatasets);
        createChart("light_oklab_C_Chart", "Light Theme OKLab C Component", lightOklabCDatasets);
        createChart("dark_oklab_C_Chart", "Dark Theme OKLab C Component", darkOklabCDatasets);
        createChart("light_oklab_H_Chart", "Light Theme OKLab H Component", lightOklabHDatasets);
        createChart("dark_oklab_H_Chart", "Dark Theme OKLab H Component", darkOklabHDatasets);
        createChart("lightTemperatureChart", "Light Theme Temperature", lightTemperatureDatasets);
        createChart("darkTemperatureChart", "Dark Theme Temperature", darkTemperatureDatasets);
      } else {
        console.error('Maybe error 2')
        // Update existing datasets similarly
        const brandColorSchema = Alpine.store('pd').brandColorSchema;
        const currentSchemas = Alpine.store('pd').colorSchemas;
        let updatedLightDatasets = currentSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getLuminance(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));
        let updatedDarkDatasets = currentSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getLuminance(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create OKLab L datasets for light
        const lightOklabLDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getOklabL(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create OKLab L datasets for dark
        const darkOklabLDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getOklabL(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create OKLab C datasets for light
        const lightOklabCDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getOklabC(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create OKLab C datasets for dark
        const darkOklabCDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getOklabC(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create OKLab H datasets for light
        const lightOklabHDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getOklabH(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        // Create OKLab H datasets for dark
        const darkOklabHDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getOklabH(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Create temperature datasets
        const lightTemperatureDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Light`,
          data: schema.data.light.map(step => getColorTemperature(step.output)),
          backgroundColor: schema.data.light.map(step => step.output)
        }));

        const darkTemperatureDatasets = Alpine.store('pd').colorSchemas.map(schema => ({
          label: `${schema.name} Dark`,
          data: schema.data.dark.map(step => getColorTemperature(step.output)),
          backgroundColor: schema.data.dark.map(step => step.output)
        }));

        // Add brand schema to OKLab L datasets if available
        if (brandColorSchema && brandColorSchema.data) {
          // Add brand to light OKLab L dataset
          if (brandColorSchema.data.light) {
            const brandLightOklabLDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getOklabL(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightOklabLDatasets.push(brandLightOklabLDataset);
          }

          // Add brand to dark OKLab L dataset
          if (brandColorSchema.data.dark) {
            const brandDarkOklabLDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getOklabL(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkOklabLDatasets.push(brandDarkOklabLDataset);
          }
        }

        // Add brand to light dataset
        if (brandColorSchema && brandColorSchema.data) {
          if (brandColorSchema.data.light) {
            const brandLightDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getLuminance(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            updatedLightDatasets.push(brandLightDataset);
          }

          // Add brand to dark dataset
          if (brandColorSchema.data.dark) {
            const brandDarkDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getLuminance(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            updatedDarkDatasets.push(brandDarkDataset);
          }
        }

        // Add brand schema to OKLab C datasets if available
        if (brandColorSchema && brandColorSchema.data) {
          // Add brand to light OKLab C dataset
          if (brandColorSchema.data.light) {
            const brandLightOklabCDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getOklabC(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightOklabCDatasets.push(brandLightOklabCDataset);
          }

          // Add brand to dark OKLab C dataset
          if (brandColorSchema.data.dark) {
            const brandDarkOklabCDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getOklabC(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkOklabCDatasets.push(brandDarkOklabCDataset);
          }
        }

        // Add brand schema to OKLab H datasets if available
        if (brandColorSchema && brandColorSchema.data) {
          // Add brand to light OKLab H dataset
          if (brandColorSchema.data.light) {
            const brandLightOklabHDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getOklabH(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightOklabHDatasets.push(brandLightOklabHDataset);
          }

          // Add brand to dark OKLab H dataset
          if (brandColorSchema.data.dark) {
            const brandDarkOklabHDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getOklabH(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkOklabHDatasets.push(brandDarkOklabHDataset);
          }
        }

        // Add brand schema to temperature datasets if available
        if (brandColorSchema && brandColorSchema.data) {
          if (brandColorSchema.data.light) {
            const brandLightTemperatureDataset = {
              label: `Brand Light`,
              data: brandColorSchema.data.light.map(step => getColorTemperature(step.output)),
              backgroundColor: brandColorSchema.data.light.map(step => step.output)
            };
            lightTemperatureDatasets.push(brandLightTemperatureDataset);
          }

          if (brandColorSchema.data.dark) {
            const brandDarkTemperatureDataset = {
              label: `Brand Dark`,
              data: brandColorSchema.data.dark.map(step => getColorTemperature(step.output)),
              backgroundColor: brandColorSchema.data.dark.map(step => step.output)
            };
            darkTemperatureDatasets.push(brandDarkTemperatureDataset);
          }
        }

        // Create the Luminance charts
        createChart("lightLuminanceChart", "Light Theme Luminance", updatedLightDatasets);
        createChart("darkLuminanceChart", "Dark Theme Luminance", updatedDarkDatasets);

        // Create the OKLab L component charts
        createChart("light_oklab_L_Chart", "Light Theme OKLab L Component", lightOklabLDatasets);
        createChart("dark_oklab_L_Chart", "Dark Theme OKLab L Component", darkOklabLDatasets);

        // Create the OKLab C component charts
        createChart("light_oklab_C_Chart", "Light Theme OKLab C Component", lightOklabCDatasets);
        createChart("dark_oklab_C_Chart", "Dark Theme OKLab C Component", darkOklabCDatasets);

        // Create the OKLab H component charts
        createChart("light_oklab_H_Chart", "Light Theme OKLab H Component", lightOklabHDatasets);
        createChart("dark_oklab_H_Chart", "Dark Theme OKLab H Component", darkOklabHDatasets);

        // Create the temperature charts
        createChart("lightTemperatureChart", "Light Theme Temperature", lightTemperatureDatasets);
        createChart("darkTemperatureChart", "Dark Theme Temperature", darkTemperatureDatasets);
      }
    } else {
      console.error("Alpine.js is not loaded yet");
    }
  });
});
