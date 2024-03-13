const GETTEXT_DOMAIN = 'keyboard-indicator-settings';

const { St, Clutter } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;

const _ = ExtensionUtils.gettext;

class Extension {
    constructor(uuid) {
        this._uuid = uuid;
        this._popupMenuItem = null;
        this._keyboardIndicator = Main.panel.statusArea.keyboard;

        ExtensionUtils.initTranslations(GETTEXT_DOMAIN);
    }

    enable() {
        this._popupMenuItem = new PopupMenu.PopupMenuItem(_('Open Keyboard Settings'));

        this._popupMenuItem.connect('activate', () => {
            Main.Util.spawn(['gnome-control-center', 'keyboard']);
        });

        this._keyboardIndicator.menu.addMenuItem(this._popupMenuItem);
    }

    disable() {
        if (this._popupMenuItem) {
            this._popupMenuItem.destroy();
            this._popupMenuItem = null;
        }
    }
}

function init(meta) {
    return new Extension(meta.uuid);
}
