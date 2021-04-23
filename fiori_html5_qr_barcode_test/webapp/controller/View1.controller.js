sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageBox) {
    "use strict";
    var html5QrCode;

    return Controller.extend("fiorihtml5qrbarcodetest.controller.View1", {
      onInit: function () {
        this.oViewModel = new JSONModel({ codigos: [] });
        this.getView().setModel(this.oViewModel, "viewModel");
      },

      onPressEscanearCodigo: function () {
        var that = this;
        this.escanearCodigo()
          .then((codigo) => {
            // hacer algo con el codigo
            var oData = that.oViewModel.getData();
			oData.codigos.push({ codigo: codigo });
			that.oViewModel.setData(oData);
          })
          .catch((error) => {
            // hacer algo con el error
            MessageBox.error(error);
          });

        /* 
		Para obtener un código: 
	
		this.escanearCodigo()
          .then((codigo) => {
			  // hacer algo con el codigo
            console.log(codigo);
          })
          .catch((error) => {
			  // hacer algo con el error
            MessageBox.error(error);
          });
		  
		  */
      },

      escanearCodigo: async function () {
        var that = this;

        if (!this._oDialogScanner) {
          // eliminar el div
          var div = document.getElementById("idScannerDiv");
          if (div) {
            div.parentNode.removeChild(div);
          }

          this.oTextos = this.getView().getModel("i18n").getResourceBundle();
          this.scannerModel = new JSONModel({
            error: false,
            camaras: [],
          });
          this.getOwnerComponent().setModel(this.scannerModel, "scannerModel");

          this._oDialogScanner = new sap.m.Dialog({
            title: that.oTextos.getText("escanear_qr_titulo"),
            type: "Message",
            contentWidth: "700px",
            content: [
              new sap.m.VBox({
                alignItems: sap.m.FlexAlignItems.Center,
                alignContent: sap.m.FlexAlignContent.Center,
                justifyContent: sap.m.FlexJustifyContent.Center,
                width: "600px",
                items: [
                  new sap.ui.core.HTML({
                    content:
                      "<div id='idScannerDiv' class='center' style='width:600px'></video>",
                    visible: "{= !${scannerModel>error} }",
                  }),
                ],
              }),
            ],
            buttons: [
              new sap.m.Button({
                text: that.oTextos.getText("escanear_qr_cancelar"),
                press: function () {
                  that._oDialogScanner.close();
                  html5QrCode.stop();
                },
              }),
            ],
          });
          this.getView().addDependent(that._oDialogScanner);
          this._oDialogScanner.open();

          html5QrCode = new Html5Qrcode("idScannerDiv");

          let aCamaras = await Html5Qrcode.getCameras().catch((err) => {});
          this.scannerModel.setProperty("/camaras", aCamaras);
        } else {
          this._oDialogScanner.open();
        }

        return new Promise(function (resolve, reject) {
          var camaras = that.scannerModel.getProperty("/camaras");
          if (!camaras || !camaras.length) {
            reject("Error al enumerar las cámaras");
          }

          let cameraId = camaras[0].id;
          html5QrCode
            .start(
              cameraId,
              { fps: 10, qrbox: 350 },
              (code) => {
                that._oDialogScanner.close();
                html5QrCode.stop();
                resolve(code); // resolver con el código leído
              },
              (error) => {}
            )
            .catch((err) => {
              reject(`Error al iniciar cámara: ${err}`);
            });
        });
      },

      startScanner: async function () {
        let oModel = this.getOwnerComponent().getModel("scannerModel");
        let bError = false;
      },
    });
  }
);
