// @flow

import React, { Component } from 'react';

import { withInjector } from '@bitchcraft/injector';

import { connect } from 'react-redux';

import { Actions } from 'constants';

import { BootupArt as bootupArt, BootupText as bootupText } from 'components/bootup';

import { Login as login } from 'components/login';

import Shell from 'components/shell';

import Sound from 'react-sound';

import stylesheet from './nix.scsshbs';

const linuxBootText = '[  OK  ] Started Show Boot Screen.\n'
+ '[  OK  ] Found device OS_PATA.\n'
+ 'Starting File System Check on /dev/disk/by-name/OS_PATA...\n'
+ '[  OK  ] Started File System Check on /dev/disk/by-name/OS_PATA.\n'
+ 'Welcome to zGravOS!\n'
+ 'Mounting core system points...\n'
+ '[  OK  ] Mounted /boot/grub2/x86_64-efi.\n'
+ '[  OK  ] Mounted /opt.\n'
+ '[  OK  ] Mounted /srv.\n'
+ '[  OK  ] Mounted /tmp.\n'
+ '[  OK  ] Mounted /usr/local.\n'
+ '[  OK  ] Mounted /var/crash.\n'
+ '[  OK  ] Mounted /var/log.\n'
+ '[  OK  ] Mounted /var/opt.\n'
+ '[  OK  ] Mounted /var/tmp.\n'
+ '[  OK  ] Mounted /.snapshots.\n'
+ '[  OK  ] Started Authorization Manager.\n'
+ '[  DONE  ] System Init Complete!';

const bootText = linuxBootText.split('\n');

const _bootupArt = bootupArt();

class Nix extends Component<*> {

	componentWillMount() {
		const { dispatch } = this.props;

		if (checkIfMobile()) {
			dispatch({
				type: Actions.BOOTUP_RUNNING,
			});

			setTimeout(() => {
				document.getElementById('bootup-text').style.display = '';
			}, 5000);
		} else {
			dispatch({
				type: Actions.BOOTUP_PLAY_CHAIRAUDIO,
			});
		}
	}

	render() {
		const { app, dispatch } = this.props;
		const bootup = app.get('bootup');
		if (bootup) {
			const state = bootup.get('state');
			const running = bootup.get('running');

			if (running && state === Actions.BOOTUP_PLAY_CHAIRAUDIO) {
				return (
					<div>
						<Sound
							autoLoad
							onLoad={(f) => { chairAudioLoaded(f, dispatch); }}
							playFromPosition={0}
							playStatus={Sound.status.PLAYING}
							url='https://zgrav.pro/chair.mp3'
							volume={30} />
					</div>
				);
			}

			if (running && state === Actions.BOOTUP_PLAY_POWERONAUDIO) {
				return (
					<div>
						<Sound
							autoLoad
							onLoad={(f) => { powerOnAudioLoaded(f, dispatch); }}
							playFromPosition={0}
							playStatus={Sound.status.PLAYING}
							url='https://zgrav.pro/poweron.mp3'
							volume={30} />
					</div>
				);
			}

			if (running && state === Actions.BOOTUP_RUNNING) {
				return (
					<div className='container'>
						<div className='screen' id='screen'>
							{_bootupArt}
							{checkIfMobile() ? <p>Sadly on phone, there is no SFX :(</p> : null}
							<div id='bootup-text' style={{ display: 'none' }}>
								{bootupText(dispatch, doneTyping, bootText)}
							</div>
						</div>
						<div className='overlay'>
							VGA
						</div>
					</div>
				);
			}

			if (running && state === Actions.BOOTUP_SHOW_SPLASH) {
				return (
					<div className='container'>
						<div className='screen' id='screen'>
							{_bootupArt}
							{doSplash(dispatch)}
						</div>
					</div>
				);
			}

			if (running && state === Actions.BOOTUP_SHOW_LOGIN) {
				return (
					<div className='container'>
						<div className='screen' id='screen'>
							{_bootupArt}
							{login(dispatch, doneLoginTyping)}
						</div>
					</div>
				);
			}

			if (!running && state === Actions.BOOTUP_COMPLETE) {
				return (
					<div className='container'>
						<div className='screen' id='screen'>
							{_bootupArt}
							<Shell />
						</div>
					</div>
				);
			}
		}

		return null;
	}
}

function checkIfMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function doneLoginTyping(dispatch) {
	setTimeout(() => {
		dispatch({
			type: Actions.BOOTUP_COMPLETE,
		});
	}, 1000);
}

function doSplash(dispatch) {
	document.getElementById('bootup_art').className = 'shadow';

	setTimeout(() => {
		dispatch({
			type: Actions.BOOTUP_SHOW_LOGIN,
		});
	}, 1000);
}

function doneTyping(dispatch) {
	setTimeout(() => {
		dispatch({
			type: Actions.BOOTUP_SHOW_SPLASH,
		});
	}, 1000);
}

function chairAudioLoaded(f, dispatch) {
	f.play();

	setTimeout(() => {
		dispatch({
			type: Actions.BOOTUP_PLAY_POWERONAUDIO,
		});
	}, 900);
}

function powerOnAudioLoaded(f, dispatch) {
	f.play();

	dispatch({
		type: Actions.BOOTUP_RUNNING,
	});

	setTimeout(() => {
		document.getElementById('bootup-text').style.display = '';
	}, 5000);
}

const styles = t => ({});

const NixState = function(state) {
	return state;
};

export default connect(NixState)(withInjector(stylesheet, styles)(Nix));
