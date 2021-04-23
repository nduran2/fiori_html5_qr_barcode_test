/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"fiori_html5_qr_barcode_test/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
