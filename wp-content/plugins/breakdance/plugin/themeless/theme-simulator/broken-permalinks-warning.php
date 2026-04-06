<?php

namespace Breakdance\Themeless;

?>
<!doctype html>
<html>

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php echo getNormalizeDotCssLinkTag(); ?>
</head>

<body>

  <style>
    body {
      background-color: black;
      color: white;
      font-size: 19px;
      -webkit-font-smoothing: antialiased;
    }

    a {
      color: white;
    }

    .wrap {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 100svh;
    }

    ol {
      padding-left: 20px;
      margin-bottom: 35px;
    }

    li {
      margin-bottom: 12px;
    }

    button {
      border: 1px solid #fff;
      background-color: transparent;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      padding: 10px;
      align-self: start;
      border-radius: 8px;
      cursor: pointer;
      min-width: 150px;
    }

    button:hover {
      background-color: #fff;
      color: black;
    }
  </style>

  <div class='wrap'>
    <h2>Please resave your permalinks.</h2>
    <p>The builder encountered a 404 error while loading the document.</p>
    <p>Instructions to Fix:</p>
    <ol>
      <li> <a force-allow-clicks href="<?php echo admin_url('options-permalink.php'); ?>" target="_blank">
          Go to Settings → Permalinks
        </a>
      </li>
      <li>Click <em>Save Changes</em> at the bottom.</li>
      <li>Return to this screen and refresh.</li>
    </ol>
    <button>Auto Fix Permalinks</button>
  </div>

  <script>
    const ajaxUrl = '<?php echo admin_url('admin-ajax.php'); ?>';

    document.querySelector('button').addEventListener('click', () => {
      const data = new FormData();
      data.append("action", 'breakdance_flush_rewrite_rules');

      const payload = {
        method: "POST",
        credentials: "same-origin",
        body: data,
      }

      fetch(ajaxUrl, payload)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error('Network response was not ok.');
        })
        .then(() => {
          document.querySelector('button').innerText = 'Fixed! Refreshing...';
          window.parent.location.reload();
        })
        .catch(() => {
          alert('There was a problem, please try again.');
        });
    });
  </script>
</body>

</html>
