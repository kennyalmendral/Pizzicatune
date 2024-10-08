import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
	selector: 'page-about',
	templateUrl: 'about.html',
})
export class AboutPage {
	year: any;

	constructor(public navCtrl: NavController, private socialSharing: SocialSharing) {
		this.year = new Date().getFullYear();
	}

	ionViewDidLoad() {
	}

	share() {
		this.socialSharing.share('Check out this simple violin tuner app! It outputs real plucked (pizzicato) string sound.', 'Awesome Violin Tuner App', null, 'https://play.google.com/store/apps/details?id=io.github.kennyalmendral.pizzicatune').then((response) => {
		}).catch((error) => {
			console.log(error);
		});
	}
}
