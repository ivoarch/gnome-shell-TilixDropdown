// Library imports
const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Main = imports.ui.main;
const Util = imports.misc.util;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Tweener = imports.ui.tweener;

// Extension imports
const Utils   = imports.misc.extensionUtils.getCurrentExtension().imports.utils;
const mySettings = Utils.getSettings();

// GLib import
const GLib = imports.gi.GLib;

// Globals
const key_bindings = {
    'key': function(){
        _startTilix();
    }
};

let text, button;

function init(extensionMeta) {
    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        x_fill: true,
        y_fill: false,
        track_hover: true
    });
    let icon = new St.Icon({
        icon_name: 'com.gexperts.Tilix-symbolic',
        style_class: 'system-status-icon'
    });


    button.set_child(icon);
    button.connect('button-press-event', _startTilix);
}

function _startTilix() {
    let s = GLib.spawn_command_line_async('env GDK_BACKEND=x11 tilix --quake');
    if(s == false) {
        Main.notify("Couldn't start tilix, is it installed?");
    }
}

function enable() {
    let key;
    for (key in key_bindings) {
        if (Main.wm.addKeybinding && Shell.ActionMode) { // introduced in 3.16
            Main.wm.addKeybinding(
                key,
                mySettings,
                Meta.KeyBindingFlags.NONE,
                Shell.ActionMode.NORMAL,
                key_bindings[key]
            );
        }
        else if (Main.wm.addKeybinding && Shell.KeyBindingMode) { // introduced in 3.7.5
            Main.wm.addKeybinding(
                key,
                mySettings,
                Meta.KeyBindingFlags.NONE,
                Shell.KeyBindingMode.NORMAL | Shell.KeyBindingMode.MESSAGE_TRAY,
                key_bindings[key]
            );
        }
        else {
            global.display.add_keybinding(
                key,
                mySettings,
                Meta.KeyBindingFlags.NONE,
                key_bindings[key]
            );
        }
        }

    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    let key;
    for (key in key_bindings) {
        if (Main.wm.removeKeybinding) { // introduced in 3.7.2
            Main.wm.removeKeybinding(key);
        }
        else {
            global.display.remove_keybinding(key);
        }
    }

    Main.panel._rightBox.remove_child(button);
}

