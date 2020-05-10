const routerName = "dbrouter",
	zoom = 10,

	epicentrZoneBorderColorRGB = {
		r: 242,
		g: 12,
		b: 157,
	},

	dangerZoneBorderColorRGB = {
		r: 255,
		g: 0,
		b: 0,
	},
	midleDangerZoneBorderColorRGB = {
		r: 255,
		g: 111,
		b: 0,
	};


async function calculate(latitude, longitude, magnitude, depth) {
	await workWIthMap({
			latitude,
			longitude,
		},
		zoom
	);

	const canvas = document.querySelector('#canvas');
	drawOnMap(epicentrZoneBorderColorRGB, canvas, latitude, longitude, zoom, 1);
	drawOnMap(dangerZoneBorderColorRGB, canvas, latitude, longitude, zoom, 10);
	drawOnMap(midleDangerZoneBorderColorRGB, canvas, latitude, longitude, zoom, 20);

	let epicentrIntensity = getIntensityEpicentr(magnitude, depth),
		firstZone = getIntensity(magnitude, depth, 10),
		secondZone = getIntensity(magnitude, depth, 20);

	let epicentrEffect, firstEffect, secondEffect;

	if (epicentrIntensity < 1) {
		epicentrEffect = await workWithBD('earthquakeeffects', routerName, {
				intensity: 1
			}),
			firstEffect = await workWithBD('earthquakeeffects', routerName, {
				intensity: 1
			}),
			secondEffect = await workWithBD('earthquakeeffects', routerName, {
				intensity: 1
			});
	} else {
		epicentrEffect = await workWithBD('earthquakeeffects', routerName, {
				intensity: epicentrIntensity
			}),
			firstEffect = await workWithBD('earthquakeeffects', routerName, {
				intensity: firstZone
			}),
			secondEffect = await workWithBD('earthquakeeffects', routerName, {
				intensity: secondZone
			});
	}

	createTable('resultTable', [
		['',
			'Інтенсивність землетрусу ',
			'Наслідки землетрусу',
		],
		[
			'В епіцентрі винекнення',
			epicentrIntensity,
			epicentrEffect,
		],
		[
			'В радіусі 10км від епіцентру',
			firstZone,
			firstEffect,
		],
		[
			'В радіусі 20км від епіцентру',
			secondZone,
			secondEffect,
		],
	], 'Таблиця 1 - Наслідки землетрусу в кожній зоні, в залежності від інтенсивності на поверхні');

	let deathArr = [
		[,
			'Тип будівлі',
			'Втрати населення в епіцентрі, %',
			'Втрати населення в радіусі 10км, %',
			'Втрати населення в радіусі 20км, %',
		]
	];

	let epicentrDeath,
		firstZoneDeath,
		secondZoneDeath;

	if (epicentrIntensity < 7) {
		let epicentrDeathJSON = await workWithBD('earthqueakedeath', routerName, {
			intensity: 0
		}),
		firstZoneDeathJSON = await workWithBD('earthqueakedeath', routerName, {
			intensity: 0
		}),
		secondZoneDeathJSON = await workWithBD('earthqueakedeath', routerName, {
			intensity: 0
		});

	epicentrDeath = JSON.parse(epicentrDeathJSON);
	firstZoneDeath = JSON.parse(firstZoneDeathJSON);
	secondZoneDeath = JSON.parse(secondZoneDeathJSON);
	} else {
		let epicentrDeathJSON = await workWithBD('earthqueakedeath', routerName, {
				intensity: epicentrIntensity
			}),
			firstZoneDeathJSON = await workWithBD('earthqueakedeath', routerName, {
				intensity: firstZone
			}),
			secondZoneDeathJSON = await workWithBD('earthqueakedeath', routerName, {
				intensity: secondZone
			});

		epicentrDeath = JSON.parse(epicentrDeathJSON);
		firstZoneDeath = JSON.parse(firstZoneDeathJSON);
		secondZoneDeath = JSON.parse(secondZoneDeathJSON);
	};

	for (let i in epicentrDeath) {
		deathArr.push([
			epicentrDeath[i][0],
			epicentrDeath[i][1],
			firstZoneDeath[i][1],
			secondZoneDeath[i][1]
		])
	};

	createTable('damageTable', deathArr, 'Таблиця 2 - Втрати населення в кожній зоні, в залежності від інтенсивності на поверхні, %');

	let systemArr = [
		[,
			'Система',
			'Стійкість систем в епіцентрі, %',
			'Стійкість систем в радіусі 10км, %',
			'Стійкість систем в радіусі 20км, %',
		]
	];

	let epicentrSystem,
		firstZoneSystem,
		secondZoneSystem;

	if (epicentrIntensity < 7) {
		let epicentrSystemJSON = await workWithBD('earthqueakesystem', routerName, {
				intensity: 0
			}),
			firstZoneSystemJSON = await workWithBD('earthqueakesystem', routerName, {
				intensity: 0
			}),
			secondZoneSystemJSON = await workWithBD('earthqueakesystem', routerName, {
				intensity: 0
			});


		epicentrSystem = JSON.parse(epicentrSystemJSON);
		firstZoneSystem = JSON.parse(firstZoneSystemJSON);
		secondZoneSystem = JSON.parse(secondZoneSystemJSON);
	} else {
		let epicentrSystemJSON = await workWithBD('earthqueakesystem', routerName, {
				intensity: epicentrIntensity
			}),
			firstZoneSystemJSON = await workWithBD('earthqueakesystem', routerName, {
				intensity: firstZone
			}),
			secondZoneSystemJSON = await workWithBD('earthqueakesystem', routerName, {
				intensity: secondZone
			});


		epicentrSystem = JSON.parse(epicentrSystemJSON);
		firstZoneSystem = JSON.parse(firstZoneSystemJSON);
		secondZoneSystem = JSON.parse(secondZoneSystemJSON);
	};

	for (let i in epicentrSystem) {
		systemArr.push([
			epicentrSystem[i][0],
			epicentrSystem[i][1],
			firstZoneSystem[i][1],
			secondZoneSystem[i][1]
		])
	};

	createTable('lifeSupportSystems', systemArr, 'Таблиця 3 - Стійкість систем життєзабезпечення, %');

}


function getIntensityEpicentr(magnitude, depth) {
	return Math.round(1.5 * magnitude - 3.5 * Math.log10(depth) + 3);
}

function getIntensity(magnitude, depth, radius) {
	return Math.round(1.5 * magnitude - 3.5 * Math.log10(Math.sqrt(Math.pow(radius, 2) + Math.pow(depth, 2))) + 3);
}