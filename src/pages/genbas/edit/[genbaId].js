import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { Genba } from '../../../lib/hasura/Genba'
import BtnBasic from "@components/common/BtnBasic"
import { useState, useEffect, useContext, } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Member } from '../../../lib/hasura/Member'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import AddNinkForm from './add-nink-form'



export default function Edit() {
	const [loading, setloading] = useState(true);
	const [genba, setgenba] = useState(null);
	const [members, setmembers] = useState([]);

	const [id, setid] = useState('')
	const [bukken_number, setbukken_number] = useState('')
	const [genba_name, setgenba_name] = useState('')
	const [genba_address, setgenba_address] = useState('')
	const [billing, setbilling] = useState('')
	const [outsourcing_price, setoutsourcing_price] = useState('')

	const [memberId, setmemberId] = useState('')
	const router = useRouter()



	useEffect(() => {
		const fetchGenbas = async () => {
			const fetchGenbas = await Genba.getGenbas()
			const genbas = fetchGenbas.data.genbas
			const genba = genbas.filter(eachGenba => eachGenba.id.toString() === router.query.genbaId)[0]

			if (genba) {
				setgenba(genba)
				setid(genba.id)
				setbukken_number(genba.bukken_number)
				setgenba_name(genba.genba_name)
				setgenba_address(genba.genba_address)
				setbilling(genba.billing)
				setoutsourcing_price(genba.outsourcing_price)
			}
		}
		const fetchMembers = async () => {
			const fetchMembers = await Member.getMembers();
			setmembers(fetchMembers.data.members)
		}

		fetchGenbas()
		fetchMembers()
		setloading(false)
	}, [router.query.genbaId])
	console.log(genba)   //////////

	const updateGenba = async () => {
		const body = { id, bukken_number, genba_name, genba_address, billing, outsourcing_price, }
		const { data, errors } = await Genba.updateGenba(body)
		if (!errors) { alert("データを登録しました") }
	}
	const deleteGenba = async () => {
		const confirm = window.confirm("本当に削除しますか？")
		if (!confirm) { return }

		router.replace("/genbas")
		const { data, errors } = await Genba.deleteGenba(router.query.genbaId)
	}

	const assignMember = async () => {
		console.log(genba.id, memberId)   //////////
		const { data, errors } = await Genba.assignMemberToGenba(genba.id, memberId)
		router.reload()
		console.log({ data, errors })   //////////

	}

	if (!genba) { return <div>Loading...</div> }


	return (<div className='h-fit overflow-auto'>
		<section>
			<h2>現場詳細</h2>
			<div className='flex flex-wrap '>

				<div className='w-1/2 p-1 h-16 '>
					<FloatingLabel controlId="floatingInput" label="物件番号" className="mb-3">
						<Form.Control type="number" placeholder="物件番号" value={bukken_number ?? "Loading..."} onChange={(e) => { setbukken_number(e.target.value) }} />
					</FloatingLabel>
				</div>

				<div className='w-1/2 p-1 h-16 '>
					<FloatingLabel controlId="floatingInput" label="現場名" className="mb-3">
						<Form.Control type="text" placeholder="現場名" value={genba_name ?? "Loading..."} onChange={(e) => { setgenba_name(e.target.value) }} />
					</FloatingLabel>
				</div>
				<div className='w-1/2 p-1 h-16 '>
					<FloatingLabel controlId="floatingInput" label="住所" className="mb-3">
						<Form.Control type="text" placeholder="住所" value={genba_address ?? "Loading..."} onChange={(e) => { setgenba_address(e.target.value) }} />
					</FloatingLabel>
				</div>
				<div className='w-1/2 p-1 h-16 '>
					<FloatingLabel controlId="floatingInput" label="請求額" className="mb-3">
						<Form.Control type="number" placeholder="請求額" value={billing ?? "Loading..."} onChange={(e) => { setbilling(e.target.value) }} />
					</FloatingLabel>
				</div>
				<div className='w-1/2 p-1 h-16 '>
					<FloatingLabel controlId="floatingInput" label="外注費用" className="mb-3">
						<Form.Control type="number" placeholder="外注費用" value={outsourcing_price ?? "Loading..."} onChange={(e) => { setoutsourcing_price(e.target.value) }} />
					</FloatingLabel>
				</div>

			</div>
		</section>




		<AddNinkForm members={genba.genbas_members} />



		<section>
			<h3>従業員アサイン</h3>
			<div className='flex flex-row items-center'>
				<div className=' ml-auto'>
					<Form.Select aria-label="Floating label select example" onChange={e => setmemberId(e.target.value)}>
						<option>選択してください</option>
						{members.length > 0 && members.filter(member => {
							const assignedMemberId = genba.genbas_members.map(each => each.member.id)
							return !assignedMemberId.includes(member.id)

						}).map(member => {
							return <option key={member.id} value={member.id}>{member.name}</option>
						})}
					</Form.Select>
				</div>
				<button className='btn btn-secondary btn-sm text-xs m-2' onClick={assignMember}>追加</button>
			</div>

			<div className='my-4'>
				<ol className='flex flex-wrap '>
					{genba.genbas_members.map((each, index) => {
						return <li key={each.member.id} className='w-1/2'>
							<span>{index + 1}</span><span className='font-bold ml-2'>{each.member.name}</span><span className='mx-2 text-gray-500'><FontAwesomeIcon icon={faTrash} /></span>
						</li>
					})}

				</ol>
			</div>
		</section>


		<center className='flex'>
			<BtnBasic center ><Link href='/genbas'>戻る</Link></BtnBasic>
			<BtnBasic center onClick={deleteGenba} className='bg-red-600  text-white'>削除</BtnBasic>
			<BtnBasic center onClick={updateGenba} className='bg-blue-800  text-white'>編集</BtnBasic>
		</center>





	</div>
	)
}
