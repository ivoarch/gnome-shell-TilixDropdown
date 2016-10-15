const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;

let text, button;

function _startTerminix() {
    try {
        Main.Util.trySpawnCommandLine('terminix --quake');
    } catch(err) {
        Main.notify("Couldn't start terminix, is it installed?");
    }
}

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

function enable() {
    let children = Main.panel._rightBox.get_children();
    //Main.panel._rightBox.insert_child_at_index(button, children.length-1);
    // If you want the position to be left of rightbox, including Frippery Move Clock e.g., replace last line with :
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
