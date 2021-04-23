## Application Details
|               |
| ------------- |
|**Generation Date and Time**<br>Fri Apr 23 2021 14:46:41 GMT-0300 (hora estándar de Argentina)|
|**App Generator**<br>@sap/generator-fiori|
|**App Generator Version**<br>1.1.9|
|**Generation Platform**<br>Visual Studio Code|
|**Floorplan Used**<br>simple|
|**Service Type**<br>None|
|**Service URL**<br>N/A
|**Module Name**<br>fiori_html5_qr_barcode_test|
|**Application Title**<br>Scan QR barcode|
|**Namespace**<br>|
|**UI5 Theme**<br>sap_fiori_3|
|**UI5 Version**<br>Latest|
|**Enable Telemetry**<br>False|

## fiori_html5_qr_barcode_test

Escaner de QR y código de barras 100% HTML5 y javascript.
Requiere el paquete html5-qrcode.min.js en la carpeta html5-qrcode.

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

El método escanearCodigo se encarga de abrir un popup con el feed de la cámara y capturar el código escaneado por html5-qrcode.


### Starting the generated app

-   This app has been generated using the SAP Fiori tools - App Generator, as part of the SAP Fiori tools suite.  In order to launch the generated app, simply run the following from the generated app root folder:

```
    npm start
```


#### Pre-requisites:

1. Active NodeJS LTS (Long Term Support) version and associated supported NPM version.  (See https://nodejs.org)


