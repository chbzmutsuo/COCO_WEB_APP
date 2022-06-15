import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import BtnBasic from '@components/common/BtnBasic';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

export default function Index() {

	const [loading, setloading] = useState(false);
	const [birthYear, setbirthYear] = useState('');
	const [birthMonth, setbirthMonth] = useState('');
	const [birthDate, setbirthDate] = useState('');
	const [result, setresult] = useState({ nenkan: "", gekkan: "", nikkan: "", nennshi: "", gesshi: "", nisshi: "", });
	const [destiny, setdestiny] = useState({
		yearDest: '',
		monthDest: '',
		dateDest: '',
	});
	const [otherName, setotherName] = useState('');
	const [symbolAndNum, setsymbolAndNum] = useState({});

	const nenkanshiMaster = {
		kan: { 0: '庚', 1: '辛', 2: '壬', 3: '癸', 4: '甲', 5: '乙', 6: '丙', 7: '丁', 8: '戊', 9: '己' },
		eto: {
			0: '申',
			1: '酉',
			2: '戌',
			3: '亥',
			4: '子',
			5: '丑',
			6: '寅',
			7: '卯',
			8: '辰',
			9: '巳',
			10: '午',
			11: '未',
		},
	};

	const gekkanshiMaster = [
		{
			monthNum: [4, 9],
			12: '丁丑',
			1: '丙寅',
			2: '丁卯',
			3: '戊辰',
			4: '己巳',
			5: '庚午',
			6: '辛未',
			7: '壬申',
			8: '癸酉',
			9: '甲戌',
			10: '乙亥',
			11: '丙子',
		},
		{
			monthNum: [5, 0],
			12: '己丑',
			1: '戊寅',
			2: '己卯',
			3: '庚辰',
			4: '辛巳',
			5: '壬午',
			6: '癸未',
			7: '甲申',
			8: '乙酉',
			9: '丙戌',
			10: '丁亥',
			11: '戊子',
		},
		{
			monthNum: [6, 1],
			12: '辛丑',
			1: '庚寅',
			2: '辛卯',
			3: '壬辰',
			4: '癸巳',
			5: '甲午',
			6: '乙未',
			7: '丙申',
			8: '丁酉',
			9: '戊戌',
			10: '己亥',
			11: '庚子',
		},
		{
			monthNum: [7, 2],
			12: '癸丑',
			1: '壬寅',
			2: '癸卯',
			3: '甲辰',
			4: '乙巳',
			5: '丙午',
			6: '丁未',
			7: '戊申',
			8: '己酉',
			9: '庚戌',
			10: '辛亥',
			11: '壬子',
		},
		{
			monthNum: [8, 3],
			12: '乙丑',
			1: '甲寅',
			2: '乙卯',
			3: '丙辰',
			4: '丁巳',
			5: '戊午',
			6: '己未',
			7: '庚申',
			8: '辛酉',
			9: '壬戌',
			10: '癸亥',
			11: '甲子',
		},
	];

	const nikkanshiMaster = {
		1: '甲子(きのえね・こうし)',
		2: '乙丑(きのとうし・おつちゅう)',
		3: '丙寅(ひのえとら・へいいん)',
		4: '丁卯(ひのとう・ていぼう)',
		5: '戊辰(つちのえたつ・ぼしん)',
		6: '己巳(つちのとみ・きし)',
		7: '庚午(かのえうま・こうご)',
		8: '辛未(かのとひつじ・しんび)',
		9: '壬申(みずのえさる・じんしん)',
		10: '癸酉(みずのととり・きゆう)',
		11: '甲戌(きのえいぬ・こうじゅつ)',
		12: '乙亥(きのとい・おつがい)',
		13: '丙子(ひのえね・へいし)',
		14: '丁丑(ひのとうし・ていちゅう)',
		15: '戊寅(つちのえとら・ぼいん)',
		16: '己卯(つちのとう・きぼう)',
		17: '庚辰(かのえたつ・こうしん)',
		18: '辛巳(かのとみ・しんし)',
		19: '壬午(みずのえうま・じんご)',
		20: '癸未(みずのとひつじ・きび)',
		21: '甲申(きのえさる・こうしん)',
		22: '乙酉(きのととり・おつゆう)',
		23: '丙戌(ひのえいぬ・へいじゅつ)',
		24: '丁亥(ひのとい・ていがい)',
		25: '戊子(つちのえね・ぼし)',
		26: '己丑(つちのとうし・きちゅう)',
		27: '庚寅(かのえとら・こういん)',
		28: '辛卯(かのとう・しんぼう)',
		29: '壬辰(みずのえたつ・じんしん)',
		30: '癸巳(みずのとみ・きし)',
		31: '甲午(きのえうま・こうご)',
		32: '乙未(きのとひつじ・おつび)',
		33: '丙申(ひのえさる・へいしん)',
		34: '丁酉(ひのととり・ていゆう)',
		35: '戊戌(つちのえいぬ・ぼじゅつ)',
		36: '己亥(つちのとい・きがい)',
		37: '庚子(かのえね・こうし)',
		38: '辛丑(かのとうし・しんちゅう)',
		39: '壬寅(みずのえとら・じんいん)',
		40: '癸卯(みずのとう・きぼう)',
		41: '甲辰(きのえたつ・こうしん)',
		42: '乙巳(きのとみ・おつし)',
		43: '丙午(ひのえうま・へいご)',
		44: '丁未(ひのとひつじ・ていび)',
		45: '戊申(つちのえさる・ぼしん)',
		46: '己酉(つちのととり・きゆう)',
		47: '庚戌(かのえいぬ・こうじゅつ)',
		48: '辛亥(かのとい・しんがい)',
		49: '壬子(みずのえね・じんし)',
		50: '癸丑(みずのとうし・きちゅう)',
		51: '甲寅(きのえとら・こういん)',
		52: '乙卯(きのとう・おつぼう)',
		53: '丙辰(ひのえたつ・へいしん)',
		54: '丁巳(ひのとみ・ていし)',
		55: '戊午(つちのえうま・ぼご)',
		56: '己未(つちのとひつじ・きび)',
		57: '庚申(かのえさる・こうしん)',
		58: '辛酉(かのととり・しんゆう)',
		59: '壬戌(みずのえいぬ・じんじゅつ)',
		60: '癸亥(みずのとい・きがい)',
	};

	const destinyMaster = {
		result: ['養', '胎', '絶', '墓', '死', '病', '衰', '帝旺', '建禄', '冠帯', '沐浴', '長生'],
		kan: {
			甲: ['戌', '酉', '申', '未', '午', '巳', '辰', '卯', '寅', '丑', '子', '亥'],
			乙: ['未', '申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午'],
			丙: ['丑', '子', '亥', '戌', '酉', '申', '未', '午', '巳', '辰', '卯', '寅'],
			丁: ['戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉'],
			戊: ['丑', '子', '亥', '戌', '酉', '申', '未', '午', '巳', '辰', '卯', '寅'],
			己: ['戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉'],
			庚: ['辰', '卯', '寅', '丑', '子', '亥', '戌', '酉', '申', '未', '午', '巳'],
			辛: ['丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子'],
			壬: ['未', '午', '巳', '辰', '卯', '寅', '丑', '子', '亥', '戌', '酉', '申'],
			癸: ['辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑', '寅', '卯'],
		},
	};
	const symbolMaster = {
		養: { symbol: '○', number: 1 },
		胎: { symbol: '□', number: 1 },
		絶: { symbol: '△', number: 1 },
		墓: { symbol: '○', number: 4 },
		死: { symbol: '△', number: 4 },
		病: { symbol: '□', number: 4 },
		衰: { symbol: '○', number: 2 },
		帝旺: { symbol: '□', number: 2 },
		建禄: { symbol: '△', number: 2 },
		冠帯: { symbol: '○', number: 3 },
		沐浴: { symbol: '△', number: 3 },
		長生: { symbol: '□', number: 3 },
	};

	const culcurate = async (e) => {
		e.preventDefault();




		if (birthYear === '' || birthYear.length !== 4 || birthMonth === '' || birthDate === '') {
			alert('生年月日を半角数字で正しく入力してください');
			return;
		}


		let dateObj = {
			year: birthYear,
			month: birthMonth.toString().padStart(2, '0'),
			date: birthDate.toString().padStart(2, '0'),
		}

		let body = { dateObj }
		let fetchResult = {};
		setloading(true)
		await fetch('api/zodiac/', { method: "POST", body: JSON.stringify(body) }).then(res => res.json()).then(data => {
			fetchResult = data
		})
		setloading(false)


		// let gekkanshiCulcNum = Number(birthYear[3]);

		// /**月干支計算 */
		// let gekkanshi = '';
		// gekkanshiMaster.forEach((obj) => {
		// 	if (obj.monthNum.includes(gekkanshiCulcNum)) {
		// 		let monthToNumber = Number(birthMonth);
		// 		gekkanshi = obj[monthToNumber];
		// 	}
		// });

		// let mMaster = {
		// 	1: '00',
		// 	2: '31',
		// 	3: '1',
		// 	4: '30',
		// 	5: '00',
		// 	6: '31',
		// 	7: '01',
		// 	8: '32',
		// 	9: '03',
		// 	10: '33',
		// 	11: '04',
		// 	12: '34',
		// };

		// let c = 10 + Math.floor(birthYear / 400) - Math.floor(birthYear / 100);
		// let y = (birthYear % 80) * 5 + Math.floor((birthYear % 80) / 4);
		// let m = Number(mMaster[Number(birthMonth)]);

		// /**閏年の処理 */
		// const isLeapYear = (year) => new Date(year + '/2/29').getMonth() === 1;
		// if (isLeapYear(birthYear) && birthMonth <= 2) {
		// 	m = -1;
		// }

		// let sum = c + y + m + Number(birthDate);
		// let nikkanshiNum = sum % 60;
		// sum - 60 < 0 ? (nikkanshiNum = Math.abs(sum + 60)) : '';

		// nikkanshiNum > 60 ? (nikkanshiNum -= 60) : '';
		// let nikkanshi = nikkanshiMaster[nikkanshiNum];
		// // console.log({ c, y, m, sum, nikkanshiNum, nikkanshi })   //////////

		/**干支確定 */
		setresult(null);


		setTimeout(() => {
			let newResultObj = {
				nenkan: fetchResult.nenkanshi[0],
				gekkan: fetchResult.gekkanshi[0],
				nikkan: fetchResult.nikkanshi[0],
				nennshi: fetchResult.nenkanshi[1],
				gesshi: fetchResult.gekkanshi[1],
				nisshi: fetchResult.nikkanshi[1],
			}
			setresult(newResultObj);
			const { nenkan, gekkan, nikkan, nennshi, gesshi, nisshi, } = newResultObj

			console.log({ nisshi, gesshi, nenkan })   //////////


			/**運勢確定 */


			// const array2 = destinyMaster['kan'][nenkan]
			// let index2 = array2.indexOf(nennshi)
			// let dest2 = destinyMaster.result[index2];

			let dateDest = destinyMaster.result[destinyMaster['kan'][nikkan].indexOf(nisshi)];
			let monthDest = destinyMaster.result[destinyMaster['kan'][nikkan].indexOf(gesshi)];
			let yearDest = destinyMaster.result[destinyMaster['kan'][nikkan].indexOf(nennshi)];
			setdestiny({ yearDest, monthDest, dateDest, })



		}, 300);

		/**記号表示 */
		const otherNameMaster = {
			甲: '木',
			乙: '花',
			丙: '陽',
			丁: '灯',
			戊: '山',
			己: '地',
			庚: '鉄',
			辛: '金',
			壬: '海',
			癸: '雨',
		};

		setotherName(otherNameMaster[fetchResult.nikkanshi[0]]);
	};



	return (

		<div className='bg- w-full h-full min-h-screen '>

			{loading && <div className='text-3xl h-screen w-full bg-black opacity-40  z-20 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold'>
				<span className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>エーテリアルサーチ中
					{/* <div className="flex justify-center"> */}
					<span className="ml-4 inline-block animate-spin h-7 w-7 border-4 border-gray-50 rounded-full border-t-transparent"></span>
					{/* </div> */}
				</span>

			</div>}

			<div className=' text-center max-w-lg mx-auto  py-20 px-4 sm:p-16'>
				<header>
					<div className='mb-20 mx-4'><Image src={'/zodiac/fcetherlight-rogo.png'} alt='' width={3268} height={570} /></div>
				</header>
				<Form className='flex flex-wrap  max-w-md mx-auto'>
					<div className='w-1/3 p-1'>
						<FloatingLabel controlId='floatingInput' label='年' className='mb-3 text-yellow-600'>
							<Form.Control
								type='number'
								placeholder='年'
								value={birthYear}
								onChange={(e) => {
									if (e.target.value.length > 4) {
										return;
									}
									setbirthYear(e.target.value);
								}}
							/>
						</FloatingLabel>
					</div>

					<div className='w-1/3 p-1'>
						<FloatingLabel controlId='floatingInput' label='月' className='mb-3 text-yellow-600'>
							<Form.Select
								type='number'
								placeholder='月'
								value={birthMonth}
								onChange={(e) => {
									setbirthMonth(e.target.value);
								}}
							>
								<option value=''>選択</option>
								{
									[...Array(12)].map((_, i) => {
										return (
											<option key={i} value={i + 1}>
												{i + 1}
											</option>
										);
									}) //=> [ 1, 2, 3, 4, 5 ]
								}
							</Form.Select>
						</FloatingLabel>
					</div>
					<div className='w-1/3 p-1'>
						<FloatingLabel controlId='floatingInput' label='日' className='mb-3 text-yellow-600'>
							<Form.Select
								type='number'
								placeholder='日'
								value={birthDate}
								onChange={(e) => {
									setbirthDate(e.target.value);
								}}
							>
								<option value=''>選択</option>
								{
									[...Array(31)].map((_, i) => {
										return (
											<option key={i} value={i + 1}>
												{i + 1}
											</option>
										);
									}) //=> [ 1, 2, 3, 4, 5 ]
								}
							</Form.Select>
						</FloatingLabel>
					</div>
				</Form>
				<BtnBasic center onClick={culcurate}>
					サーチ
				</BtnBasic>
				{result && (
					<div className='text-center m-10 flex flex-wrap  justify-center'>

						{/* <div>
							<div ><dt>日干支</dt><dd>{result.nikkan + result.nisshi}</dd></div>
							<div><dt>月干支</dt><dd>{result.gekkan + result.gesshi}</dd></div>
							<div><dt>年干支</dt><dd>{result.nenkan + result.nennshi}</dd></div>


							<div ><dt>運勢(日)</dt><dd>{destiny['dateDest']}</dd></div>
							<div ><dt>運勢(月)</dt><dd>{destiny['monthDest']}</dd></div>
							<div ><dt>運勢(年)</dt><dd>{destiny['yearDest']}</dd></div>



							<div ><dt>別称</dt><dd>{otherName}</dd></div>

							{symbolMaster[destiny.dateDest] &&
								<div ><dt>記号（日）</dt><dd>
									<span>{symbolMaster[destiny.dateDest]['symbol']}</span>
									<span>{symbolMaster[destiny.dateDest]['number']}</span>
								</dd></div>
							}
							{symbolMaster[destiny.monthDest] &&
								<div ><dt>記号（日）</dt><dd>
									<span>{symbolMaster[destiny.monthDest]['symbol']}</span>
									<span>{symbolMaster[destiny.monthDest]['number']}</span>
								</dd></div>
							}
							{symbolMaster[destiny.yearDest] &&
								<div ><dt>記号（日）</dt><dd>
									<span>{symbolMaster[destiny.yearDest]['symbol']}</span>
									<span>{symbolMaster[destiny.yearDest]['number']}</span>
								</dd></div>
							}
						</div> */}


						{/* 以下を表示する */}
						{symbolMaster[destiny.dateDest] &&
							<div className='flex justify-around space-x-4 text-2xl font-bold'>
								<div><span className='badge bg-gray-700'>{otherName}</span></div>
								<div>
									<span>{symbolMaster[destiny.dateDest]['symbol']}</span>
									<span>{symbolMaster[destiny.dateDest]['number']}</span>
								</div>
								<div>
									<span>{symbolMaster[destiny.monthDest]['symbol']}</span>
									<span>{symbolMaster[destiny.monthDest]['number']}</span>
								</div>
								<div>
									<span>{symbolMaster[destiny.yearDest]['symbol']}</span>
									<span>{symbolMaster[destiny.yearDest]['number']}</span>
								</div>
							</div>
						}

						<div>
							{symbolMaster[destiny] && (
								<p>
									<dt>あなたの運勢は・・・</dt>
									<dd className='flex flex-row space-x-4 justify-center text-xl font-bold m-4 text-yellow-500 '>
										<span>{destiny}</span>
										<span>{symbolMaster[destiny]['symbol']}</span>
										<span>{symbolMaster[destiny]['number']}</span>
									</dd>
								</p>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
