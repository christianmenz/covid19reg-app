import { Component, OnInit, ApplicationRef } from "@angular/core";
import { QRScanner, QRScannerStatus } from "@ionic-native/qr-scanner/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  protected scanned: boolean;

  firstName: String;
  name: String;
  location: String;
  tel: String;
  table: String;

  constructor(private qrScanner: QRScanner, private appRef: ApplicationRef) {}

  register() {
    // api call..
  }

  // Optionally request the permission early
  ngOnInit() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log("Scanned something", text);
            this.scanned = true;
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.appRef.tick();
          });

          this.qrScanner.resumePreview();
          // show camera preview
          this.qrScanner.show();
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log("Error is", e));
  }
}
