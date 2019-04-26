<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <link rel="shortcut icon" href="" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="/css/base.css">
    <title>Project Manager</title>
  </head>
  <body>
    <section id="react-container"></section>
    <script>
      let initialData = {
        activeContainerId: @json($activeContainerId),
        containers: @json($containers),
        organizationId: @json($organizationId)
      }
    </script>
    <script src="{{ mix('js/app.js') }}"></script>
  </body>
</html>