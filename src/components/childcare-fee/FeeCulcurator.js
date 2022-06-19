import React from 'react';
import { FloatingLabel, Form, Table } from 'react-bootstrap';
import BtnBasic from '@components/common/BtnBasic';
import { useState, useEffect, useContext } from 'react';
import { feeMaster } from '../../lib/childcare';

export default function FeeCulcurator() {
	const schoolMaster = {
		A: '認可保育所、認定こども園(3号) 小規模保育(A型) 事業所内保育(保育所型)',
		B: '小規模保育(B型) 事業所内保育(小規模型)',
		C: '家庭的保育、 小規模保育(C型)	',
	};

	const master = feeMaster;

	const [culcurated, setculcurated] = useState(false);
	const [nenshu, setnenshu] = useState('');
	const [rank, setrank] = useState('');
	const [exception, setexception] = useState('');
	const [childType, setchildType] = useState('');
	const [citiznTax, setcitiznTax] = useState('');
	const [result, setresult] = useState({});

	const onChangeChildType = (e) => {
		setculcurated(false);
		setchildType(e.target.value);
	};

	const onChangeException = (e) => {
		setculcurated(false);
		setexception(e.target.value);
		setrank(e.target.value);
	};

	const onChangeNenshuu = (e) => {
		setculcurated(false);
		let value = e.target.value;
		setnenshu(value);
		let tax = value * 10000 * 0.08;
		setcitiznTax(tax);
		if (exception === '0') {
			Object.keys(master).forEach((key) => {
				// console.log({ key, citiznTax })   //////////
				let rank_DATA = master[key];
				const { over, lessThan } = rank_DATA;
				if (citiznTax >= over && citiznTax < lessThan) {
					setrank(key);
				}
			});
		}
	};

	const culcurate = (e) => {
		e.preventDefault();

		if (!(exception && childType)) {
			alert('正しく乳力をしてください');
			return;
		}
		if (exception === '0' && !nenshu) {
			alert('正しく乳力をしてください');
			return;
		}

		setculcurated(true);
		setresult(master[rank]['price']);
	};

	console.log({ nenshu, exception, childType, citiznTax, rank }); //////////

	return (
		<div>
			<Form className='flex flex-wrap  max-w-md mx-auto'>
				<div className='w-full p-1'>
					<FloatingLabel controlId='floatingSelect' label='次のいずれかに当てはまりますか?'>
						<Form.Select
							aria-label='Floating label select example'
							value={exception}
							onChange={onChangeException}
							style={{ height: 80, overflowWrap: 'break-all' }}
						>
							<option value=''>選択してください</option>
							<option value='0'>該当しない</option>
							<option value='A'>
								A
								被保護世帯及び中国残留邦人等の円滑な帰国の促進及び永住帰国後の自立の支援に関する法律による支援給付受給世帯
							</option>
							<option value='B'>B 市民税非課税世帯</option>
							<option value='C1'>C1 市民税均等割のみ</option>
						</Form.Select>
					</FloatingLabel>
				</div>

				{exception === '0' && (
					<div className='w-full p-1'>
						<FloatingLabel controlId='floatingInput' label='世帯年収(万円)' className='mb-3'>
							<Form.Control type='number' placeholder='世帯年収' value={nenshu} onChange={onChangeNenshuu} />
						</FloatingLabel>
					</div>
				)}

				<div className='w-full p-1'>
					<FloatingLabel controlId='floatingSelect' label='対象のお子様'>
						<Form.Select aria-label='Floating label select example' value={childType} onChange={onChangeChildType}>
							<option value=''>選択してください</option>
							<option value='1'>第一子</option>
							<option value='2'>第二子</option>
							<option value='3'>第三子以後</option>
						</Form.Select>
					</FloatingLabel>
				</div>
			</Form>
			<BtnBasic center onClick={culcurate}>
				再計算
			</BtnBasic>

			{!culcurated && <p className='text-red-600 text-xs'>必要な項目を入力して、『再計算』を押してください</p>}

			<div className={culcurated ? '' : 'opacity-20'}>
				{citiznTax ? <p>市民税所得割相当額: {citiznTax.toLocaleString()}</p> : ''}
				{rank !== '0' || rank !== '' ? <p>階層区分: {rank}</p> : ''}

				<Table striped bordered hover className='text-center text-sm'>
					<thead>
						<tr>
							<th>#</th>
							<th>保育園種類</th>
							<th className='w-16'>標準</th>
							<th className='w-16'>短時間</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(result).map((key, index) => {
							let school = result[key];
							return (
								<tr key={index}>
									<td>{index + 1}</td>

									<td>{schoolMaster[key]}</td>
									<td>{school['normal'][childType] ?? school['normal']['2']}</td>

									{key !== 'C' ? <td>{school['short'][childType] ?? school['short']['2']}</td> : <td></td>}
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
}
