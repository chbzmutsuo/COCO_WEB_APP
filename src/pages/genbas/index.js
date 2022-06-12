import React from 'react'
import BtnBasic from '@components/common/BtnBasic';
import Link from 'next/link';
import { Genba } from '../../lib/hasura/Genba';
import { useState, useEffect, useContext, } from 'react'




export default function Index() {
	const [genbas, setgenbas] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const fetchGenbas = await Genba.getGenbas()
			console.log({ fetchGenbas })   //////////
			setgenbas(fetchGenbas.data.genbas)
		}
		fetchData()
	}, []);







	// if (genbas.length === 0) { return <div>Loading...</div> }


	return (
		<div>
			<h2>登録現場一覧</h2>


			<ul>
				{genbas.length > 0 && genbas.map(genba => {
					const { billing, bukken_number, genba_address, created_at, id, genba_name, outsourcing_price } = genba
					return (
						<Link href={`genbas/edit/${id}`} key={id}>
							<a>
								<li className='flex flex-row space-x-4 my-2 '>
									<span className='w-10'>{id}</span>
									<span className='w-20 underline'>{genba_name}</span>
									<span className='w-20'>{billing.toLocaleString('ja-JP')}</span>
									<span className='w-20'>{outsourcing_price}</span>
								</li>
							</a>
						</Link>
					)
				})}
			</ul>
			<BtnBasic center><Link href='/genbas/create'>現場を追加</Link></BtnBasic>

		</div >
	)
}
