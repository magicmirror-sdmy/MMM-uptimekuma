# MMM-uptimekuma [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/MikeBishop/MMM-uptimekuma/raw/master/LICENSE) 

MagicMirror² to get uptime data from [Uptime Kuma](https://github.com/louislam/uptime-kuma) API.

## Examples
![](.github/text_single.png) ![](.github/icons_color_single.png)<br>
![](.github/icons_color_vertical.png) ![](.github/text_colors_horizontal.png)


## Installation
1. Clone this repository in your MagicMirror installation under modules.
2. Run `npm install` in the module directory.
3. Add configuration to config.js

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
| `useIcons`       | Flag to use icons (`true`) or text (`false`) values for status of monitor.<br>Default: `false` - text values.
| `useColors`      | Flag to use colors (`true`) for status of monitor<br>Default: `false` - without colors.
| `baseUrl`        | Base URL of Uptime Kuma install <br>Default: "http://localhost:3001"
| `statusPage`     | Slug of UptimeKuma status page to display <br>Default: "default"
| `headers`        | Display the name of each group from the status page? Values are `true`, `false` or `"auto"`. (Auto is equivalent to `true` if there are multiple groups, but `false` for a single group.)<br>Default: `"auto"`
| `vertical`       | If multiple groups are defined, should they be laid out vertically (`true`) or horizontally (`false`)?<br>Default: `true`
| `updateInterval` | Time (in ms) between updates. Note that Uptime Kuma caches status pages for 5 minutes, so updates may take up to 5 minutes to propagate even with a smaller setting.<br>Default: 60000
