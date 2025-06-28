# SvgFuse

## What & Why ?

 - I like VS2022 icons
 - I like colored icons
 - I don't like using VS2022 as my main IDE just to be compliant with the licence to use their icons
 - Majority of other iconsets do not offer good enough styling
 - I don't want to edit every svg on earth by hand
 - I don't want to learn to use clunky tools like Illustrator or Inkscape
 - Some iconsets feel incomplete
 - I like kit-bashing

So let's do a web tool to kit-bash icons together and add some styling on it 💅🏻

## How to use

Either paste a SVG file or browse through the FontAwesome Free library to add an icon to the layers.

Double click on a layer to select it.

You can edit the selected layer by moving it, resizing it or applying classes to it.

Use the CSS Editor to write classes to style your SVG.

Drag & Drop layers to change the order or to delete one.

Toggle snap to grid to keep things neat and clean. Adjust the Grid Unit to change the snapping behavior.

Save your SVG, with or without CSS. If you already include your CSS in your website as a dependency, you can save some bytes !

## Todo

 [] Allow to save and load the project file
 [] Ability to create a "solution" that contains multiple project files within, save and load it
 [] Give a name to a project file and allow batch exports
 [] i18n
 [] Auto saving to local storage to recover from crashes
 [] Keyboard shortcuts for SVG manipulation
 [] Add padding to bounding box to include the stroke within
 [] Add support for other types of SVG children element besides Path