# TerminixDropdown

A GNOME Shell extension to open [Terminix](https://github.com/gnunn1/terminix) in [Quake Mode](https://github.com/gnunn1/terminix/wiki/Quake-Mode) .

![preview](http://storage6.static.itmages.ru/i/16/1015/h_1476546656_3841355_d9df0ea092.png)

## Installation

###  From Gnome Shell Extensions Page

The easiest way to install this extension is via the official [Gnome Shell Extensions](https://extensions.gnome.org/) resource page: <https://extensions.gnome.org/extension/1123/terminix-dropdown/>

### From Source

The extension can be installed directly from source, either for the convenience of using git or to test the latest version .

```
$ git clone https://github.com/ivoarch/gnome-shell-TerminixDropdown.git
$ mv gnome-shell-TerminixDropdown $HOME/.local/share/gnome-shell/extensions/TerminixDropdown@ivkuzev@gmail.com
```

restart GNOME Shell (`Alt+F2 r Enter`) and enable the extension through gnome-tweak-tool.

## Configuring

### Custom hotkey 

Default shortcut is (<kbd>F10</kbd>) , to setup custom shortcut key edit **schemas/org.gnome.shell.extensions.terminix-dropdown.gschema.xml** schema file and compile with `glib-compile-schemas .` inside the directory .

**note:** Make sure you have terminix installed!

