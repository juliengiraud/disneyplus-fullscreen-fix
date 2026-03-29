# Disney+ Fullscreen Fix

Extension to automatically restore fullscreen mode when Disney+ loads the next episode

Related [Firefox issue #1912701](https://bugzilla.mozilla.org/show_bug.cgi?id=1912701)

## Installation

Download [last version](https://github.com/juliengiraud/disneyplus-fullscreen-fix/raw/refs/heads/main/disney_plugin.zip)

Go the the Extensions Settings

Firefox

- "Options" > "Install Add-on From File..."
- Select the zip file

Chrome

- Unzip the file
- "Load unpacked"
- Select the unziped folder

## How to build

```sh
# Install requirements
sudo apt install librsvg2-bin

# Build
make build
```
