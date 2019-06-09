import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';

import { AboutPage } from '../about/about';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild('currentNote') currentNote: ElementRef;
	repeat: boolean = true;
	countInterval: any;
	timeoutG: any;
	timeoutD: any;
	timeoutA: any;
	timeoutE: any;

	constructor(public navCtrl: NavController, public platform: Platform, private nativeAudio: NativeAudio) {
		this.platform.ready().then(() => {
			this.loadAudio('GDAE');
			this.loadAudio('G');
			this.loadAudio('D');
			this.loadAudio('A');
			this.loadAudio('E');
			
			this.platform.pause.subscribe(() => {
				this.stopCurrentAudio();
				this.clearCountInterval();
				this.clearTimeouts();
			});
		});
	}

	playNote(event) {
		let note = event.target.innerText;

		switch (note) {
			case 'G':
				this.playAudio('G');
				break;
			case 'D':
				this.playAudio('D');
				break;
			case 'A':
				this.playAudio('A');
				break;
			case 'E':
				this.playAudio('E');
				break;
		}
	}

	playNotes() {
		this.playAudio('GDAE');
	}

	loadAudio(audioID) {
		this.nativeAudio.preloadSimple(audioID, 'assets/audio/' + audioID + '.mp3').then(function() {
			//console.log('Loaded audio: ' + audioID + '.mp3');
		}, function(err) {
			//console.log('Unable to load audio (' + audioID + '.mp3): ' + err);
		});
	}

	unloadAudio(audioID) {
		this.nativeAudio.unload(audioID).then(function() {
			//console.log('Unloaded audio: ' + audioID + '.mp3');
		}, function(err) {
			//console.log('Unable to unload audio (' + audioID + '.mp3): ' + err);
		});
	}

	playAudio(audioID) {
		this.stopCurrentAudio();
		this.clearCountInterval();
		this.clearTimeouts();
		
		if (this.repeat) {
			if (audioID == 'GDAE') {
				let notes = ['G', 'D', 'A', 'E'];
				var count = 0;

				this.nativeAudio.play('G').then(function() {}, function(err) {});
				this.currentNote.nativeElement.innerText = notes[0];
				
				this.countInterval = setInterval(() => {
					if (count > 2) {
						count = 0;
					} else {
						count++;
					}

					this.nativeAudio.play(notes[count]).then(function() {}, function(err) {});
					this.currentNote.nativeElement.innerText = notes[count];
				}, 1000);
			} else {
				this.currentNote.nativeElement.innerText = audioID;

				this.nativeAudio.loop(audioID).then(function() {
					//console.log('Looping audio: ' + audioID + '.mp3');
				}, function(err) {
					//console.log('Error looping audio (' + audioID + '.mp3): ' + err);
				});
			}
		} else {
			if (audioID != 'GDAE') {
				this.currentNote.nativeElement.innerText = audioID;

				this.nativeAudio.play(audioID).then(function() {
					//console.log('Looping audio: ' + audioID + '.mp3');
				}, function(err) {
					//console.log('Error looping audio (' + audioID + '.mp3): ' + err);
				});
			} else {
				this.timeoutG = setTimeout(() => {
					this.nativeAudio.play('G').then(function() {}, function(err) {});
					this.currentNote.nativeElement.innerText = 'G';

					this.timeoutD = setTimeout(() => {
						this.nativeAudio.play('D').then(function() {}, function(err) {});
						this.currentNote.nativeElement.innerText = 'D';

						this.timeoutA = setTimeout(() => {
							this.nativeAudio.play('A').then(function() {}, function(err) {});
							this.currentNote.nativeElement.innerText = 'A';

							this.timeoutE = setTimeout(() => {
								this.nativeAudio.play('E').then(function() {}, function(err) {});
								this.currentNote.nativeElement.innerText = 'E';
							}, 1000);
						}, 1000);
					}, 1000);
				}, 0);
			}
		}
	}

	stopAudio(audioID) {
		this.nativeAudio.stop(audioID).then(function() {
			//console.log('Stopped audio: ' + audioID + '.mp3');
		}, function(err) {
			//console.log('Error stopping audio (' + audioID + '.mp3): ' + err);
		});
	}

	stopCurrentAudio() {
		this.stopAudio('GDAE');
		this.stopAudio('G');
		this.stopAudio('D');
		this.stopAudio('A');
		this.stopAudio('E');
	}

	clearCountInterval() {
		clearInterval(this.countInterval);
	}

	clearTimeouts() {
		clearTimeout(this.timeoutG);
		clearTimeout(this.timeoutD);
		clearTimeout(this.timeoutA);
		clearTimeout(this.timeoutE);
	}

	repeatOnChange(event) {
		this.stopCurrentAudio();
		this.clearCountInterval();
		this.clearTimeouts();

		if (this.repeat) {
			event.value = true;
		} else {
			event.value = false;
		}
	}

	openAbout() {
		this.navCtrl.push(AboutPage);
	}
}
