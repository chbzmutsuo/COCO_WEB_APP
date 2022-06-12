import { fetchGraphQLasAdmin } from "../hasura"

export class Genba {



	static insertGenba = async (body) => {
		const { bukken_number, genba_name, genba_address, billing, outsourcing_price, } = body
		return await fetchGraphQLasAdmin(`
	mutation bulkInsertGenbas {
    insert_genbas(objects: [{billing: ${billing}, bukken_number: ${bukken_number}, genba_address: "${genba_address}", genba_name: "${genba_name}", outsourcing_price: ${outsourcing_price}}]) {
      affected_rows
    }
  }
`, "bulkInsertGenbas")
	}
	static updateGenba = async (body) => {
		const { id, bukken_number, genba_name, genba_address, billing, outsourcing_price, } = body
		return await fetchGraphQLasAdmin(`
		mutation MyMutation {
			update_genbas_by_pk(pk_columns: {id: ${id}}, _set: {billing:${billing}, bukken_number:${bukken_number}, genba_address:"${genba_address}", genba_name:"${genba_name}", outsourcing_price:${outsourcing_price}}) {
				billing
				genba_address
				bukken_number
				id
				genba_name
				created_at
				outsourcing_price
				updated_at
			}
		}
	`, "MyMutation")
	}

	static getGenbas = async (body) => {
		return await fetchGraphQLasAdmin(`
		query MyQuery {
			genbas {
				billing
				bukken_number
				genba_address
				created_at
				id
				genba_name
				outsourcing_price
				genbas_members {
					member {
						id
						name
					}
				}
			}
		}
		`, "MyQuery")

	}
	static deleteGenba = async (id) => {
		return await fetchGraphQLasAdmin(`
		mutation MyMutation2 {
			delete_genbas_by_pk(id: ${id}) {
				id
				genba_name
			}
		}
		`, "MyMutation2")
	}
	static assignMemberToGenba = async (genba_id, member_id) => {
		return await fetchGraphQLasAdmin(`
		mutation MyMutation {
			insert_genbas_members(objects: { genba_id: ${genba_id}, member_id: ${member_id}}) {
				affected_rows
			}
		}
		`, "MyMutation")
	}




}
