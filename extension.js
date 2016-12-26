const ExtensionUtils = imports.misc.extensionUtils;
const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Main = imports.ui.main;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;

let text, button;

const KEY_SETTING_NAME = "key";

// 3.14 compatibility
const ShellActionMode = (Shell.ActionMode)?Shell.ActionMode:Shell.KeyBindingMode;

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
        icon_name: 'com.gexperts.Terminix-symbolic',
        style_class: 'system-status-icon'
    });

    button.set_child(icon);
    button.connect('button-press-event', _startTerminix);
}

function _startTerminix() {
    try {
        Main.Util.trySpawnCommandLine('terminix --quake');
    } catch(err) {
        Main.notify("Couldn't start terminix, is it installed?");
    }
}

function loadSettings() {
    let extension = ExtensionUtils.getCurrentExtension();

    let schemaSource = Gio.SettingsSchemaSource.new_from_directory(
        extension.dir.get_child('schemas').get_path(),
        Gio.SettingsSchemaSource.get_default(),
        false);

    let schema = schemaSource.lookup(extension.metadata['settings-schema'], true);
    if (!schema)
        throw new Error('Schema ' + schema + ' could not be found');

    return new Gio.Settings({ settings_schema: schema });
}

function enable() {
    let settings = loadSettings();
    Main.wm.addKeybinding(
        KEY_SETTING_NAME,
        settings,
        Meta.KeyBindingFlags.NONE,
        //Shell.ActionMode.NORMAL,
        //Shell.KeyBindingMode.NORMAL,
        ShellActionMode.NORMAL,
        _startTerminix);
    let children = Main.panel._rightBox.get_children();
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.wm.removeKeybinding(KEY_SETTING_NAME);
    Main.panel._rightBox.remove_child(button);
}
