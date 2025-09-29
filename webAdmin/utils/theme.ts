import type { Theme } from '@/typeModule/AppModule';

// ����������ʽ
export const handleThemeStyle = (theme: Theme) => {
	document.documentElement.style.setProperty('--el-color-primary', theme.primaryColor)
	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(theme.primaryColor, i / 10)}`)
	}
	for (let i = 1; i <= 9; i++) {
		document.documentElement.style.setProperty(`--el-color-primary-dark-${i}`, `${getDarkColor(theme.primaryColor, i / 10)}`)
	}
}

// hex��ɫתrgb��ɫ
const hexToRgb = (str: any) => {
	str = str.replace('#', '')
	let hexs = str.match(/../g)
	for (let i = 0; i < 3; i++) {
		hexs[i] = parseInt(hexs[i], 16)
	}
	return hexs
}

// rgb��ɫתHex��ɫ
const rgbToHex = (r: any, g: any, b: any) => {
	let hexs = [r.toString(16), g.toString(16), b.toString(16)]
	for (let i = 0; i < 3; i++) {
		if (hexs[i].length == 1) {
			hexs[i] = `0${hexs[i]}`
		}
	}
	return `#${hexs.join('')}`
}

// ��ǳ��ɫֵ
const getLightColor = (color: string, level: number) => {
	let rgb = hexToRgb(color)
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i])
	}
	return rgbToHex(rgb[0], rgb[1], rgb[2])
}

// ������ɫֵ
const getDarkColor = (color: string, level: number) => {
	let rgb = hexToRgb(color)
	for (let i = 0; i < 3; i++) {
		rgb[i] = Math.floor(rgb[i] * (1 - level))
	}
	return rgbToHex(rgb[0], rgb[1], rgb[2])
}
