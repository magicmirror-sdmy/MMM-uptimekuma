# MMM-uptimerobot [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mrVragec/MMM-uptimerobot/raw/master/LICENSE) [![Build Status](https://api.travis-ci.org/mrVragec/MMM-uptimerobot.svg?branch=master)](https://travis-ci.org/mrVragec/MMM-uptimerobot) [![Known Vulnerabiliries](https://snyk.io/test/github/mrvragec/mmm-uptimerobot/badge.svg)](https://snyk.io/test/github/mrvragec/mmm-uptimerobot) [![Code Climate](https://codeclimate.com/github/mrVragec/MMM-uptimerobot/badges/gpa.svg)](https://codeclimate.com/github/mrVragec/MMM-uptimerobot)

MagicMirror² to get uptime data from http://uptimerobot.com API. 

## Examples
![](.github/text.png) ![](.github/text_color.png) ![](.github/icons.png) ![](.github/icons_color.png)


## Instalation
1. Clone this repository in your MagicMirror installation under modules.
2. Rename plugin foler from 'MMM-uptimerobot' to 'uptimerobot'
3. Add configuration to config.js

## Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'uptimerobot',
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
