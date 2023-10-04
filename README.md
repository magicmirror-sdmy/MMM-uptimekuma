# MMM-uptimekuma [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/MikeBishop/MMM-uptimekuma/raw/master/LICENSE) 

MagicMirror² to get uptime data from [Uptime Kuma](https://github.com/louislam/uptime-kuma) API.

## Examples (from UptimeRobot version)
![](.github/text.png) ![](.github/text_color.png) ![](.github/icons.png) ![](.github/icons_color.png)


## Installation
1. Clone this repository in your MagicMirror installation under modules.
2. Add configuration to config.js

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-uptimekuma',
            config: {
                // See below for configurable options
            }
        }
    ]
}
```
## Requirements

No special requirements or dependencies. 

## Configuration options

| Option           | Description
|----------------- |-----------
| `useIcons`       | *Optional* Flag to use icons (true) or text (false) values for status of monitor. <br><br>**Type:** `boolean` <br>Default: false - text values.
| `useColors`      | *Optional* Flag to use colors (true) for status of monitor<br><br>**Type:** `boolean` <br>Default: false - without colors.
| `baseUrl`        | *Optional* Base URL of Uptime Kuma install <br>Default: "http://localhost:3001"
| `statusPage`     | *Optional* Slug of UptimeKuma status page to display <br>Default: "default"
