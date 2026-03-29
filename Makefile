build:
	rsvg-convert icon.svg -w 48 -h 48 -o icon-48.png
	rsvg-convert icon.svg -w 96 -h 96 -o icon-96.png
	zip disney_plugin.zip content.js icon-48.png icon-96.png LICENSE manifest.json
	rm icon-48.png icon-96.png
